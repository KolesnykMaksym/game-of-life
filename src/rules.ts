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

// ---------- Constructions (multi-component compositions) ----------

const CONWAY_CONSTRUCTIONS: Pattern[] = [
  {
    name: "Glider vs Block",
    description: "SE glider collides with a block",
    category: "Constructions",
    cells: [
      // SE glider at (0,0)
      [1, 0], [2, 1], [0, 2], [1, 2], [2, 2],
      // Block at (12,12)
      [12, 12], [13, 12], [12, 13], [13, 13],
    ],
  },
  {
    name: "Head-on gliders",
    description: "SE glider meets NW glider — head-on",
    category: "Constructions",
    cells: [
      // SE glider at (0,0)
      [1, 0], [2, 1], [0, 2], [1, 2], [2, 2],
      // NW glider at (12,12): shape OOO/O../.O.
      [12, 12], [13, 12], [14, 12], [12, 13], [13, 14],
    ],
  },
  {
    name: "R-pent pair",
    description: "Two R-pentominoes evolving in parallel",
    category: "Constructions",
    cells: [
      // Left R-pent at (0,0)
      [1, 0], [2, 0], [0, 1], [1, 1], [1, 2],
      // Right R-pent at (15,0)
      [16, 0], [17, 0], [15, 1], [16, 1], [16, 2],
    ],
  },
  {
    name: "Glider trio",
    description: "Three gliders marching SE in a diagonal queue",
    category: "Constructions",
    cells: [
      // Glider 1 at (0,0)
      [1, 0], [2, 1], [0, 2], [1, 2], [2, 2],
      // Glider 2 at (8,8)
      [9, 8], [10, 9], [8, 10], [9, 10], [10, 10],
      // Glider 3 at (16,16)
      [17, 16], [18, 17], [16, 18], [17, 18], [18, 18],
    ],
  },
  {
    name: "Acorn + Block",
    description: "Acorn methuselah with a block at its path",
    category: "Constructions",
    cells: [
      // Acorn at (0,0)
      [1, 0], [3, 1], [0, 2], [1, 2], [4, 2], [5, 2], [6, 2],
      // Block at (20,15)
      [20, 15], [21, 15], [20, 16], [21, 16],
    ],
  },
];

const HIGHLIFE_CONSTRUCTIONS: Pattern[] = [
  {
    name: "Replicator pair",
    description: "Two replicators 10 cells apart",
    category: "Constructions",
    cells: [
      // Left replicator at (0,0): .OOO/O..O/O..O/O..O/OOO.
      [1, 0], [2, 0], [3, 0], [0, 1], [3, 1], [0, 2], [3, 2], [0, 3], [3, 3], [0, 4], [1, 4], [2, 4],
      // Right replicator at (10,0)
      [11, 0], [12, 0], [13, 0], [10, 1], [13, 1], [10, 2], [13, 2], [10, 3], [13, 3], [10, 4], [11, 4], [12, 4],
    ],
  },
  {
    name: "Replicator + Block",
    description: "Replicator next to a block still life",
    category: "Constructions",
    cells: [
      // Replicator at (0,0)
      [1, 0], [2, 0], [3, 0], [0, 1], [3, 1], [0, 2], [3, 2], [0, 3], [3, 3], [0, 4], [1, 4], [2, 4],
      // Block at (10,0)
      [10, 0], [11, 0], [10, 1], [11, 1],
    ],
  },
  {
    name: "Four replicators",
    description: "Symmetric square of replicators",
    category: "Constructions",
    cells: [
      // Top-left (0,0)
      [1, 0], [2, 0], [3, 0], [0, 1], [3, 1], [0, 2], [3, 2], [0, 3], [3, 3], [0, 4], [1, 4], [2, 4],
      // Top-right (15,0)
      [16, 0], [17, 0], [18, 0], [15, 1], [18, 1], [15, 2], [18, 2], [15, 3], [18, 3], [15, 4], [16, 4], [17, 4],
      // Bottom-left (0,15)
      [1, 15], [2, 15], [3, 15], [0, 16], [3, 16], [0, 17], [3, 17], [0, 18], [3, 18], [0, 19], [1, 19], [2, 19],
      // Bottom-right (15,15)
      [16, 15], [17, 15], [18, 15], [15, 16], [18, 16], [15, 17], [18, 17], [15, 18], [18, 18], [15, 19], [16, 19], [17, 19],
    ],
  },
];

