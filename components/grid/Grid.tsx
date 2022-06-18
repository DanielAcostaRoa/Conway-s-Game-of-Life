import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import {
  generateEmptyGrid,
  positions,
  gridSize,
  speed,
  generateRandomGrid,
} from "../utils/gameOfLife.utils";

export default function Grid() {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid(gridSize);
  });
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < gridSize; i++) {
          for (let k = 0; k < gridSize; k++) {
            let neighbors = 0;
            positions.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
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
    });
    setTimeout(runSimulation, speed);
  }, []);

  // Used to step the grid through the lifecycle one generation at a time
  const stepGrid = useCallback(() => {
    if (runningRef.current) {
      setRunning(false);
    }
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < gridSize; i++) {
          for (let k = 0; k < gridSize; k++) {
            let neighbors = 0;
            positions.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
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
    });
  }, []);

  return (
    <>
      <div
        className="shadow-xl"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1rem)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: "1rem",
                height: "1rem",
                backgroundColor: grid[i][k] ? "black" : "white",
                border: "solid 1px black",
              }}
            />
          ))
        )}
      </div>
      <div className="flex flex-col w-2/3 px-4 justify-between">
        <div className="flex w-full justify-between">
          <button
            className="bg-black hover:bg-indigo-100 text-white px-6 py-1 my-2 border rounded-xl  shadow-lg"
            onClick={() => {
              setRunning(!running);
              if (!running) {
                runningRef.current = true;
                runSimulation();
              }
            }}
          >
            {running ? "stop" : "start"}
          </button>
          <button
            className="bg-black hover:bg-indigo-100 text-white px-6 py-1 my-2 border rounded-xl  shadow-lg"
            onClick={() => {
              stepGrid();
            }}
          >
            step
          </button>
          <button
            className="bg-black hover:bg-indigo-100 text-white px-6 py-1 my-2 border rounded-xl  shadow-lg"
            onClick={() => {
              setGrid(generateRandomGrid(gridSize));
            }}
          >
            random
          </button>
          <button
            className="bg-black hover:bg-indigo-100 text-white px-6 py-1 my-2 border rounded-xl  shadow-lg"
            onClick={() => {
              setGrid(generateEmptyGrid(gridSize));
            }}
          >
            clear
          </button>
        </div>
      </div>
    </>
  );
}
