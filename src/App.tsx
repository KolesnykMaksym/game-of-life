import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { cellKey, parseKey, step, type LiveCells } from "./engine";
import { parseRLE, type Pattern } from "./patterns";
import { RULES, type Rule } from "./rules";
import { buildAgeColors, PALETTES, type Palette } from "./palettes";

interface View {
  offsetX: number;
  offsetY: number;
  cellSize: number;
}

type Brush = { kind: "cell" } | { kind: "pattern"; pattern: Pattern };

const CELL_BRUSH: Brush = { kind: "cell" };

const DEFAULT_CELL_SIZE = 14;
const MIN_CELL_SIZE = 1;
const MAX_CELL_SIZE = 200;

const LOG_ZOOM_SPAN = Math.log(MAX_CELL_SIZE / MIN_CELL_SIZE);
const sliderToZoom = (v: number) => MIN_CELL_SIZE * Math.exp((v / 100) * LOG_ZOOM_SPAN);
const zoomToSlider = (z: number) =>
  (100 * Math.log(z / MIN_CELL_SIZE)) / LOG_ZOOM_SPAN;

const MAX_AGE = 63;
const AGE_STEPS = MAX_AGE + 1;
const LEGEND_STOPS = 16;

function patternCenter(pattern: Pattern): { cx: number; cy: number } {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [x, y] of pattern.cells) {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
  return { cx: Math.floor((minX + maxX) / 2), cy: Math.floor((minY + maxY) / 2) };
}

function PatternPreview({ pattern }: { pattern: Pattern }) {
  const size = 44;
  const { viewBox, rects } = useMemo(() => {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const [x, y] of pattern.cells) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
    const w = maxX - minX + 1;
    const h = maxY - minY + 1;
    return {
      viewBox: `${minX - 0.5} ${minY - 0.5} ${w + 1} ${h + 1}`,
      rects: pattern.cells.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={0.9} height={0.9} rx={0.15} fill="currentColor" />
      )),
    };
  }, [pattern]);

  return (
    <svg className="preview" width={size} height={size} viewBox={viewBox} preserveAspectRatio="xMidYMid meet">
      {rects}
    </svg>
  );
}

