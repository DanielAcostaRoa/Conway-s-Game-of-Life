export const gridSize= 32
export const speed= 200

export const generateEmptyGrid = (size:number) => {
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

export const generateRandomGrid = (size:number):number[][] => {
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