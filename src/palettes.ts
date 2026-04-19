export interface Palette {
  name: string;
  description: string;
  build: (t: number) => string;
}

const round = (n: number) => Math.round(n);

export const PALETTES: readonly Palette[] = [
  {
    name: "Warm",
    description: "Yellow → cyan → magenta",
    build: (t) =>
      `hsl(${round(55 + t * 245)}, ${round(100 - t * 30)}%, ${round(82 - t * 30)}%)`,
  },
  {
    name: "Heat",
    description: "Fresh yellow → deep red",
    build: (t) =>
      `hsl(${round(55 - t * 55)}, ${round(85 + t * 15)}%, ${round(78 - t * 42)}%)`,
  },
  {
    name: "Mono green",
    description: "Phosphor screen",
    build: (t) =>
      `hsl(120, ${round(70 + t * 20)}%, ${round(78 - t * 50)}%)`,
  },
  {
    name: "Ice",
    description: "White → deep blue",
    build: (t) =>
      `hsl(${round(195 + t * 35)}, ${round(30 + t * 70)}%, ${round(92 - t * 52)}%)`,
  },
  {
    name: "Rainbow",
    description: "Full hue rotation",
    build: (t) => `hsl(${round(t * 330)}, 85%, 62%)`,
  },
  {
    name: "Plasma",
    description: "Deep purple → orange → yellow",
    build: (t) =>
      `hsl(${round(280 - t * 230)}, ${round(80 + t * 15)}%, ${round(40 + t * 30)}%)`,
  },
];

export function buildAgeColors(palette: Palette, steps: number): readonly string[] {
  return Array.from({ length: steps }, (_, i) => palette.build(i / (steps - 1)));
}
