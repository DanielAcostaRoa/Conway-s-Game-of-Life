import produce from "immer";
export const gridSize = 32
export const speed = 200

export const generateEmptyGrid = (size: number) => {
  const rows = [];
  for (let i = 0; i < size; i++) {
    rows.push(Array.from(Array(size), () => 0));
  }
  return rows;
};

export const positions = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

export const generateRandomGrid = (size: number): number[][] => {
  const rows = [];
  for (let i = 0; i < gridSize; i++) {
    rows.push(
      Array.from(Array(gridSize), () =>
        Math.random() > 0.7 ? 1 : 0
      )
    );
  }
  return rows;
}

export const produceGrid = (g: number[][]) => {
  return produce(g, (gridCopy: number[][]) => {
    for (let i = 0; i < gridSize; i++) {
      for (let k = 0; k < gridSize; k++) {
        let neighbors = 0;
        positions.forEach(([x, y]) => {
          let newI = i + x;
          let newK = k + y;
          if(newI<0)
            newI = gridSize-1;
          if(newI>=gridSize)
            newI = 0;
          if(newK<0)
            newK = gridSize-1;
          if(newK>=gridSize)
            newK = 0;
          if (
            newI >= 0 &&
            newI < gridSize &&
            newK >= 0 &&
            newK < gridSize
          ) {
            neighbors += g[newI][newK];
          }
        });

        if (neighbors < 2 || neighbors > 3) {
          gridCopy[i][k] = 0;
        } else if (g[i][k] === 0 && neighbors === 3) {
          gridCopy[i][k] = 1;
        }
      }
    }
  });
}

export const produceSwitchCellGrid = (grid: number[][], i: number, k: number) => {
  return produce(grid, (gridCopy) => {
    gridCopy[i][k] = grid[i][k] ? 0 : 1;
  })
}