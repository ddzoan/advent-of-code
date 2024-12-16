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

// export interface Position {
//     row: number,
//     col: number,
// }

export const positionMove = (position, offset) => {
    return [position[0] + offset[0], position[1] + offset[1]];
}

export class Grid {
    grid: string[][];
    constructor(string) {
        this.grid = string.split('\n').map(row => row.split(''));
    }
    get(position) {
        return this.grid[position[0]][position[1]];
    }
    isInBounds(position) {
        const [row, col] = position;
        return row >= 0 && col >= 0 && row < this.grid.length && col < this.grid[0].length;
    }
    find(char: string) {
        for(let row = 0; row < this.grid.length; row++) {
            for(let col = 0; col < this.grid[0].length; col++) {
                if(this.grid[row][col] === char) {
                    return [row, col];
                }
            }
        }
        return null;
    }
}

export const isInBounds = (position, grid) => {
    const [row, col] = position;
    return row >= 0 && col >= 0 && row < grid.length && col < grid[0].length;
}

// turning a position to a string (useful for sets)
export const posStr = (rowOrPosition: number | [number, number], col?: number | undefined) => col === undefined ? `${rowOrPosition[0]},${rowOrPosition[1]}` : `${rowOrPosition},${col}`;
