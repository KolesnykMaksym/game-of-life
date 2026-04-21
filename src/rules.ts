import { fromRLE, fromRows, type Pattern } from "./patterns";

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

// ---------- Machines (famous complex Life constructions, from LifeWiki RLE) ----------

const CONWAY_MACHINES: Pattern[] = [
  {
    name: "Copperhead",
    description: "Period-10 c/10 orthogonal spaceship — discovered 2016",
    category: "Machines",
    cells: fromRLE("b2o2b2o$3b2o$3b2o$obo2bobo$o6bo2$o6bo$b2o2b2o$2b4o2$3b2o$3b2o!"),
  },
  {
    name: "Simkin glider gun",
    description: "Smallest known glider gun — period 120, 29 cells",
    category: "Machines",
    cells: fromRLE("2o5b2o$2o5b2o2$4b2o$4b2o5$22bo3bo$21bo4b2o$20b2o5b2o2b2o$21b2o4bo3b2o$22bo!"),
  },
  {
    name: "Queen bee shuttle",
    description: "Period-30 oscillator — the heart of the Gosper gun",
    category: "Machines",
    cells: fromRLE("9bo$7bobo$6bobo11b2o$2o3bo2bo11b2o$2o4bobo$7bobo$9bo!"),
  },
  {
    name: "Twin bees shuttle",
    description: "Period-46 oscillator by Bill Gosper",
    category: "Machines",
    cells: fromRLE("17b2o$2o15bobo7b2o$2o17bo7b2o$17b3o4$17b3o$2o17bo$2o15bobo$17b2o!"),
  },
  {
    name: "Blinker puffer",
    description: "Puffer train — leaves a trail of blinkers as it moves",
    category: "Machines",
    cells: fromRLE("3bo$bo3bo$o$o4bo$5o4$b2o$2ob3o$b4o$2b2o2$5b2o$3bo4bo$2bo$2bo5bo$2b6o!"),
  },
  {
    name: "Weekender",
    description: "Period-7 c/7 spaceship — 36 cells",
    category: "Machines",
    cells: fromRLE("bo12bo$bo12bo$obo10bobo$bo12bo$bo12bo$2bo3b4o3bo$6b4o$2b4o4b4o2$4bo6bo$5b2o2b2o!"),
  },
  {
    name: "MWSS",
    description: "Middle-weight spaceship — c/2 orthogonal (11 cells)",
    category: "Machines",
    cells: fromRLE("3bo$bo3bo$o$o4bo$5o!"),
  },
  {
    name: "HWSS",
    description: "Heavy-weight spaceship — c/2 orthogonal (13 cells)",
    category: "Machines",
    cells: fromRLE("3b2o$bo4bo$o$o5bo$6o!"),
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

// ─── Morley / Move (B368/S245) ───────────────────────────────────────────────

const MORLEY: Pattern[] = [
  {
    name: "R-pentomino",
    description: "Chaotic methuselah — long evolution",
    cells: fromRows([".OO", "OO.", ".O."]),
  },
  {
    name: "Acorn",
    description: "Long-lived seed — hundreds of generations",
    cells: fromRows([".O.....", "...O...", "OO..OOO"]),
  },
  {
    name: "T-tetromino",
    description: "Symmetric 4-cell seed",
    cells: fromRows(["OOO", ".O."]),
  },
  {
    name: "Cross",
    description: "Symmetric 5-cell seed",
    cells: fromRows([".O.", "OOO", ".O."]),
  },
  {
    name: "Pi-heptomino",
    description: "7-cell seed — rich evolution",
    cells: fromRows(["OOO", "O.O", "O.O"]),
  },
  {
    name: "Z-tetromino",
    description: "Skew 4-cell seed",
    cells: fromRows(["OO.", ".OO"]),
  },
  {
    name: "Line of 5",
    description: "Horizontal starter",
    cells: fromRows(["OOOOO"]),
  },
  {
    name: "Blinker",
    description: "3-cell row seed",
    cells: fromRows(["OOO"]),
  },
  {
    name: "Dense 4×4",
    description: "Filled square — complex breakup",
    cells: fromRows(["OOOO", "OOOO", "OOOO", "OOOO"]),
  },
];

const MORLEY_CONSTRUCTIONS: Pattern[] = [
  {
    name: "Two R-pentos",
    description: "Pair of R-pentominoes — interacting chaotic evolution",
    category: "Constructions",
    cells: [
      [1, 0], [2, 0], [0, 1], [1, 1], [1, 2],
      [16, 0], [17, 0], [15, 1], [16, 1], [16, 2],
    ],
  },
  {
    name: "Four crosses",
    description: "Symmetric quartet of cross seeds",
    category: "Constructions",
    cells: [
      [1, 0], [0, 1], [1, 1], [2, 1], [1, 2],
      [11, 0], [10, 1], [11, 1], [12, 1], [11, 2],
      [1, 10], [0, 11], [1, 11], [2, 11], [1, 12],
      [11, 10], [10, 11], [11, 11], [12, 11], [11, 12],
    ],
  },
  {
    name: "Acorn pair",
    description: "Two Acorns at distance — parallel evolution",
    category: "Constructions",
    cells: [
      [1, 0], [3, 1], [0, 2], [1, 2], [4, 2], [5, 2], [6, 2],
      [20, 0], [22, 1], [19, 2], [20, 2], [23, 2], [24, 2], [25, 2],
    ],
  },
];

// ─── Diamoeba (B35678/S5678) ──────────────────────────────────────────────────

const DIAMOEBA: Pattern[] = [
  {
    name: "5×5 blob",
    description: "Dense seed — grows as an amoeba",
    cells: fromRows(["OOOOO", "OOOOO", "OOOOO", "OOOOO", "OOOOO"]),
  },
  {
    name: "7×7 blob",
    description: "Large dense mass — big amoeba expansion",
    cells: fromRows([
      "OOOOOOO", "OOOOOOO", "OOOOOOO", "OOOOOOO",
      "OOOOOOO", "OOOOOOO", "OOOOOOO",
    ]),
  },
  {
    name: "Diamond",
    description: "Diamond-shaped amoeba seed",
    cells: fromRows(["..OOO..", ".OOOOO.", "OOOOOOO", ".OOOOO.", "..OOO.."]),
  },
  {
    name: "Cross blob",
    description: "Plus-shaped dense seed",
    cells: fromRows([
      "..OOO..",
      "..OOO..",
      "OOOOOOO",
      "OOOOOOO",
      "OOOOOOO",
      "..OOO..",
      "..OOO..",
    ]),
  },
  {
    name: "Ring 7×7",
    description: "Hollow square — amoeba forms at rim",
    cells: fromRows([
      "OOOOOOO",
      "O.....O",
      "O.....O",
      "O.....O",
      "O.....O",
      "O.....O",
      "OOOOOOO",
    ]),
  },
  {
    name: "Two blobs",
    description: "Two 3×5 blobs — merge or diverge",
    cells: fromRows([
      "OOO......OOO",
      "OOO......OOO",
      "OOO......OOO",
      "OOO......OOO",
      "OOO......OOO",
    ]),
  },
];

const DIAMOEBA_CONSTRUCTIONS: Pattern[] = [
  {
    name: "Four blobs",
    description: "Four 3×3 blobs at corners — separate amoeba colonies",
    category: "Constructions",
    cells: [
      [0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],
      [14,0],[15,0],[16,0],[14,1],[15,1],[16,1],[14,2],[15,2],[16,2],
      [0,14],[1,14],[2,14],[0,15],[1,15],[2,15],[0,16],[1,16],[2,16],
      [14,14],[15,14],[16,14],[14,15],[15,15],[16,15],[14,16],[15,16],[16,16],
    ],
  },
  {
    name: "Two large blobs",
    description: "Two 5×5 blobs — collision course",
    category: "Constructions",
    cells: [
      [0,0],[1,0],[2,0],[3,0],[4,0],
      [0,1],[1,1],[2,1],[3,1],[4,1],
      [0,2],[1,2],[2,2],[3,2],[4,2],
      [0,3],[1,3],[2,3],[3,3],[4,3],
      [0,4],[1,4],[2,4],[3,4],[4,4],
      [18,0],[19,0],[20,0],[21,0],[22,0],
      [18,1],[19,1],[20,1],[21,1],[22,1],
      [18,2],[19,2],[20,2],[21,2],[22,2],
      [18,3],[19,3],[20,3],[21,3],[22,3],
      [18,4],[19,4],[20,4],[21,4],[22,4],
    ],
  },
];

// ─── 2x2 (B36/S125) ──────────────────────────────────────────────────────────

const TWOX2: Pattern[] = [
  {
    name: "Domino",
    description: "Still life — two adjacent cells",
    cells: fromRows(["OO"]),
  },
  {
    name: "L-tromino",
    description: "Still life — L-shaped 3 cells",
    cells: fromRows(["OO", "O."]),
  },
  {
    name: "Blinker",
    description: "Chaotic seed in this rule",
    cells: fromRows(["OOO"]),
  },
  {
    name: "R-pentomino",
    description: "Classic methuselah starter",
    cells: fromRows([".OO", "OO.", ".O."]),
  },
  {
    name: "T-tetromino",
    description: "Symmetric 4-cell seed",
    cells: fromRows(["OOO", ".O."]),
  },
  {
    name: "Cross",
    description: "5-cell symmetric starter",
    cells: fromRows([".O.", "OOO", ".O."]),
  },
  {
    name: "4×4 block",
    description: "Dense seed — interesting breakup",
    cells: fromRows(["OOOO", "OOOO", "OOOO", "OOOO"]),
  },
  {
    name: "Glider",
    description: "Life's glider — different path here",
    cells: fromRows([".O.", "..O", "OOO"]),
  },
  {
    name: "Acorn",
    description: "Life methuselah — rich evolution",
    cells: fromRows([".O.....", "...O...", "OO..OOO"]),
  },
];

const TWOX2_CONSTRUCTIONS: Pattern[] = [
  {
    name: "Domino row",
    description: "Four dominoes — synchronized still lifes",
    category: "Constructions",
    cells: [
      [0,0],[1,0],
      [5,0],[6,0],
      [10,0],[11,0],
      [15,0],[16,0],
    ],
  },
  {
    name: "Domino grid",
    description: "Lattice of dominoes — stable field",
    category: "Constructions",
    cells: [
      [0,0],[1,0], [5,0],[6,0],
      [0,4],[1,4], [5,4],[6,4],
      [0,8],[1,8], [5,8],[6,8],
    ],
  },
  {
    name: "R-pento trio",
    description: "Three R-pentominoes — complex interplay",
    category: "Constructions",
    cells: [
      [1,0],[2,0],[0,1],[1,1],[1,2],
      [12,0],[13,0],[11,1],[12,1],[12,2],
      [23,0],[24,0],[22,1],[23,1],[23,2],
    ],
  },
];

// ─── Coral (B3/S45678) ───────────────────────────────────────────────────────

const CORAL: Pattern[] = [
  {
    name: "3×3 seed",
    description: "Slow organic coral growth from small cluster",
    cells: fromRows(["OOO", "OOO", "OOO"]),
  },
  {
    name: "5×5 seed",
    description: "Larger coral formation",
    cells: fromRows(["OOOOO", "OOOOO", "OOOOO", "OOOOO", "OOOOO"]),
  },
  {
    name: "Cross",
    description: "Plus-shaped coral starter",
    cells: fromRows([".OOO.", "OOOOO", "OOOOO", "OOOOO", ".OOO."]),
  },
  {
    name: "Diamond",
    description: "Diamond-shaped seed",
    cells: fromRows(["..O..", ".OOO.", "OOOOO", ".OOO.", "..O.."]),
  },
  {
    name: "Line of 5",
    description: "Thin line — grows coral wings",
    cells: fromRows(["OOOOO"]),
  },
  {
    name: "R-pentomino",
    description: "Irregular seed — asymmetric coral",
    cells: fromRows([".OO", "OO.", ".O."]),
  },
  {
    name: "Ring 5",
    description: "Hollow square — coral fills inward and outward",
    cells: fromRows(["OOOOO", "O...O", "O...O", "O...O", "OOOOO"]),
  },
];

const CORAL_CONSTRUCTIONS: Pattern[] = [
  {
    name: "Two 3×3 seeds",
    description: "Two coral colonies growing toward each other",
    category: "Constructions",
    cells: [
      [0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],
      [14,0],[15,0],[16,0],[14,1],[15,1],[16,1],[14,2],[15,2],[16,2],
    ],
  },
  {
    name: "Four seeds",
    description: "Four 3×3 coral colonies in corners",
    category: "Constructions",
    cells: [
      [0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],
      [14,0],[15,0],[16,0],[14,1],[15,1],[16,1],[14,2],[15,2],[16,2],
      [0,14],[1,14],[2,14],[0,15],[1,15],[2,15],[0,16],[1,16],[2,16],
      [14,14],[15,14],[16,14],[14,15],[15,15],[16,15],[14,16],[15,16],[16,16],
    ],
  },
  {
    name: "Cross cluster",
    description: "Five 3×3 seeds in quincunx — coral network",
    category: "Constructions",
    cells: [
      // center
      [7,7],[8,7],[9,7],[7,8],[8,8],[9,8],[7,9],[8,9],[9,9],
      // TL
      [0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],
      // TR
      [14,0],[15,0],[16,0],[14,1],[15,1],[16,1],[14,2],[15,2],[16,2],
      // BL
      [0,14],[1,14],[2,14],[0,15],[1,15],[2,15],[0,16],[1,16],[2,16],
      // BR
      [14,14],[15,14],[16,14],[14,15],[15,15],[16,15],[14,16],[15,16],[16,16],
    ],
  },
];

// ─── Fredkin Replicator (B1357/S1357) ────────────────────────────────────────

const FREDKIN: Pattern[] = [
  {
    name: "Single cell",
    description: "The replicator — one cell spawns fractal copies",
    cells: [[0, 0]],
  },
  {
    name: "2×2 block",
    description: "Replicates in all four directions",
    cells: fromRows(["OO", "OO"]),
  },
  {
    name: "Cross",
    description: "5-cell seed — fractal expansion",
    cells: fromRows([".O.", "OOO", ".O."]),
  },
  {
    name: "Line 3",
    description: "3-cell line — creates line copies",
    cells: fromRows(["OOO"]),
  },
  {
    name: "T-tetromino",
    description: "Asymmetric fractal growth",
    cells: fromRows(["OOO", ".O."]),
  },
  {
    name: "Glider",
    description: "Life glider — replicates as fractal",
    cells: fromRows([".O.", "..O", "OOO"]),
  },
  {
    name: "Diagonal line",
    description: "Diagonal 5-cell seed",
    cells: [[0,4],[1,3],[2,2],[3,1],[4,0]],
  },
];

const FREDKIN_CONSTRUCTIONS: Pattern[] = [
  {
    name: "Two singles",
    description: "Two replicator cells — interference fractals",
    category: "Constructions",
    cells: [[0, 0], [12, 0]],
  },
  {
    name: "Four corners",
    description: "Single cell in each corner — four fractal expansions",
    category: "Constructions",
    cells: [[0, 0], [16, 0], [0, 16], [16, 16]],
  },
  {
    name: "Two blocks",
    description: "Two 2×2 blocks — replicator pair",
    category: "Constructions",
    cells: [
      [0,0],[1,0],[0,1],[1,1],
      [10,0],[11,0],[10,1],[11,1],
    ],
  },
];

// ─── Anneal (B4678/S35678) ───────────────────────────────────────────────────

const ANNEAL: Pattern[] = [
  {
    name: "2×2 block",
    description: "Still life in Anneal",
    cells: fromRows(["OO", "OO"]),
  },
  {
    name: "5×5 solid",
    description: "Stable island — still life",
    cells: fromRows(["OOOOO", "OOOOO", "OOOOO", "OOOOO", "OOOOO"]),
  },
  {
    name: "Random cluster",
    description: "Dense random seed — anneals to stable regions",
    cells: fromRows([
      ".OO.O.O",
      "OO..OOO",
      ".OO.O..",
      "O..OO.O",
      "OO.O..O",
      ".O.OO.O",
      "O.OO..O",
    ]),
  },
  {
    name: "Checkerboard 6×6",
    description: "Alternating pattern — anneals into blobs",
    cells: fromRows([
      "O.O.O.",
      ".O.O.O",
      "O.O.O.",
      ".O.O.O",
      "O.O.O.",
      ".O.O.O",
    ]),
  },
  {
    name: "Dense ring",
    description: "7×7 filled ring — rich annealing",
    cells: fromRows([
      "OOOOOOO",
      "O.....O",
      "O.....O",
      "O.....O",
      "O.....O",
      "O.....O",
      "OOOOOOO",
    ]),
  },
  {
    name: "Sparse blob",
    description: "Low-density cloud — slowly anneals",
    cells: fromRows([
      "O..O.O.",
      ".O....O",
      "O..O...",
      "..O.O.O",
      "O....O.",
    ]),
  },
  {
    name: "Line 7",
    description: "Thin line — widens and stabilizes",
    cells: fromRows(["OOOOOOO"]),
  },
];

const ANNEAL_CONSTRUCTIONS: Pattern[] = [
  {
    name: "Dense vs sparse",
    description: "Dense and sparse clusters side by side — competing annealing",
    category: "Constructions",
    cells: [
      // Dense 5×5
      [0,0],[1,0],[2,0],[3,0],[4,0],
      [0,1],[1,1],[2,1],[3,1],[4,1],
      [0,2],[1,2],[2,2],[3,2],[4,2],
      [0,3],[1,3],[2,3],[3,3],[4,3],
      [0,4],[1,4],[2,4],[3,4],[4,4],
      // Sparse 5×5 (checkerboard)
      [12,0],[14,0],
      [13,1],
      [12,2],[14,2],
      [13,3],
      [12,4],[14,4],
    ],
  },
  {
    name: "Four random clusters",
    description: "Four random blobs — independent annealing",
    category: "Constructions",
    cells: [
      [0,0],[1,0],[0,1],[2,1],[1,2],[2,2],[0,2],
      [12,0],[13,0],[14,0],[12,1],[14,1],[13,2],
      [0,12],[1,12],[0,13],[2,13],[1,14],[2,14],
      [12,12],[14,12],[13,13],[12,14],[13,14],[14,14],
    ],
  },
  {
    name: "Two stable islands",
    description: "Two 5×5 still lifes — permanent coexistence",
    category: "Constructions",
    cells: [
      [0,0],[1,0],[2,0],[3,0],[4,0],
      [0,1],[1,1],[2,1],[3,1],[4,1],
      [0,2],[1,2],[2,2],[3,2],[4,2],
      [0,3],[1,3],[2,3],[3,3],[4,3],
      [0,4],[1,4],[2,4],[3,4],[4,4],
      [16,0],[17,0],[18,0],[19,0],[20,0],
      [16,1],[17,1],[18,1],[19,1],[20,1],
      [16,2],[17,2],[18,2],[19,2],[20,2],
      [16,3],[17,3],[18,3],[19,3],[20,3],
      [16,4],[17,4],[18,4],[19,4],[20,4],
    ],
  },
];

// ─── Walled Cities (B45678/S2345) ────────────────────────────────────────────

const WALLEDCITIES: Pattern[] = [
  {
    name: "3×3 solid",
    description: "Dense seed — city walls form",
    cells: fromRows(["OOO", "OOO", "OOO"]),
  },
  {
    name: "5×5 solid",
    description: "Large seed — complex walled region",
    cells: fromRows(["OOOOO", "OOOOO", "OOOOO", "OOOOO", "OOOOO"]),
  },
  {
    name: "Ring 5",
    description: "Hollow square — walls expand outward",
    cells: fromRows(["OOOOO", "O...O", "O...O", "O...O", "OOOOO"]),
  },
  {
    name: "Cross",
    description: "Plus-shaped seed",
    cells: fromRows([".OOO.", "OOOOO", "OOOOO", "OOOOO", ".OOO."]),
  },
  {
    name: "Random cluster",
    description: "Chaotic seed — walled cities emerge",
    cells: fromRows([
      ".OO.O",
      "OO..O",
      ".O.OO",
      "O.OO.",
      "OO..O",
    ]),
  },
  {
    name: "Two blocks",
    description: "Two separated clusters — separate cities",
    cells: fromRows([
      "OOO......OOO",
      "OOO......OOO",
      "OOO......OOO",
    ]),
  },
];

const WALLEDCITIES_CONSTRUCTIONS: Pattern[] = [
  {
    name: "Four cities",
    description: "Four 3×3 seeds — four independent city growths",
    category: "Constructions",
    cells: [
      [0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],
      [14,0],[15,0],[16,0],[14,1],[15,1],[16,1],[14,2],[15,2],[16,2],
      [0,14],[1,14],[2,14],[0,15],[1,15],[2,15],[0,16],[1,16],[2,16],
      [14,14],[15,14],[16,14],[14,15],[15,15],[16,15],[14,16],[15,16],[16,16],
    ],
  },
  {
    name: "City collision",
    description: "Two 5×5 blocks approaching — cities merge",
    category: "Constructions",
    cells: [
      [0,0],[1,0],[2,0],[3,0],[4,0],
      [0,1],[1,1],[2,1],[3,1],[4,1],
      [0,2],[1,2],[2,2],[3,2],[4,2],
      [0,3],[1,3],[2,3],[3,3],[4,3],
      [0,4],[1,4],[2,4],[3,4],[4,4],
      [16,0],[17,0],[18,0],[19,0],[20,0],
      [16,1],[17,1],[18,1],[19,1],[20,1],
      [16,2],[17,2],[18,2],[19,2],[20,2],
      [16,3],[17,3],[18,3],[19,3],[20,3],
      [16,4],[17,4],[18,4],[19,4],[20,4],
    ],
  },
];

// ─── Stains (B3678/S235678) ──────────────────────────────────────────────────

const STAINS: Pattern[] = [
  {
    name: "Block",
    description: "2×2 still life",
    cells: fromRows(["OO", "OO"]),
  },
  {
    name: "3×3 solid",
    description: "Dense seed — stain spreads",
    cells: fromRows(["OOO", "OOO", "OOO"]),
  },
  {
    name: "Glider",
    description: "Life's glider — becomes a spreading stain",
    cells: fromRows([".O.", "..O", "OOO"]),
  },
  {
    name: "R-pentomino",
    description: "Classic methuselah — rich staining",
    cells: fromRows([".OO", "OO.", ".O."]),
  },
  {
    name: "Random blob",
    description: "Irregular seed — organic stain growth",
    cells: fromRows([
      ".OO.O",
      "OO..O",
      ".O.OO",
      "O.OO.",
    ]),
  },
  {
    name: "Cross",
    description: "Symmetric 5-cell seed",
    cells: fromRows([".O.", "OOO", ".O."]),
  },
  {
    name: "5×5 solid",
    description: "Large dense seed — wide stain",
    cells: fromRows(["OOOOO", "OOOOO", "OOOOO", "OOOOO", "OOOOO"]),
  },
  {
    name: "Acorn",
    description: "Long-lived methuselah",
    cells: fromRows([".O.....", "...O...", "OO..OOO"]),
  },
];

const STAINS_CONSTRUCTIONS: Pattern[] = [
  {
    name: "Glider pair",
    description: "Two gliders — collide into stain",
    category: "Constructions",
    cells: [
      [1, 0], [2, 1], [0, 2], [1, 2], [2, 2],
      [12, 0], [13, 1], [11, 2], [12, 2], [13, 2],
    ],
  },
  {
    name: "R-pento pair",
    description: "Two R-pentominoes — stain interaction",
    category: "Constructions",
    cells: [
      [1, 0], [2, 0], [0, 1], [1, 1], [1, 2],
      [14, 0], [15, 0], [13, 1], [14, 1], [14, 2],
    ],
  },
  {
    name: "Four blobs",
    description: "Four random seeds — stains merge",
    category: "Constructions",
    cells: [
      [0,0],[1,0],[0,1],[2,1],[1,2],
      [12,0],[13,0],[14,0],[12,1],[14,1],
      [0,12],[1,12],[0,13],[2,13],[1,14],
      [12,12],[14,12],[13,13],[12,14],[13,14],
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
    patterns: [...CONWAY, ...CONWAY_CONSTRUCTIONS, ...CONWAY_MACHINES],
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
  {
    name: "Morley",
    notation: "B368/S245",
    description: "Also known as Move — rich oscillators and long-lived patterns",
    birth: new Set([3, 6, 8]),
    survive: new Set([2, 4, 5]),
    patterns: [...MORLEY, ...MORLEY_CONSTRUCTIONS],
  },
  {
    name: "Diamoeba",
    notation: "B35678/S5678",
    description: "Dense blobs behave like amoebas — grow and split organically",
    birth: new Set([3, 5, 6, 7, 8]),
    survive: new Set([5, 6, 7, 8]),
    patterns: [...DIAMOEBA, ...DIAMOEBA_CONSTRUCTIONS],
  },
  {
    name: "2×2",
    notation: "B36/S125",
    description: "Named for 2×2 block dynamics — contains diagonal gliders",
    birth: new Set([3, 6]),
    survive: new Set([1, 2, 5]),
    patterns: [...TWOX2, ...TWOX2_CONSTRUCTIONS],
  },
  {
    name: "Coral",
    notation: "B3/S45678",
    description: "Dense clusters grow slowly outward like coral reefs",
    birth: new Set([3]),
    survive: new Set([4, 5, 6, 7, 8]),
    patterns: [...CORAL, ...CORAL_CONSTRUCTIONS],
  },
  {
    name: "Fredkin Replicator",
    notation: "B1357/S1357",
    description: "Any pattern replicates at power-of-2 generations — fractal Sierpinski patterns",
    birth: new Set([1, 3, 5, 7]),
    survive: new Set([1, 3, 5, 7]),
    patterns: [...FREDKIN, ...FREDKIN_CONSTRUCTIONS],
  },
  {
    name: "Anneal",
    notation: "B4678/S35678",
    description: "Random patterns anneal into stable regions — like cooling metal",
    birth: new Set([4, 6, 7, 8]),
    survive: new Set([3, 5, 6, 7, 8]),
    patterns: [...ANNEAL, ...ANNEAL_CONSTRUCTIONS],
  },
  {
    name: "Walled Cities",
    notation: "B45678/S2345",
    description: "Patterns grow into enclosed walled regions with stable boundaries",
    birth: new Set([4, 5, 6, 7, 8]),
    survive: new Set([2, 3, 4, 5]),
    patterns: [...WALLEDCITIES, ...WALLEDCITIES_CONSTRUCTIONS],
  },
  {
    name: "Stains",
    notation: "B3678/S235678",
    description: "Patterns spread and leave permanent stains — ink-drop dynamics",
    birth: new Set([3, 6, 7, 8]),
    survive: new Set([2, 3, 5, 6, 7, 8]),
    patterns: [...STAINS, ...STAINS_CONSTRUCTIONS],
  },
];
