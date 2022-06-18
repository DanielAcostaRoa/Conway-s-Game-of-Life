import Head from "next/head";
import Grid from "../components/grid/Grid";

export default function Home() {
  return (
    <>
      <Head>
        <title>Game of Life</title>
      </Head>
      <main className="flex flex-col h-screen">
        <header className="w-full h-218 bg-indigo-600 text-black font-extrabold flex justify-center">
          <h1 className="h-full text-center py-2 text-3xl">
            Conway&apos;s Game of Life
          </h1>
        </header>
        <section className="flex flex-col flex-1 border-2 px-32">
          <div className="flex h-full">
            <div className="w-2/3 h-full flex flex-col justify-evenly items-center">
              <Grid />
            </div>
            <div className="w-1/3 h-full flex flex-col pt-12 items-center">
              <p className="">
              <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" className="font-semibold ">The Game of Life</a>
                , also known simply as Life, is a cellular
                automaton devised by the British mathematician John Horton
                Conway in 1970. It is a zero-player game, meaning that its
                evolution is determined by its initial state, requiring no
                further input. One interacts with the Game of Life by creating
                an initial configuration and observing how it evolves.
              </p>
              <p className="font-semibold items-left">Rules</p>
              <ol>
                <li className="py-1">
                  1. Any live cell with fewer than two live neighbours dies, as
                  if by underpopulation.
                </li>
                <li className="py-1">
                  2. Any live cell with two or three live neighbours lives on to
                  the next generation.
                </li>
                <li className="py-1">
                  3. Any live cell with more than three live neighbours dies, as
                  if by overpopulation.
                </li>
                <li className="py-1">
                  4. Any dead cell with exactly three live neighbours becomes a
                  live cell, as if by reproduction.
                </li>
              </ol>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
