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
  const body = rle
    .split("\n")
    .filter((line) => !line.startsWith("#") && !line.startsWith("x"))
    .join("")
    .replace(/\s/g, "");
  const out: Array<[number, number]> = [];
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
      for (let i = 0; i < n; i++) out.push([x + i, y]);
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
