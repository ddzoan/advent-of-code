import fs from "fs";

export const importFile = (filename: string) => {
    // console.log(filename)
    const inputFile = filename.match(/\/[\d]+\.ts/g)[0].split('.ts')[0] + 'i'
    return fs.readFileSync(`./src${inputFile}`).toString();
}

export const dirOffsetWithDiagonal = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1,1],
    [-1,-1],
    [1,-1],
    [-1,1],
];

export const dirOffset = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
]

export const isInBounds = (position, grid) => {
    const [row, col] = position;
    return row >= 0 && col >= 0 && row < grid.length && col < grid[0].length;
}

// turning a position to a string (useful for sets)
export const posStr = (row, col) => `${row},${col}`;