const SEEDS_CONSTRUCTIONS: Pattern[] = [
  {
    name: "Two dominoes",
    description: "Two domino seeds — interference patterns",
    category: "Constructions",
    cells: [
      [0, 0], [1, 0],
      [6, 6], [7, 6],
    ],
  },
  {
    name: "Two T-tetrominoes",
    description: "Two T-shapes — overlapping explosions",
    category: "Constructions",
    cells: [
      [0, 0], [1, 0], [2, 0], [1, 1],
      [10, 0], [11, 0], [12, 0], [11, 1],
    ],
  },
  {
    name: "Cross quartet",
    description: "Four crosses in symmetric cross arrangement",
    category: "Constructions",
    cells: [
      // Top (5,0)
      [5, 0], [4, 1], [5, 1], [6, 1], [5, 2],
      // Left (0,5)
      [0, 5], [-1, 6], [0, 6], [1, 6], [0, 7],
      // Right (10,5)
      [10, 5], [9, 6], [10, 6], [11, 6], [10, 7],
      // Bottom (5,10)
      [5, 10], [4, 11], [5, 11], [6, 11], [5, 12],
    ],
  },
];

const DAYNIGHT_CONSTRUCTIONS: Pattern[] = [
  {
    name: "Two blocks",
    description: "Two blocks — stable coexistence",
    category: "Constructions",
    cells: [
      [0, 0], [1, 0], [0, 1], [1, 1],
      [8, 8], [9, 8], [8, 9], [9, 9],
    ],
  },
  {
    name: "Block + 3×3 solid",
    description: "Low-density and high-density seeds side by side",
    category: "Constructions",
    cells: [
      [0, 0], [1, 0], [0, 1], [1, 1],
      [6, 0], [7, 0], [8, 0], [6, 1], [7, 1], [8, 1], [6, 2], [7, 2], [8, 2],
    ],
  },
  {
    name: "Four 3×3 solids",
    description: "Symmetric 2×2 arrangement of filled squares",
    category: "Constructions",
    cells: [
      // TL at (0,0)
      [0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1], [0, 2], [1, 2], [2, 2],
      // TR at (8,0)
      [8, 0], [9, 0], [10, 0], [8, 1], [9, 1], [10, 1], [8, 2], [9, 2], [10, 2],
      // BL at (0,8)
      [0, 8], [1, 8], [2, 8], [0, 9], [1, 9], [2, 9], [0, 10], [1, 10], [2, 10],
      // BR at (8,8)
      [8, 8], [9, 8], [10, 8], [8, 9], [9, 9], [10, 9], [8, 10], [9, 10], [10, 10],
    ],
  },
];

const MAZE_CONSTRUCTIONS: Pattern[] = [
  {
    name: "Block cluster",
    description: "Four blocks — mazes merge into a larger network",
    category: "Constructions",
    cells: [
      // TL at (0,0)
      [0, 0], [1, 0], [0, 1], [1, 1],
      // TR at (5,0)
      [5, 0], [6, 0], [5, 1], [6, 1],
      // BL at (0,5)
      [0, 5], [1, 5], [0, 6], [1, 6],
      // BR at (5,5)
      [5, 5], [6, 5], [5, 6], [6, 6],
    ],
  },
  {
    name: "Cross lattice",
    description: "Five crosses in quincunx — symmetric maze growth",
    category: "Constructions",
    cells: [
      // Center cross (5,5)
      [5, 4], [4, 5], [5, 5], [6, 5], [5, 6],
      // TL cross (0,0)
      [0, -1], [-1, 0], [0, 0], [1, 0], [0, 1],
      // TR cross (10,0)
      [10, -1], [9, 0], [10, 0], [11, 0], [10, 1],
      // BL cross (0,10)
      [0, 9], [-1, 10], [0, 10], [1, 10], [0, 11],
      // BR cross (10,10)
      [10, 9], [9, 10], [10, 10], [11, 10], [10, 11],
    ],
  },
  {
    name: "Big block",
    description: "5×5 filled square — complex maze outgrowth",
    category: "Constructions",
    cells: [
      [0, 0], [1, 0], [2, 0], [3, 0], [4, 0],
      [0, 1], [1, 1], [2, 1], [3, 1], [4, 1],
      [0, 2], [1, 2], [2, 2], [3, 2], [4, 2],
      [0, 3], [1, 3], [2, 3], [3, 3], [4, 3],
      [0, 4], [1, 4], [2, 4], [3, 4], [4, 4],
    ],
  },
];

