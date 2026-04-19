import { fromRows, type Pattern } from "./patterns";

export interface Rule {
  name: string;
  notation: string;
  description: string;
  birth: ReadonlySet<number>;
  survive: ReadonlySet<number>;
  patterns: readonly Pattern[];
}

const CONWAY: Pattern[] = [
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

const HIGHLIFE: Pattern[] = [
  {
    name: "Replicator",
    description: "Self-replicating 5×5 pattern (unique to HighLife)",
    cells: fromRows([
      ".OOO",
      "O..O",
      "O..O",
      "O..O",
      "OOO.",
    ]),
  },
  {
    name: "Block",
    description: "Still life",
    cells: fromRows(["OO", "OO"]),
  },
  {
    name: "Blinker",
    description: "Period-2 oscillator",
    cells: fromRows(["OOO"]),
  },
  {
    name: "Glider",
    description: "Same glider as in Life",
    cells: fromRows([".O.", "..O", "OOO"]),
  },
  {
    name: "R-pentomino",
    description: "Chaotic starter",
    cells: fromRows([".OO", "OO.", ".O."]),
  },
];

const SEEDS: Pattern[] = [
  {
    name: "Domino",
    description: "Two adjacent cells — smallest live seed",
    cells: fromRows(["OO"]),
  },
  {
    name: "T-tetromino",
    description: "Explodes into a symmetric field",
    cells: fromRows(["OOO", ".O."]),
  },
  {
    name: "L-tromino",
    description: "Asymmetric 3-cell seed",
    cells: fromRows(["OO", "O."]),
  },
  {
    name: "Switch",
    description: "A small 'switch engine' starter",
    cells: fromRows(["O.O", "O.."]),
  },
];

const DAYNIGHT: Pattern[] = [
  {
    name: "Block",
    description: "Still life",
    cells: fromRows(["OO", "OO"]),
  },
  {
    name: "Blinker",
    description: "Small oscillator",
    cells: fromRows(["OOO"]),
  },
  {
    name: "Rocket",
    description: "Period-7 spaceship candidate",
    cells: fromRows([
      ".O...",
      "OO.OO",
      "O...O",
      "O...O",
      "OOOOO",
    ]),
  },
  {
    name: "Random cluster",
    description: "Chaotic starter",
    cells: fromRows([
      ".OO.",
      "O.OO",
      "OO.O",
      ".O..",
    ]),
  },
];

const MAZE: Pattern[] = [
  {
    name: "Block",
    description: "2×2 block grows into a maze",
    cells: fromRows(["OO", "OO"]),
  },
  {
    name: "T-tetromino",
    description: "Seeds a branching maze",
    cells: fromRows(["OOO", ".O."]),
  },
  {
    name: "Cross",
    description: "Symmetric 5-cell seed",
    cells: fromRows([".O.", "OOO", ".O."]),
  },
  {
    name: "Line of 5",
    description: "Horizontal line starter",
    cells: fromRows(["OOOOO"]),
  },
];

const LWOD: Pattern[] = [
  {
    name: "R-pentomino",
    description: "Grows forever (cells never die)",
    cells: fromRows([".OO", "OO.", ".O."]),
  },
  {
    name: "Glider seed",
    description: "A Life glider — here it spawns permanent structure",
    cells: fromRows([".O.", "..O", "OOO"]),
  },
  {
    name: "Line of 5",
    description: "Evolves into a growing frame",
    cells: fromRows(["OOOOO"]),
  },
  {
    name: "Cross",
    description: "Small 5-cell seed",
    cells: fromRows([".O.", "OOO", ".O."]),
  },
];

export const RULES: readonly Rule[] = [
  {
    name: "Conway's Life",
    notation: "B3/S23",
    description: "The classic cellular automaton",
    birth: new Set([3]),
    survive: new Set([2, 3]),
    patterns: CONWAY,
  },
  {
    name: "HighLife",
    notation: "B36/S23",
    description: "Like Life, but also birth on 6 — supports self-replicators",
    birth: new Set([3, 6]),
    survive: new Set([2, 3]),
    patterns: HIGHLIFE,
  },
  {
    name: "Seeds",
    notation: "B2/S",
    description: "No cell survives; birth on exactly 2. Explosive.",
    birth: new Set([2]),
    survive: new Set(),
    patterns: SEEDS,
  },
  {
    name: "Day & Night",
    notation: "B3678/S34678",
    description: "Symmetric under on↔off inversion",
    birth: new Set([3, 6, 7, 8]),
    survive: new Set([3, 4, 6, 7, 8]),
    patterns: DAYNIGHT,
  },
  {
    name: "Maze",
    notation: "B3/S12345",
    description: "Seeds grow into maze-like corridors",
    birth: new Set([3]),
    survive: new Set([1, 2, 3, 4, 5]),
    patterns: MAZE,
  },
  {
    name: "Life without Death",
    notation: "B3/S012345678",
    description: "Cells are born but never die — infinite growth",
    birth: new Set([3]),
    survive: new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]),
    patterns: LWOD,
  },
];
