// Coarse land mask as [row, colStart, colEnd] segments on a GRID_W x GRID_ROWS grid.
// col -> lon (-180..180), row -> lat (LAT_TOP down by 5.6°/row). Used to place dots
// (flat map + 3D globe) and to test land vs sea.
export const LAND = [
  [1, 8, 22], [1, 26, 29], [1, 40, 58],
  [2, 6, 24], [2, 26, 28], [2, 32, 58],
  [3, 7, 23], [3, 30, 58],
  [4, 8, 22], [4, 29, 58],
  [5, 9, 22], [5, 29, 56],
  [6, 9, 21], [6, 29, 56],
  [7, 10, 20], [7, 30, 55],
  [8, 12, 19], [8, 30, 54],
  [9, 13, 18], [9, 29, 53],
  [10, 14, 17], [10, 28, 52],
  [11, 16, 18], [11, 29, 44], [11, 47, 51],
  [12, 20, 24], [12, 30, 38], [12, 49, 52],
  [13, 20, 25], [13, 31, 38], [13, 47, 52],
  [14, 20, 26], [14, 32, 38], [14, 48, 53],
  [15, 20, 27], [15, 33, 38], [15, 49, 53],
  [16, 21, 27], [16, 33, 38],
  [17, 21, 27], [17, 33, 37],
  [18, 22, 27], [18, 34, 37], [18, 52, 57],
  [19, 23, 26], [19, 34, 36], [19, 51, 57],
  [20, 23, 25], [20, 34, 35], [20, 51, 57],
  [21, 23, 24], [21, 52, 55],
];

export const GRID_W = 60;
export const GRID_ROWS = 23;
export const LAT_TOP = 80;
export const LAT_SPAN = GRID_ROWS * 5.6;

// Boolean land grid for O(1) lookup.
const GRID = Array.from({ length: GRID_ROWS + 1 }, () => new Uint8Array(GRID_W));
for (const [row, s, e] of LAND) {
  for (let c = s; c <= e; c++) GRID[row][c] = 1;
}

// Is there land at this lon/lat? (with 1-cell dilation to smooth dot edges)
export function landAt(lon, lat) {
  const col = Math.round(((lon + 180) / 360) * GRID_W);
  const row = Math.round((LAT_TOP - lat) / 5.6);
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      const r = row + dr;
      const c = ((col + dc) % GRID_W + GRID_W) % GRID_W;
      if (r >= 0 && r <= GRID_ROWS && GRID[r][c]) return true;
    }
  }
  return false;
}

// [name, lon, lat]. Distributed test origins converging on one target.
export const TARGET = { name: 'TARGET', lon: 8.7, lat: 50.1 };
export const ORIGINS = [
  ['N. Virginia', -78, 38],
  ['Los Angeles', -118.2, 34.1],
  ['São Paulo', -46.6, -23.5],
  ['London', -0.1, 51.5],
  ['Johannesburg', 28, -26.2],
  ['Dubai', 55.3, 25.3],
  ['Mumbai', 72.9, 19.1],
  ['Singapore', 103.8, 1.4],
  ['Tokyo', 139.7, 35.7],
  ['Sydney', 151.2, -33.9],
];

// lon/lat (degrees) -> unit sphere vector (three.js: y up).
export function lonLatToVec3(lon, lat, radius = 1) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}
