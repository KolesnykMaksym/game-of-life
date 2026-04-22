import { fromRLE, fromRows, type Pattern } from "./patterns";
import type { Topology } from "./engine";

export interface Rule {
  name: string;
  notation: string;
  description: string;
  birth: ReadonlySet<number>;
  survive: ReadonlySet<number>;
  patterns: readonly Pattern[];
  topology?: Topology; // default "square"
}

// Hex patterns use axial coordinates (q, r) rather than (x, y).
const HEX_LIFE: Pattern[] = [
  {
    name: "Single cell",
    description: "One live cell — dies immediately (0 neighbours)",
    cells: [[0, 0]],
  },
  {
    name: "Pair",
    description: "Two adjacent cells — seeds two new cells on either side",
    cells: [[0, 0], [1, 0]],
  },
  {
    name: "Triangle",
    description: "Three cells forming a triangle — rotates and grows",
    cells: [[0, 0], [1, 0], [0, 1]],
  },
  {
    name: "Line of 3",
    description: "Straight line — disperses outward",
    cells: [[-1, 0], [0, 0], [1, 0]],
  },
  {
    name: "Filled hexagon",
    description: "7 cells (centre + ring) — centre dies, ring stays briefly",
    cells: [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [1, -1], [-1, 1]],
  },
  {
    name: "Hex ring",
    description: "6 cells around an empty centre — quickly collapses",
    cells: [[1, 0], [-1, 0], [0, 1], [0, -1], [1, -1], [-1, 1]],
  },
  {
    name: "Y-pentomino",
    description: "Five-cell seed — produces complex transient",
    cells: [[0, 0], [1, 0], [-1, 0], [0, -1], [0, 1]],
  },
  {
    name: "Parallelogram",
    description: "4 cells — oscillates through several shapes",
    cells: [[0, 0], [1, 0], [0, 1], [1, 1]],
  },
  {
    name: "Hex soup (7)",
    description: "Dense cluster — explodes into active region",
    cells: [
      [0, 0], [1, 0], [2, 0],
      [0, 1], [1, 1],
      [-1, 2], [0, 2],
    ],
  },
  {
    name: "Big blob",
    description: "Compact cluster for observing growth dynamics",
    cells: [
      [-1, -1], [0, -1], [1, -1], [2, -1],
      [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0],
      [-2, 1], [-1, 1], [0, 1], [1, 1],
      [-1, 2], [0, 2],
    ],
  },
];

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

export const RULES: readonly Rule[] = [
  {
    name: "Conway's Life",
    notation: "B3/S23",
    description: "The classic cellular automaton",
    birth: new Set([3]),
    survive: new Set([2, 3]),
    patterns: [...CONWAY, ...CONWAY_MACHINES],
  },
  {
    name: "HighLife",
    notation: "B36/S23",
    description: "Like Life, but also birth on 6 — supports self-replicators",
    birth: new Set([3, 6]),
    survive: new Set([2, 3]),
    patterns: [...HIGHLIFE],
  },
  {
    name: "Seeds",
    notation: "B2/S",
    description: "No cell survives; birth on exactly 2. Explosive.",
    birth: new Set([2]),
    survive: new Set(),
    patterns: [...SEEDS],
  },
  {
    name: "Day & Night",
    notation: "B3678/S34678",
    description: "Symmetric under on↔off inversion",
    birth: new Set([3, 6, 7, 8]),
    survive: new Set([3, 4, 6, 7, 8]),
    patterns: [...DAYNIGHT],
  },
  {
    name: "Maze",
    notation: "B3/S12345",
    description: "Seeds grow into maze-like corridors",
    birth: new Set([3]),
    survive: new Set([1, 2, 3, 4, 5]),
    patterns: [...MAZE],
  },
  {
    name: "Life without Death",
    notation: "B3/S012345678",
    description: "Cells are born but never die — infinite growth",
    birth: new Set([3]),
    survive: new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]),
    patterns: [...LWOD],
  },
  {
    name: "Morley",
    notation: "B368/S245",
    description: "Also known as Move — rich oscillators and long-lived patterns",
    birth: new Set([3, 6, 8]),
    survive: new Set([2, 4, 5]),
    patterns: [...MORLEY],
  },
  {
    name: "Diamoeba",
    notation: "B35678/S5678",
    description: "Dense blobs behave like amoebas — grow and split organically",
    birth: new Set([3, 5, 6, 7, 8]),
    survive: new Set([5, 6, 7, 8]),
    patterns: [...DIAMOEBA],
  },
  {
    name: "2×2",
    notation: "B36/S125",
    description: "Named for 2×2 block dynamics — contains diagonal gliders",
    birth: new Set([3, 6]),
    survive: new Set([1, 2, 5]),
    patterns: [...TWOX2],
  },
  {
    name: "Coral",
    notation: "B3/S45678",
    description: "Dense clusters grow slowly outward like coral reefs",
    birth: new Set([3]),
    survive: new Set([4, 5, 6, 7, 8]),
    patterns: [...CORAL],
  },
  {
    name: "Fredkin Replicator",
    notation: "B1357/S1357",
    description: "Any pattern replicates at power-of-2 generations — fractal Sierpinski patterns",
    birth: new Set([1, 3, 5, 7]),
    survive: new Set([1, 3, 5, 7]),
    patterns: [...FREDKIN],
  },
  {
    name: "Anneal",
    notation: "B4678/S35678",
    description: "Random patterns anneal into stable regions — like cooling metal",
    birth: new Set([4, 6, 7, 8]),
    survive: new Set([3, 5, 6, 7, 8]),
    patterns: [...ANNEAL],
  },
  {
    name: "Walled Cities",
    notation: "B45678/S2345",
    description: "Patterns grow into enclosed walled regions with stable boundaries",
    birth: new Set([4, 5, 6, 7, 8]),
    survive: new Set([2, 3, 4, 5]),
    patterns: [...WALLEDCITIES],
  },
  {
    name: "Stains",
    notation: "B3678/S235678",
    description: "Patterns spread and leave permanent stains — ink-drop dynamics",
    birth: new Set([3, 6, 7, 8]),
    survive: new Set([2, 3, 5, 6, 7, 8]),
    patterns: [...STAINS],
  },
  {
    name: "Hex Life",
    notation: "H:B2/S34",
    description: "Carter Bays' hexagonal analogue of Conway Life — 6 neighbours per cell",
    birth: new Set([2]),
    survive: new Set([3, 4]),
    patterns: [...HEX_LIFE],
    topology: "hex",
  },
];
