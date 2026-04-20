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
  // Still lifes
  {
    name: "Block",
    description: "Simplest still life (2×2)",
    cells: fromRows(["OO", "OO"]),
  },
  {
    name: "Beehive",
    description: "6-cell still life",
    cells: fromRows([".OO.", "O..O", ".OO."]),
  },
  {
    name: "Loaf",
    description: "7-cell still life",
    cells: fromRows([".OO.", "O..O", ".O.O", "..O."]),
  },
  {
    name: "Boat",
    description: "5-cell still life",
    cells: fromRows(["OO.", "O.O", ".O."]),
  },
  {
    name: "Tub",
    description: "4-cell still life (hollow boat)",
    cells: fromRows([".O.", "O.O", ".O."]),
  },
  {
    name: "Pond",
    description: "8-cell still life",
    cells: fromRows([".OO.", "O..O", "O..O", ".OO."]),
  },
  {
    name: "Ship",
    description: "6-cell still life",
    cells: fromRows(["OO.", "O.O", ".OO"]),
  },
  {
    name: "Long boat",
    description: "Boat with an extra cell",
    cells: fromRows(["OO..", "O.O.", ".O.O", "..O."]),
  },
  {
    name: "Eater 1",
    description: "Fishhook — consumes incoming gliders",
    cells: fromRows(["OO..", "O.O.", "..O.", "..OO"]),
  },

  // Oscillators
  {
    name: "Blinker",
    description: "Period-2 oscillator (3 cells)",
    cells: fromRows(["OOO"]),
  },
  {
    name: "Toad",
    description: "Period-2 oscillator",
    cells: fromRows([".OOO", "OOO."]),
  },
  {
    name: "Beacon",
    description: "Period-2 oscillator",
    cells: fromRows(["OO..", "OO..", "..OO", "..OO"]),
  },
  {
    name: "Traffic light",
    description: "Period-2 — four blinkers in cross",
    cells: fromRows([
      "...O...",
      "...O...",
      "...O...",
      ".......",
      "OOO.OOO",
      ".......",
      "...O...",
      "...O...",
      "...O...",
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
    cells: fromRows(["..O....O..", "OO.OOOO.OO", "..O....O.."]),
  },

  // Spaceships
  {
    name: "Glider",
    description: "Smallest spaceship (c/4 diagonal)",
    cells: fromRows([".O.", "..O", "OOO"]),
  },
  {
    name: "Lightweight spaceship",
    description: "LWSS — c/2 orthogonal",
    cells: fromRows([".O..O", "O....", "O...O", "OOOO."]),
  },

  // Guns
  {
    name: "Gosper glider gun",
    description: "Period-30 gun — emits gliders forever",
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

  // Methuselahs
  {
    name: "R-pentomino",
    description: "Methuselah — stabilizes at gen 1103",
    cells: fromRows([".OO", "OO.", ".O."]),
  },
  {
    name: "Acorn",
    description: "Methuselah — evolves for 5206 generations",
    cells: fromRows([".O.....", "...O...", "OO..OOO"]),
  },
  {
    name: "Diehard",
    description: "Dies after exactly 130 generations",
    cells: fromRows(["......O.", "OO......", ".O...OOO"]),
  },
  {
    name: "Thunderbird",
    description: "Methuselah — 243 generations",
    cells: fromRows(["OOO", "...", ".O.", ".O.", ".O."]),
  },
  {
    name: "B-heptomino",
    description: "7-cell methuselah (~148 generations)",
    cells: fromRows([".OO.", "OO.O", ".O.."]),
  },
  {
    name: "Pi-heptomino",
    description: "7-cell methuselah — pi-shape",
    cells: fromRows(["OOO", "O.O", "O.O"]),
  },
];

const HIGHLIFE: Pattern[] = [
  {
    name: "Replicator",
    description: "Self-replicating 5×5 — unique to HighLife",
    cells: fromRows([".OOO", "O..O", "O..O", "O..O", "OOO."]),
  },
  {
    name: "Block",
    description: "Still life",
    cells: fromRows(["OO", "OO"]),
  },
  {
    name: "Beehive",
    description: "6-cell still life",
    cells: fromRows([".OO.", "O..O", ".OO."]),
  },
  {
    name: "Loaf",
    description: "7-cell still life",
    cells: fromRows([".OO.", "O..O", ".O.O", "..O."]),
  },
  {
    name: "Boat",
    description: "5-cell still life",
    cells: fromRows(["OO.", "O.O", ".O."]),
  },
  {
    name: "Tub",
    description: "4-cell still life",
    cells: fromRows([".O.", "O.O", ".O."]),
  },
  {
    name: "Pond",
    description: "8-cell still life",
    cells: fromRows([".OO.", "O..O", "O..O", ".OO."]),
  },
  {
    name: "Blinker",
    description: "Period-2 oscillator",
    cells: fromRows(["OOO"]),
  },
  {
    name: "Toad",
    description: "Period-2 oscillator",
    cells: fromRows([".OOO", "OOO."]),
  },
  {
    name: "Glider",
    description: "Same c/4 glider as Life",
    cells: fromRows([".O.", "..O", "OOO"]),
  },
  {
    name: "LWSS",
    description: "Lightweight spaceship",
    cells: fromRows([".O..O", "O....", "O...O", "OOOO."]),
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
    description: "Two cells — smallest live seed",
    cells: fromRows(["OO"]),
  },
  {
    name: "Line 3",
    description: "Three cells in a row",
    cells: fromRows(["OOO"]),
  },
  {
    name: "Line 4",
    description: "Four cells — bigger blast",
    cells: fromRows(["OOOO"]),
  },
  {
    name: "L-tromino",
    description: "Asymmetric 3-cell seed",
    cells: fromRows(["OO", "O."]),
  },
  {
    name: "T-tetromino",
    description: "Explodes into a symmetric fractal field",
    cells: fromRows(["OOO", ".O."]),
  },
  {
    name: "Cross",
    description: "Symmetric 5-cell explosion",
    cells: fromRows([".O.", "OOO", ".O."]),
  },
  {
    name: "Switch",
    description: "A small 'switch engine' starter",
    cells: fromRows(["O.O", "O.."]),
  },
  {
    name: "Phoenix",
    description: "12-cell pattern — all cells die and reappear",
    cells: fromRows([
      "...O....",
      ".O.O....",
      "O.......",
      ".......O",
      "....O.O.",
      "....O...",
    ]),
  },
];

const DAYNIGHT: Pattern[] = [
  {
    name: "Block",
    description: "Still life (2×2)",
    cells: fromRows(["OO", "OO"]),
  },
  {
    name: "Blinker",
    description: "Period-2 oscillator",
    cells: fromRows(["OOO"]),
  },
  {
    name: "3×3 solid",
    description: "Filled square — evolves into a ring",
    cells: fromRows(["OOO", "OOO", "OOO"]),
  },
  {
    name: "4×4 solid",
    description: "Dense seed — rich evolution",
    cells: fromRows(["OOOO", "OOOO", "OOOO", "OOOO"]),
  },
  {
    name: "Ring 5×5",
    description: "Hollow square starter",
    cells: fromRows(["OOOOO", "O...O", "O...O", "O...O", "OOOOO"]),
  },
  {
    name: "Rocket",
    description: "Period-7 spaceship candidate",
    cells: fromRows([".O...", "OO.OO", "O...O", "O...O", "OOOOO"]),
  },
  {
    name: "Random cluster",
    description: "Chaotic starter",
    cells: fromRows([".OO.", "O.OO", "OO.O", ".O.."]),
  },
];

const MAZE: Pattern[] = [
  {
    name: "Block",
    description: "2×2 seed — grows into a maze",
    cells: fromRows(["OO", "OO"]),
  },
  {
    name: "3×3 solid",
    description: "Filled square — dense maze expansion",
    cells: fromRows(["OOO", "OOO", "OOO"]),
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
    name: "L-shape",
    description: "Asymmetric 5-cell starter",
    cells: fromRows(["OOO", "O..", "O.."]),
  },
  {
    name: "Z-shape",
    description: "Z-pattern seed",
    cells: fromRows(["OO.", ".O.", ".OO"]),
  },
  {
    name: "Line of 5",
    description: "Horizontal line starter",
    cells: fromRows(["OOOOO"]),
  },
  {
    name: "R-pentomino",
    description: "Life-like methuselah — grows a big maze",
    cells: fromRows([".OO", "OO.", ".O."]),
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
    description: "Life glider — here spawns permanent structure",
    cells: fromRows([".O.", "..O", "OOO"]),
  },
  {
    name: "Acorn",
    description: "Life methuselah — indefinite growth",
    cells: fromRows([".O.....", "...O...", "OO..OOO"]),
  },
  {
    name: "T-tetromino",
    description: "Asymmetric growth",
    cells: fromRows(["OOO", ".O."]),
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
  {
    name: "Ladder seed",
    description: "Tries to grow into a diagonal ladder",
    cells: fromRows(["OO..", "O...", ".O.O", "..OO"]),
  },
  {
    name: "Block",
    description: "Quiet 2×2 — requires neighbors to grow",
    cells: fromRows(["OO", "OO"]),
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
