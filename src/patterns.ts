export interface Pattern {
  name: string;
  description: string;
  category?: string;
  cells: ReadonlyArray<readonly [number, number]>;
}

export const fromRows = (rows: string[]): Array<[number, number]> => {
  const out: Array<[number, number]> = [];
  rows.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      if (ch === "O" || ch === "#" || ch === "1") out.push([x, y]);
    });
  });
  return out;
};

/**
 * Parse standard RLE (Run Length Encoded) Life pattern body.
 * Tokens: b=dead, o=alive, $=end of row, !=end of pattern.
 * A number before a token repeats it. Header lines (x = …, rule = …)
 * and comment lines starting with # are stripped.
 */
export const fromRLE = (rle: string): Array<[number, number]> => {
  return parseRLE(rle).cells;
};

export interface ParsedRLE {
  cells: Array<[number, number]>;
  name?: string;
  width?: number;
  height?: number;
  birth?: Set<number>;
  survive?: Set<number>;
  ruleNotation?: string;
}

/**
 * Parse full RLE file including header (x=, y=, rule=) and comments.
 * Returns cells plus metadata so callers can detect the rule.
 */
export const parseRLE = (rle: string): ParsedRLE => {
  const out: ParsedRLE = { cells: [] };
  const lines = rle.split(/\r?\n/);
  const bodyLines: string[] = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("#N")) {
      out.name = line.slice(2).trim();
      continue;
    }
    if (line.startsWith("#")) continue;
    if (/^x\s*=/i.test(line)) {
      const xm = line.match(/x\s*=\s*(\d+)/i);
      const ym = line.match(/y\s*=\s*(\d+)/i);
      const rm = line.match(/rule\s*=\s*([^,\s]+)/i);
      if (xm) out.width = parseInt(xm[1], 10);
      if (ym) out.height = parseInt(ym[1], 10);
      if (rm) {
        const r = rm[1].toUpperCase();
        const b = r.match(/B([0-9]*)/);
        const s = r.match(/S([0-9]*)/);
        // Also support S23/B3 form and 23/3 form
        if (b && s) {
          out.birth = new Set((b[1] || "").split("").map(Number));
          out.survive = new Set((s[1] || "").split("").map(Number));
          out.ruleNotation = `B${b[1]}/S${s[1]}`;
        } else {
          // Try slash notation e.g. "23/3"
          const parts = r.split("/");
          if (parts.length === 2) {
            out.survive = new Set(parts[0].split("").filter((c) => /\d/.test(c)).map(Number));
            out.birth = new Set(parts[1].split("").filter((c) => /\d/.test(c)).map(Number));
            out.ruleNotation = `B${parts[1]}/S${parts[0]}`;
          }
        }
      }
      continue;
    }
    bodyLines.push(line);
  }
  const body = bodyLines.join("").replace(/\s/g, "");
  let x = 0;
  let y = 0;
  let num = "";
  for (const ch of body) {
    if (ch >= "0" && ch <= "9") {
      num += ch;
      continue;
    }
    const n = num ? parseInt(num, 10) : 1;
    num = "";
    if (ch === "b") {
      x += n;
    } else if (ch === "o") {
      for (let i = 0; i < n; i++) out.cells.push([x + i, y]);
      x += n;
    } else if (ch === "$") {
      y += n;
      x = 0;
    } else if (ch === "!") {
      break;
    }
  }
  return out;
};
