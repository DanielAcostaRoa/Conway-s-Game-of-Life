import React, { useState, useCallback, useRef } from "react";
import {
  generateEmptyGrid,
  gridSize,
  speed,
  generateRandomGrid,
  produceGrid,
  produceSwitchCellGrid,
} from "../utils/gameOfLife.utils";

export default function Grid() {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid(gridSize);
  });
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;
    setGrid((g) => {
      return produceGrid(g);
    });
    setTimeout(runSimulation, speed);
  }, []);

  const stepGrid = useCallback(() => {
    if (runningRef.current) {
      setRunning(false);
    }
    setGrid((g) => {
      return produceGrid(g);
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
                const newGrid = produceSwitchCellGrid(grid, i, k);
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