export function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const cellsRef = useRef<LiveCells>(new Map());
  const viewRef = useRef<View>({ offsetX: 0, offsetY: 0, cellSize: DEFAULT_CELL_SIZE });
  const sizeRef = useRef({ width: 0, height: 0 });
  const generationRef = useRef(0);
  const isRunningRef = useRef(false);
  const speedRef = useRef(10);
  const lastTickRef = useRef(0);
  const rafRef = useRef(0);

  const brushRef = useRef<Brush>(CELL_BRUSH);
  const ruleRef = useRef<Rule>(RULES[0]);
  const ageColorsRef = useRef<readonly string[]>(buildAgeColors(PALETTES[0], AGE_STEPS));
  const paintModeRef = useRef<"add" | "remove" | null>(null);
  const paintedRef = useRef<Set<string>>(new Set());
  const panRef = useRef<{ startX: number; startY: number; origOffsetX: number; origOffsetY: number } | null>(null);
  const hoverCellRef = useRef<[number, number] | null>(null);
  const pointerDownRef = useRef(false);

  const [, forceRender] = useState(0);
  const repaint = useCallback(() => forceRender((n) => n + 1), []);

  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(10);
  const [generation, setGeneration] = useState(0);
  const [population, setPopulation] = useState(0);
  const [brush, setBrush] = useState<Brush>(CELL_BRUSH);
  const [rule, setRule] = useState<Rule>(RULES[0]);
  const [palette, setPalette] = useState<Palette>(PALETTES[0]);
  const [patternView, setPatternView] = useState<"list" | "grid">("list");
  const [zoom, setZoom] = useState(DEFAULT_CELL_SIZE);
  const [showLoadRLE, setShowLoadRLE] = useState(false);
  const [rleText, setRleText] = useState("");
  const [rleError, setRleError] = useState<string | null>(null);

  const syncStats = useCallback(() => {
    setGeneration(generationRef.current);
    setPopulation(cellsRef.current.size);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = sizeRef.current;
    const { offsetX, offsetY, cellSize } = viewRef.current;

    ctx.fillStyle = "#0d1117";
    ctx.fillRect(0, 0, width, height);

    if (cellSize >= 6) {
      ctx.strokeStyle = "#21262d";
      ctx.lineWidth = 1;
      ctx.beginPath();
      const startX = -((offsetX % cellSize) + cellSize) % cellSize;
      const startY = -((offsetY % cellSize) + cellSize) % cellSize;
      for (let x = startX; x <= width; x += cellSize) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, height);
      }
      for (let y = startY; y <= height; y += cellSize) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
      }
      ctx.stroke();
    }

    const rectSize = Math.max(1, cellSize - (cellSize >= 6 ? 1 : 0));
    const fillRectAt = (cx: number, cy: number) => {
      const px = Math.round(cx * cellSize - offsetX);
      const py = Math.round(cy * cellSize - offsetY);
      ctx.fillRect(px, py, rectSize, rectSize);
    };

    const minCx = Math.floor(offsetX / cellSize) - 1;
    const maxCx = Math.ceil((offsetX + width) / cellSize) + 1;
    const minCy = Math.floor(offsetY / cellSize) - 1;
    const maxCy = Math.ceil((offsetY + height) / cellSize) + 1;

    const cells = cellsRef.current;
    const buckets: Array<Array<[number, number]> | undefined> = new Array(MAX_AGE + 1);
    for (const [key, age] of cells) {
      const [cx, cy] = parseKey(key);
      if (cx < minCx || cx > maxCx || cy < minCy || cy > maxCy) continue;
      const idx = age > MAX_AGE ? MAX_AGE : age;
      const bucket = buckets[idx] ?? (buckets[idx] = []);
      bucket.push([cx, cy]);
    }
    const palette = ageColorsRef.current;
    for (let i = 0; i <= MAX_AGE; i++) {
      const bucket = buckets[i];
      if (!bucket) continue;
      ctx.fillStyle = palette[i];
      for (const [cx, cy] of bucket) fillRectAt(cx, cy);
    }

    const b = brushRef.current;
    const hover = hoverCellRef.current;
    if (b.kind === "pattern" && hover && !pointerDownRef.current) {
      const { cx, cy } = patternCenter(b.pattern);
      ctx.fillStyle = "rgba(88, 166, 255, 0.35)";
      ctx.strokeStyle = "rgba(88, 166, 255, 0.9)";
      ctx.lineWidth = 1;
      for (const [x, y] of b.pattern.cells) {
        const tx = hover[0] + (x - cx);
        const ty = hover[1] + (y - cy);
        if (tx < minCx || tx > maxCx || ty < minCy || ty > maxCy) continue;
        const px = Math.round(tx * cellSize - offsetX);
        const py = Math.round(ty * cellSize - offsetY);
        const size = Math.max(1, cellSize - (cellSize >= 6 ? 1 : 0));
        ctx.fillRect(px, py, size, size);
        if (cellSize >= 4) ctx.strokeRect(px + 0.5, py + 0.5, size - 1, size - 1);
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = wrap.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext("2d");
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      const first = sizeRef.current.width === 0;
      sizeRef.current = { width: rect.width, height: rect.height };
      if (first) {
        viewRef.current.offsetX = -rect.width / 2;
        viewRef.current.offsetY = -rect.height / 2;
      }
      draw();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [draw]);

  useEffect(() => {
    const loop = (t: number) => {
      rafRef.current = requestAnimationFrame(loop);
      if (!isRunningRef.current) {
        lastTickRef.current = t;
        return;
      }
      const interval = 1000 / speedRef.current;
      if (t - lastTickRef.current >= interval) {
        lastTickRef.current = t;
        const { birth, survive } = ruleRef.current;
        cellsRef.current = step(cellsRef.current, birth, survive);
        generationRef.current += 1;
        draw();
        syncStats();
      }
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw, syncStats]);

  const toggleRun = () => {
    const next = !isRunningRef.current;
    isRunningRef.current = next;
    setIsRunning(next);
    lastTickRef.current = performance.now();
  };

  const doStep = () => {
    const { birth, survive } = ruleRef.current;
    cellsRef.current = step(cellsRef.current, birth, survive);
    generationRef.current += 1;
    draw();
    syncStats();
  };

  const doReset = () => {
    cellsRef.current = new Map();
    generationRef.current = 0;
    isRunningRef.current = false;
    setIsRunning(false);
    draw();
    syncStats();
  };

  const selectBrush = (next: Brush) => {
    brushRef.current = next;
    setBrush(next);
    draw();
  };

  const selectPalette = (name: string) => {
    const next = PALETTES.find((p) => p.name === name) ?? PALETTES[0];
    ageColorsRef.current = buildAgeColors(next, AGE_STEPS);
    setPalette(next);
    draw();
  };

  const legendGradient = useMemo(() => {
    const stops = Array.from({ length: LEGEND_STOPS }, (_, i) =>
      palette.build(i / (LEGEND_STOPS - 1)),
    );
    return `linear-gradient(to right, ${stops.join(", ")})`;
  }, [palette]);

  const selectRule = (name: string) => {
    const next = RULES.find((r) => r.name === name) ?? RULES[0];
    ruleRef.current = next;
    setRule(next);
    cellsRef.current = new Map();
    generationRef.current = 0;
    isRunningRef.current = false;
    setIsRunning(false);
    brushRef.current = CELL_BRUSH;
    setBrush(CELL_BRUSH);
    hoverCellRef.current = null;
    draw();
    syncStats();
  };

  const screenToCell = (clientX: number, clientY: number): [number, number] => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const { offsetX, offsetY, cellSize } = viewRef.current;
    return [Math.floor((x + offsetX) / cellSize), Math.floor((y + offsetY) / cellSize)];
  };

  const stampPattern = (pattern: Pattern, anchorX: number, anchorY: number) => {
    const { cx, cy } = patternCenter(pattern);
    const next = new Map(cellsRef.current);
    for (const [x, y] of pattern.cells) {
      next.set(cellKey(anchorX + (x - cx), anchorY + (y - cy)), 0);
    }
    cellsRef.current = next;
    draw();
    syncStats();
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
    pointerDownRef.current = true;

    if (e.button === 1 || e.button === 2 || e.shiftKey) {
      panRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        origOffsetX: viewRef.current.offsetX,
        origOffsetY: viewRef.current.offsetY,
      };
      return;
    }

    const [cx, cy] = screenToCell(e.clientX, e.clientY);
    const b = brushRef.current;

    if (b.kind === "pattern") {
      stampPattern(b.pattern, cx, cy);
      return;
    }

    const key = cellKey(cx, cy);
    const alive = cellsRef.current.has(key);
    paintModeRef.current = alive ? "remove" : "add";
    paintedRef.current = new Set();
    if (alive) cellsRef.current.delete(key);
    else cellsRef.current.set(key, 0);
    paintedRef.current.add(key);
    draw();
    syncStats();
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (panRef.current) {
      viewRef.current.offsetX = panRef.current.origOffsetX - (e.clientX - panRef.current.startX);
      viewRef.current.offsetY = panRef.current.origOffsetY - (e.clientY - panRef.current.startY);
      draw();
      return;
    }

    const [cx, cy] = screenToCell(e.clientX, e.clientY);
    const prev = hoverCellRef.current;
    const cellChanged = !prev || prev[0] !== cx || prev[1] !== cy;
    hoverCellRef.current = [cx, cy];

    if (paintModeRef.current) {
      const key = cellKey(cx, cy);
      if (!paintedRef.current.has(key)) {
        paintedRef.current.add(key);
        if (paintModeRef.current === "add") cellsRef.current.set(key, 0);
        else cellsRef.current.delete(key);
        draw();
        syncStats();
      }
      return;
    }

    if (cellChanged && brushRef.current.kind === "pattern") {
      draw();
    }
  };

  const onPointerUp = () => {
    paintModeRef.current = null;
    panRef.current = null;
    pointerDownRef.current = false;
    repaint();
    draw();
  };

  const onPointerLeave = () => {
    if (hoverCellRef.current) {
      hoverCellRef.current = null;
      if (brushRef.current.kind === "pattern") draw();
    }
  };

  const applyZoom = useCallback(
    (newSize: number, fx?: number, fy?: number) => {
      const view = viewRef.current;
      const { width, height } = sizeRef.current;
      const focalX = fx ?? width / 2;
      const focalY = fy ?? height / 2;
      const worldX = (focalX + view.offsetX) / view.cellSize;
      const worldY = (focalY + view.offsetY) / view.cellSize;
      view.cellSize = newSize;
      view.offsetX = worldX * newSize - focalX;
      view.offsetY = worldY * newSize - focalY;
      setZoom(newSize);
      draw();
    },
    [draw],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const factor = Math.exp(-e.deltaY * 0.01);
        const next = Math.max(
          MIN_CELL_SIZE,
          Math.min(MAX_CELL_SIZE, viewRef.current.cellSize * factor),
        );
        applyZoom(next, mx, my);
        return;
      }
      viewRef.current.offsetX += e.deltaX;
      viewRef.current.offsetY += e.deltaY;
      draw();
    };
    canvas.addEventListener("wheel", onWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", onWheel);
  }, [applyZoom, draw]);

  const onSpeedChange = (v: number) => {
    speedRef.current = v;
    setSpeed(v);
  };

  const isBrushActive = (b: Brush): boolean => {
    if (b.kind !== brush.kind) return false;
    if (b.kind === "cell") return true;
    return brush.kind === "pattern" && b.pattern.name === brush.pattern.name;
  };

  const loadRLE = (text: string) => {
    setRleError(null);
    try {
      const parsed = parseRLE(text);
      if (parsed.cells.length === 0) {
        setRleError("No cells found in RLE. Check that the pattern body ends with '!'.");
        return;
      }
      // Try to match rule
      if (parsed.birth && parsed.survive) {
        const birthStr = [...parsed.birth].sort().join("");
        const surviveStr = [...parsed.survive].sort().join("");
        const match = RULES.find((r) => {
          const rb = [...r.birth].sort().join("");
          const rs = [...r.survive].sort().join("");
          return rb === birthStr && rs === surviveStr;
        });
        if (match) {
          ruleRef.current = match;
          setRule(match);
        } else {
          // Create a custom rule on the fly
          const custom: Rule = {
            name: `Custom (${parsed.ruleNotation ?? "B?/S?"})`,
            notation: parsed.ruleNotation ?? "custom",
            description: "Loaded from RLE — rule not in built-in list",
            birth: parsed.birth,
            survive: parsed.survive,
            patterns: [],
          };
          ruleRef.current = custom;
          setRule(custom);
        }
      }
      // Reset and center the pattern on the viewport
      cellsRef.current = new Map();
      generationRef.current = 0;
      isRunningRef.current = false;
      setIsRunning(false);

      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      for (const [x, y] of parsed.cells) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
      const cx = Math.floor((minX + maxX) / 2);
      const cy = Math.floor((minY + maxY) / 2);

      // Fit zoom: auto-fit if pattern is too big for current view
      const { width, height } = sizeRef.current;
      const w = maxX - minX + 1;
      const h = maxY - minY + 1;
      const cellSizeToFit = Math.min(width / (w + 4), height / (h + 4));
      const desiredSize = Math.max(MIN_CELL_SIZE, Math.min(MAX_CELL_SIZE, cellSizeToFit));
      if (desiredSize < viewRef.current.cellSize) {
        viewRef.current.cellSize = desiredSize;
        setZoom(desiredSize);
      }

      // Center the pattern
      const size = viewRef.current.cellSize;
      viewRef.current.offsetX = cx * size - width / 2;
      viewRef.current.offsetY = cy * size - height / 2;

      // Stamp all cells
      for (const [x, y] of parsed.cells) {
        cellsRef.current.set(cellKey(x, y), 0);
      }

      brushRef.current = CELL_BRUSH;
      setBrush(CELL_BRUSH);
      hoverCellRef.current = null;
      draw();
      syncStats();
      setShowLoadRLE(false);
      setRleText("");
    } catch (err) {
      setRleError(err instanceof Error ? err.message : "Failed to parse RLE");
    }
  };

  const onRLEFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      setRleText(text);
    };
    reader.readAsText(file);
  };

  return (
    <div className="app">
      <div className="toolbar">
        <div className="group">
          <button className="primary" onClick={toggleRun}>
            {isRunning ? "Pause" : "Play"}
          </button>
          <button onClick={doStep} disabled={isRunning}>
            Step
          </button>
          <button className="danger" onClick={doReset}>
            Reset
          </button>
          <button onClick={() => { setShowLoadRLE(true); setRleError(null); }}>
            Load RLE
          </button>
        </div>

        <div className="group">
          <label htmlFor="speed">Speed</label>
          <input
            id="speed"
            type="range"
            min={1}
            max={60}
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
          />
          <span style={{ fontSize: 12, color: "var(--muted)", minWidth: 48 }}>{speed} fps</span>
        </div>

        <div className="group">
          <label htmlFor="zoom">Zoom</label>
          <input
            id="zoom"
            type="range"
            min={0}
            max={100}
            step={0.5}
            value={zoomToSlider(zoom)}
            onChange={(e) => applyZoom(sliderToZoom(Number(e.target.value)))}
          />
          <span style={{ fontSize: 12, color: "var(--muted)", minWidth: 48 }}>
            {(zoom / DEFAULT_CELL_SIZE).toFixed(2)}×
          </span>
        </div>

        <div className="stats">
          <span>Generation: <b>{generation}</b></span>
          <span>Population: <b>{population}</b></span>
        </div>
      </div>

      <div className="main">
        <aside className="sidebar">
          <div className="sidebar-scroll">
          <div className="sidebar-title">Rule</div>
          <select
            className="rule-select"
            value={rule.name}
            onChange={(e) => selectRule(e.target.value)}
          >
            {RULES.map((r) => (
              <option key={r.name} value={r.name}>
                {r.name} ({r.notation})
              </option>
            ))}
          </select>
          <div className="rule-description">{rule.description}</div>

          <div className="sidebar-title">Brush</div>
          <button
            type="button"
            className={`brush-item ${isBrushActive(CELL_BRUSH) ? "active" : ""}`}
            onClick={() => selectBrush(CELL_BRUSH)}
          >
            <div className="preview cell-preview" aria-hidden>
              <span />
            </div>
            <div className="brush-meta">
              <div className="brush-name">Cell</div>
              <div className="brush-desc">Paint individual cells (drag to fill)</div>
            </div>
          </button>

          <div className="section-header">
            <div className="sidebar-title inline">Patterns</div>
            <div className="view-toggle" role="tablist" aria-label="Pattern view">
              <button
                type="button"
                className={patternView === "list" ? "active" : ""}
                onClick={() => setPatternView("list")}
                title="List view"
                aria-label="List view"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <rect x="0" y="1" width="12" height="2" rx="1" />
                  <rect x="0" y="5" width="12" height="2" rx="1" />
                  <rect x="0" y="9" width="12" height="2" rx="1" />
                </svg>
              </button>
              <button
                type="button"
                className={patternView === "grid" ? "active" : ""}
                onClick={() => setPatternView("grid")}
                title="Grid view"
                aria-label="Grid view"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <rect x="0" y="0" width="5" height="5" rx="1" />
                  <rect x="7" y="0" width="5" height="5" rx="1" />
                  <rect x="0" y="7" width="5" height="5" rx="1" />
                  <rect x="7" y="7" width="5" height="5" rx="1" />
                </svg>
              </button>
            </div>
          </div>
          <div className={`pattern-container ${patternView}`}>
            {(() => {
              const nodes: ReactNode[] = [];
              let currentCategory: string | undefined;
              rule.patterns.forEach((pattern) => {
                if (pattern.category !== currentCategory) {
                  currentCategory = pattern.category;
                  if (currentCategory) {
                    nodes.push(
                      <div key={`cat-${currentCategory}`} className="pattern-category">
                        {currentCategory}
                      </div>,
                    );
                  }
                }
                const b: Brush = { kind: "pattern", pattern };
                const active = isBrushActive(b);
                const fullTitle = `${pattern.name} — ${pattern.description}`;
                if (patternView === "grid") {
                  nodes.push(
                    <button
                      key={pattern.name}
                      type="button"
                      className={`pattern-tile ${active ? "active" : ""}`}
                      onClick={() => selectBrush(b)}
                      title={fullTitle}
                    >
                      <PatternPreview pattern={pattern} />
                      <span className="pattern-tile-name">{pattern.name}</span>
                    </button>,
                  );
                } else {
                  nodes.push(
                    <button
                      key={pattern.name}
                      type="button"
                      className={`brush-item ${active ? "active" : ""}`}
                      onClick={() => selectBrush(b)}
                      title={pattern.description}
                    >
                      <PatternPreview pattern={pattern} />
                      <div className="brush-meta">
                        <div className="brush-name">{pattern.name}</div>
                        <div className="brush-desc">{pattern.description}</div>
                      </div>
                    </button>,
                  );
                }
              });
              return nodes;
            })()}
          </div>
          </div>

          <div className="sidebar-pinned">
            <div className="sidebar-title">Palette</div>
            <select
              className="rule-select"
              value={palette.name}
              onChange={(e) => selectPalette(e.target.value)}
            >
              {PALETTES.map((p) => (
                <option key={p.name} value={p.name} title={p.description}>
                  {p.name}
                </option>
              ))}
            </select>
            <div className="sidebar-legend">
              <div className="legend-bar" style={{ background: legendGradient }} />
              <div className="legend-ticks">
                <span>new</span>
                <span>{MAX_AGE}+ gen</span>
              </div>
            </div>
          </div>
        </aside>

        <div className="canvas-wrap" ref={wrapRef}>
          <canvas
            ref={canvasRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={onPointerLeave}
            onContextMenu={(e) => e.preventDefault()}
          />
          <div className="hint">
            {brush.kind === "pattern"
              ? `Click to stamp "${brush.pattern.name}" · Two-finger scroll or Shift+drag to pan · Pinch or Ctrl+scroll to zoom`
              : "Click/drag to paint cells · Two-finger scroll or Shift+drag to pan · Pinch or Ctrl+scroll to zoom"}
          </div>
        </div>
      </div>

      {showLoadRLE && (
        <div
          className="modal-backdrop"
          onClick={(e) => { if (e.target === e.currentTarget) setShowLoadRLE(false); }}
        >
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">Load RLE pattern</div>
              <button
                type="button"
                className="modal-close"
                onClick={() => setShowLoadRLE(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-hint">
                Paste RLE text from{" "}
                <a href="https://conwaylife.com/wiki/Category:Patterns" target="_blank" rel="noreferrer">
                  LifeWiki
                </a>
                {" "}or upload a .rle file. Rule (B/S) auto-detected from header.
              </p>
              <textarea
                className="rle-input"
                value={rleText}
                onChange={(e) => setRleText(e.target.value)}
                placeholder={`#N Glider\nx = 3, y = 3, rule = B3/S23\nbo$2bo$3o!`}
                spellCheck={false}
              />
              <div className="modal-actions">
                <label className="file-btn">
                  Upload .rle
                  <input
                    type="file"
                    accept=".rle,.lif,.life,.txt,text/plain"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) onRLEFile(f);
                      e.target.value = "";
                    }}
                  />
                </label>
                {rleError && <span className="rle-error">{rleError}</span>}
                <span style={{ flex: 1 }} />
                <button onClick={() => setShowLoadRLE(false)}>Cancel</button>
                <button className="primary" onClick={() => loadRLE(rleText)} disabled={!rleText.trim()}>
                  Load
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
