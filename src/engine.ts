export type LiveCells = Map<string, number>;

export const cellKey = (x: number, y: number): string => `${x},${y}`;

export const parseKey = (key: string): [number, number] => {
  const comma = key.indexOf(",");
  return [Number(key.slice(0, comma)), Number(key.slice(comma + 1))];
};

const NEIGHBORS: ReadonlyArray<readonly [number, number]> = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0],           [1, 0],
  [-1, 1],  [0, 1],  [1, 1],
];

export function step(cells: LiveCells): LiveCells {
  const neighborCounts = new Map<string, number>();

  for (const key of cells.keys()) {
    const [x, y] = parseKey(key);
    for (const [dx, dy] of NEIGHBORS) {
      const nk = cellKey(x + dx, y + dy);
      neighborCounts.set(nk, (neighborCounts.get(nk) ?? 0) + 1);
    }
  }

  const next: LiveCells = new Map();
  for (const [key, count] of neighborCounts) {
    const prevAge = cells.get(key);
    const wasAlive = prevAge !== undefined;
    if (count === 3 || (count === 2 && wasAlive)) {
      next.set(key, wasAlive ? prevAge + 1 : 0);
    }
  }
  return next;
}

export function bounds(cells: LiveCells): { minX: number; minY: number; maxX: number; maxY: number } | null {
  if (cells.size === 0) return null;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const key of cells.keys()) {
    const [x, y] = parseKey(key);
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
  return { minX, minY, maxX, maxY };
}
