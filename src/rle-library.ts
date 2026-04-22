export interface LibraryEntry {
  name: string;
  file: string;
  description: string;
  category: string;
  source?: string;
}

/**
 * Curated library of famous Life patterns fetched at runtime from
 * public/patterns/*.rle. Sources and attributions via conwaylife.com/wiki.
 */
export const RLE_LIBRARY: LibraryEntry[] = [
  // Turing & universal computation
  {
    name: "Turing Machine",
    file: "patterns/turingmachine.rle",
    description: "Paul Rendell, 2000 — Turing machine realised in Life",
    category: "Turing & universal",
    source: "https://conwaylife.com/wiki/Turing_machine",
  },
  {
    name: "OTCA Metapixel",
    file: "patterns/otcametapixel.rle",
    description: "Brice Due, 2006 — emulates any Life-like rule (Life-in-Life)",
    category: "Turing & universal",
    source: "https://conwaylife.com/wiki/OTCA_metapixel",
  },
  {
    name: "OTCA Metapixel (off)",
    file: "patterns/otcametapixeloff.rle",
    description: "OTCA metapixel in off-state — smaller variant",
    category: "Turing & universal",
    source: "https://conwaylife.com/wiki/OTCA_metapixel",
  },

  // Self-replicating
  {
    name: "Demonoid",
    file: "patterns/demonoid_synth.rle",
    description: "Chris Cain, 2015 — self-replicating spaceship (synthesis)",
    category: "Self-replicating",
    source: "https://conwaylife.com/wiki/Demonoid",
  },
  {
    name: "Orthogonoid",
    file: "patterns/orthogonoid_synth.rle",
    description: "Dave Greene & co., 2017 — orthogonal self-replicator (huge, ~1.3 MB)",
    category: "Self-replicating",
    source: "https://conwaylife.com/wiki/Orthogonoid",
  },

  // Arithmetic / signal
  {
    name: "Primer",
    file: "patterns/primer.rle",
    description: "Dean Hickerson, 1991 — emits a glider at every prime step",
    category: "Arithmetic & signals",
    source: "https://conwaylife.com/wiki/Primer",
  },
  {
    name: "Stargate",
    file: "patterns/stargate.rle",
    description: "Signal-relay conduit — moves a glider across distance",
    category: "Arithmetic & signals",
    source: "https://conwaylife.com/wiki/Stargate",
  },
  {
    name: "Inline Inverter (NOT gate)",
    file: "patterns/inlineinverter.rle",
    description: "Converts presence → absence of glider (logic NOT)",
    category: "Arithmetic & signals",
    source: "https://conwaylife.com/wiki/Inline_inverter",
  },
  {
    name: "Buckaroo",
    file: "patterns/buckaroo.rle",
    description: "Glider reflector — queen-bee shuttle + eater",
    category: "Arithmetic & signals",
    source: "https://conwaylife.com/wiki/Buckaroo",
  },

  // Guns
  {
    name: "Gosper glider gun",
    file: "patterns/gosperglidergun.rle",
    description: "Bill Gosper, 1970 — first period-30 glider gun",
    category: "Guns",
    source: "https://conwaylife.com/wiki/Gosper_glider_gun",
  },
  {
    name: "Gunstar",
    file: "patterns/gunstar.rle",
    description: "Gun cluster firing gliders outward",
    category: "Guns",
    source: "https://conwaylife.com/wiki/Gunstar",
  },
  {
    name: "AK94 gun",
    file: "patterns/ak94.rle",
    description: "Jason Summers, 2005 — true period-94 glider gun",
    category: "Guns",
    source: "https://conwaylife.com/wiki/AK94_gun",
  },
  {
    name: "New Gun 1",
    file: "patterns/newgun1.rle",
    description: "Noam Elkies, 1997 — compact period-46 gun",
    category: "Guns",
    source: "https://conwaylife.com/wiki/New_gun_1",
  },

  // Breeders & puffers
  {
    name: "Breeder 1",
    file: "patterns/breeder1.rle",
    description: "Bill Gosper, 1971 — quadratic-growth population",
    category: "Breeders & puffers",
    source: "https://conwaylife.com/wiki/Breeder_1",
  },
  {
    name: "Blinker puffer 1",
    file: "patterns/blinkerpuffer1.rle",
    description: "Robert Wainwright, 1984 — leaves trail of blinkers",
    category: "Breeders & puffers",
    source: "https://conwaylife.com/wiki/Blinker_puffer_1",
  },

  // Shuttles & oscillators
  {
    name: "Queen bee shuttle",
    file: "patterns/queenbeeshuttle.rle",
    description: "Bill Gosper, 1970 — period-30 oscillator with eaters",
    category: "Shuttles & oscillators",
    source: "https://conwaylife.com/wiki/Queen_bee_shuttle",
  },
  {
    name: "P26 queen bee shuttle",
    file: "patterns/p26queenbeeshuttle.rle",
    description: "Period-26 variant of the queen bee shuttle",
    category: "Shuttles & oscillators",
  },
  {
    name: "Block-to-queen-bee shuttle",
    file: "patterns/block2queenbeeshuttle.rle",
    description: "Shuttle stabilised by blocks",
    category: "Shuttles & oscillators",
  },
  {
    name: "P54 shuttle",
    file: "patterns/p54shuttle.rle",
    description: "Period-54 shuttle oscillator",
    category: "Shuttles & oscillators",
  },
  {
    name: "Centinal",
    file: "patterns/centinal.rle",
    description: "Period-100 shuttle — 'centinal' = centi + sentinel",
    category: "Shuttles & oscillators",
    source: "https://conwaylife.com/wiki/Centinal",
  },
  {
    name: "New shuttle",
    file: "patterns/newshuttle.rle",
    description: "Shuttle discovered in pattern search — short period",
    category: "Shuttles & oscillators",
  },
  {
    name: "Pulsar",
    file: "patterns/pulsar.rle",
    description: "John Conway — classic period-3 oscillator",
    category: "Shuttles & oscillators",
    source: "https://conwaylife.com/wiki/Pulsar",
  },
  {
    name: "Pentadecathlon",
    file: "patterns/pentadecathlon.rle",
    description: "John Conway, 1970 — period-15 oscillator",
    category: "Shuttles & oscillators",
    source: "https://conwaylife.com/wiki/Pentadecathlon",
  },

  // Spaceships
  {
    name: "Copperhead",
    file: "patterns/copperhead.rle",
    description: "2016 — c/10 orthogonal spaceship",
    category: "Spaceships",
    source: "https://conwaylife.com/wiki/Copperhead",
  },
  {
    name: "Sir Robin",
    file: "patterns/sirrobin.rle",
    description: "Adam Goucher, 2018 — first oblique knightship (6,3)c/7",
    category: "Spaceships",
    source: "https://conwaylife.com/wiki/Sir_Robin",
  },
  {
    name: "Knightship (partial)",
    file: "patterns/knightshippartial.rle",
    description: "Partial knightship pattern — research fragment",
    category: "Spaceships",
  },
  {
    name: "Spider",
    file: "patterns/spider.rle",
    description: "David Bell, 1997 — c/5 orthogonal spaceship",
    category: "Spaceships",
    source: "https://conwaylife.com/wiki/Spider",
  },
  {
    name: "Loafer",
    file: "patterns/loafer.rle",
    description: "Josh Ball, 2013 — c/7 orthogonal spaceship",
    category: "Spaceships",
    source: "https://conwaylife.com/wiki/Loafer",
  },
  {
    name: "Canada Goose",
    file: "patterns/canadagoose.rle",
    description: "c/7 diagonal spaceship",
    category: "Spaceships",
    source: "https://conwaylife.com/wiki/Canada_goose",
  },
  {
    name: "Dragon",
    file: "patterns/dragon.rle",
    description: "Paul Tooke, 2000 — c/6 orthogonal spaceship",
    category: "Spaceships",
    source: "https://conwaylife.com/wiki/Dragon",
  },
  {
    name: "13-engine Cordership",
    file: "patterns/13enginecordership.rle",
    description: "Dean Hickerson — c/12 diagonal spaceship",
    category: "Spaceships",
    source: "https://conwaylife.com/wiki/Cordership",
  },
  {
    name: "50P20H10V0.1",
    file: "patterns/50p20h10v0.1.rle",
    description: "Period-20, displacement 10 — orthogonal spaceship",
    category: "Spaceships",
  },
  {
    name: "51P20H10V0",
    file: "patterns/51p20h10v0.rle",
    description: "Period-20, displacement 10 — orthogonal spaceship",
    category: "Spaceships",
  },

  // Growth / notable
  {
    name: "Max",
    file: "patterns/max.rle",
    description: "Maximum-density infinite growth pattern",
    category: "Growth & curiosities",
    source: "https://conwaylife.com/wiki/Max",
  },
  {
    name: "Glider loop",
    file: "patterns/gliderloop.rle",
    description: "Closed loop of gliders — period-360 oscillator",
    category: "Growth & curiosities",
    source: "https://conwaylife.com/wiki/Glider_loop",
  },
  {
    name: "Ecologist",
    file: "patterns/ecologist.rle",
    description: "Pattern that fills space with stable 'ecosystem'",
    category: "Growth & curiosities",
    source: "https://conwaylife.com/wiki/Ecologist",
  },
  {
    name: "Banana spark",
    file: "patterns/bananaspark.rle",
    description: "Curved spark used in period-hunting circuitry",
    category: "Growth & curiosities",
    source: "https://conwaylife.com/wiki/Banana_spark",
  },
  {
    name: "Brain",
    file: "patterns/brain.rle",
    description: "Famous ecologist pattern — grows complex structures",
    category: "Growth & curiosities",
  },
];
