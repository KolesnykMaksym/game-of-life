# Conway's Game of Life

An interactive browser simulator of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) with an infinite grid, pan/zoom, pattern stamping, and age-based cell coloring.

## Features

- **Infinite grid** backed by a sparse `Map<string, age>` — grid size is bounded only by memory.
- **Adaptive canvas** that fills the window and responds to resizes.
- **Pattern brushes**: stamp a preset (Glider, Pulsar, Gosper glider gun, R-pentomino, Acorn, Diehard, etc.) at the click point with a single click — hover shows a ghost preview of where it will land.
- **Cell brush**: click/drag to paint or erase individual cells.
- **Age-based coloring**: each cell's color is driven by how many generations it has been alive (fresh yellow → cyan → deep magenta) so you can see long-lived structures at a glance.
- **Playback controls**: play/pause, single-step, reset, and a speed slider (1–60 fps).
- **Zoom slider** (0.07× – 14×) with logarithmic mapping.
- **Touchpad-friendly input**: two-finger scroll pans, pinch zooms. Mouse users can `Shift+drag` / middle-click to pan and `Ctrl+scroll` to zoom.

## Controls

| Action | Gesture |
| --- | --- |
| Paint / stamp | Click (or drag, with the Cell brush) |
| Pan | Two-finger scroll · `Shift`+drag · middle-mouse drag |
| Zoom | Pinch · `Ctrl`+scroll · wheel in the toolbar |
| Play / Pause | Toolbar buttons |
| Single step | `Step` button (while paused) |
| Clear grid | `Reset` button |
| Select brush | Sidebar on the left |

## Getting started

```bash
npm install
npm run dev
```

Then open the URL printed by Vite (defaults to `http://localhost:5173/`).

### Build for production

```bash
npm run build
npm run preview
```

## Tech stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for dev server / bundling
- Rendering to a plain `<canvas>` with HiDPI support
- No runtime dependencies beyond React

## Project layout

```
src/
  App.tsx       UI, canvas renderer, input handling, controls
  engine.ts     Sparse infinite-grid step function (B3/S23) with cell ages
  patterns.ts   Preset pattern library used by the brush sidebar
  styles.css    App styling
  main.tsx      React entry
```

## Implementation notes

- The step function iterates only over live cells and their neighbors, so work per tick is `O(live_cells)` rather than `O(grid_area)`.
- Cell age is carried through the step: a surviving cell's age increments, a newly born cell starts at 0, and stamping a pattern also resets to 0.
- Rendering buckets cells by age so `fillStyle` changes at most once per color stop, keeping frame cost low even with tens of thousands of cells.
- Wheel events are captured with a non-passive native listener so pinch gestures do not trigger browser page zoom over the canvas.

## License

MIT
