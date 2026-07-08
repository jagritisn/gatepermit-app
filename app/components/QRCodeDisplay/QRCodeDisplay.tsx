import { useMemo } from "react";

/**
 * Simulated QR-style pattern, not a real QR encoder. This project has no approved
 * QR-encoding dependency (DESIGN.md's Pass Card spec only requires a QR *look*), and
 * everything in this system is explicitly simulated (see ai/knowledge/domain/identity-simulation.md) —
 * so a deterministic decorative pattern fits the product's existing conventions better than
 * introducing a new library. The pattern is a pure function of `value`: same value, same pattern.
 *
 * Renders true black (neutral-900) on true white (neutral-0) always — DESIGN.md §6 QR Code Display's
 * critical exception: never tinted with the signal ramp, regardless of the surrounding UI.
 */

const GRID_SIZE = 21;

const FINDER_PATTERN = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function mulberry32(seed: number) {
  let state = seed;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function finderZoneCell(row: number, col: number): number | null {
  const zones = [
    { rowStart: 0, colStart: 0 },
    { rowStart: 0, colStart: GRID_SIZE - 7 },
    { rowStart: GRID_SIZE - 7, colStart: 0 },
  ];

  for (const zone of zones) {
    const localRow = row - zone.rowStart;
    const localCol = col - zone.colStart;
    if (localRow >= 0 && localRow < 7 && localCol >= 0 && localCol < 7) {
      return FINDER_PATTERN[localRow][localCol];
    }
  }
  return null;
}

function generateGrid(value: string): boolean[][] {
  const rng = mulberry32(hashString(value) || 1);
  const grid: boolean[][] = [];

  for (let row = 0; row < GRID_SIZE; row += 1) {
    const cells: boolean[] = [];
    for (let col = 0; col < GRID_SIZE; col += 1) {
      const finderCell = finderZoneCell(row, col);
      cells.push(finderCell !== null ? finderCell === 1 : rng() > 0.5);
    }
    grid.push(cells);
  }

  return grid;
}

interface QRCodeDisplayProps {
  value: string;
  size?: number;
}

export function QRCodeDisplay({ value, size = 160 }: QRCodeDisplayProps) {
  const grid = useMemo(() => generateGrid(value), [value]);

  return (
    <svg
      viewBox={`0 0 ${GRID_SIZE} ${GRID_SIZE}`}
      width={size}
      height={size}
      shapeRendering="crispEdges"
      role="img"
      aria-label="Entry pass code"
    >
      <rect x={0} y={0} width={GRID_SIZE} height={GRID_SIZE} fill="var(--color-neutral-0)" />
      {grid.map((row, r) =>
        row.map((filled, c) =>
          filled ? (
            <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill="var(--color-neutral-900)" />
          ) : null
        )
      )}
    </svg>
  );
}
