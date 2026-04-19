export interface Pattern {
  name: string;
  description: string;
  cells: ReadonlyArray<readonly [number, number]>;
}

const fromRows = (rows: string[]): Array<[number, number]> => {
  const out: Array<[number, number]> = [];
  rows.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      if (ch === "O" || ch === "#" || ch === "1") out.push([x, y]);
    });
  });
  return out;
};

export const PATTERNS: Pattern[] = [
  {
    name: "Glider",
    description: "Smallest spaceship (period 4)",
    cells: fromRows([
      ".O.",
      "..O",
      "OOO",
    ]),
  },
  {
    name: "Blinker",
    description: "Period-2 oscillator",
    cells: fromRows(["OOO"]),
  },
  {
    name: "Toad",
    description: "Period-2 oscillator",
    cells: fromRows([
      ".OOO",
      "OOO.",
    ]),
  },
  {
    name: "Beacon",
    description: "Period-2 oscillator",
    cells: fromRows([
      "OO..",
      "OO..",
      "..OO",
      "..OO",
    ]),
  },
  {
    name: "Pulsar",
    description: "Period-3 oscillator",
    cells: fromRows([
      "..OOO...OOO..",
      ".............",
      "O....O.O....O",
      "O....O.O....O",
      "O....O.O....O",
      "..OOO...OOO..",
      ".............",
      "..OOO...OOO..",
      "O....O.O....O",
      "O....O.O....O",
      "O....O.O....O",
      ".............",
      "..OOO...OOO..",
    ]),
  },
  {
    name: "Pentadecathlon",
    description: "Period-15 oscillator",
    cells: fromRows([
      "..O....O..",
      "OO.OOOO.OO",
      "..O....O..",
    ]),
  },
  {
    name: "Lightweight spaceship",
    description: "LWSS — moves horizontally",
    cells: fromRows([
      ".O..O",
      "O....",
      "O...O",
      "OOOO.",
    ]),
  },
  {
    name: "Gosper glider gun",
    description: "Emits gliders forever",
    cells: fromRows([
      "........................O...........",
      "......................O.O...........",
      "............OO......OO............OO",
      "...........O...O....OO............OO",
      "OO........O.....O...OO..............",
      "OO........O...O.OO....O.O...........",
      "..........O.....O.......O...........",
      "...........O...O....................",
      "............OO......................",
    ]),
  },
  {
    name: "R-pentomino",
    description: "Chaotic methuselah (stabilizes at gen 1103)",
    cells: fromRows([
      ".OO",
      "OO.",
      ".O.",
    ]),
  },
  {
    name: "Acorn",
    description: "Methuselah — evolves for 5206 generations",
    cells: fromRows([
      ".O.....",
      "...O...",
      "OO..OOO",
    ]),
  },
  {
    name: "Diehard",
    description: "Dies after exactly 130 generations",
    cells: fromRows([
      "......O.",
      "OO......",
      ".O...OOO",
    ]),
  },
];