const LWOD_CONSTRUCTIONS: Pattern[] = [
  {
    name: "R-pent pair",
    description: "Two R-pentominoes growing together",
    category: "Constructions",
    cells: [
      [1, 0], [2, 0], [0, 1], [1, 1], [1, 2],
      [16, 0], [17, 0], [15, 1], [16, 1], [16, 2],
    ],
  },
  {
    name: "R-pent + Acorn",
    description: "Two methuselahs with different growth rates",
    category: "Constructions",
    cells: [
      // R-pent at (0,0)
      [1, 0], [2, 0], [0, 1], [1, 1], [1, 2],
      // Acorn at (12,0)
      [13, 0], [15, 1], [12, 2], [13, 2], [16, 2], [17, 2], [18, 2],
    ],
  },
  {
    name: "Four gliders",
    description: "Four Life gliders in cross — permanent cross structure",
    category: "Constructions",
    cells: [
      // Top glider (5,0)
      [6, 0], [7, 1], [5, 2], [6, 2], [7, 2],
      // Left (0,5)
      [1, 5], [2, 6], [0, 7], [1, 7], [2, 7],
      // Right (10,5)
      [11, 5], [12, 6], [10, 7], [11, 7], [12, 7],
      // Bottom (5,10)
      [6, 10], [7, 11], [5, 12], [6, 12], [7, 12],
    ],
  },
];

export const RULES: readonly Rule[] = [
  {
    name: "Conway's Life",
    notation: "B3/S23",
    description: "The classic cellular automaton",
    birth: new Set([3]),
    survive: new Set([2, 3]),
    patterns: [...CONWAY, ...CONWAY_CONSTRUCTIONS],
  },
  {
    name: "HighLife",
    notation: "B36/S23",
    description: "Like Life, but also birth on 6 — supports self-replicators",
    birth: new Set([3, 6]),
    survive: new Set([2, 3]),
    patterns: [...HIGHLIFE, ...HIGHLIFE_CONSTRUCTIONS],
  },
  {
    name: "Seeds",
    notation: "B2/S",
    description: "No cell survives; birth on exactly 2. Explosive.",
    birth: new Set([2]),
    survive: new Set(),
    patterns: [...SEEDS, ...SEEDS_CONSTRUCTIONS],
  },
  {
    name: "Day & Night",
    notation: "B3678/S34678",
    description: "Symmetric under on↔off inversion",
    birth: new Set([3, 6, 7, 8]),
    survive: new Set([3, 4, 6, 7, 8]),
    patterns: [...DAYNIGHT, ...DAYNIGHT_CONSTRUCTIONS],
  },
  {
    name: "Maze",
    notation: "B3/S12345",
    description: "Seeds grow into maze-like corridors",
    birth: new Set([3]),
    survive: new Set([1, 2, 3, 4, 5]),
    patterns: [...MAZE, ...MAZE_CONSTRUCTIONS],
  },
  {
    name: "Life without Death",
    notation: "B3/S012345678",
    description: "Cells are born but never die — infinite growth",
    birth: new Set([3]),
    survive: new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]),
    patterns: [...LWOD, ...LWOD_CONSTRUCTIONS],
  },
];
