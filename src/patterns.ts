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
