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
    place(point, char) {
        this.grid[point[0]][point[1]] = char;
    }
    display() {
        console.log(this.grid.map(row => row.join('')).join('\n'))
    }
}

export const makeGrid = (rows, cols) => {
    let newGrid = '';
    for(let row = 0; row < rows; row++) {
       newGrid += '.'.repeat(cols) + '\n' 
    }
    return new Grid(newGrid.trim());
}

export const adjacent = (position) => dirOffset.map(([offsetRow, offsetCol]) => [position[0] + offsetRow, position[1] + offsetCol]);

export class PositionSet {
    set = new Set();
    constructor() {}
    add(position) {
        return this.set.add(this.serialize(position));
    }
    has(position) {
        return this.set.has(this.serialize(position));
    }
    serialize(position) {
        return `${position[0]},${position[1]}`;
    }
}

export const isInBounds = (position, grid) => {
    const [row, col] = position;
    return row >= 0 && col >= 0 && row < grid.length && col < grid[0].length;
}

// turning a position to a string (useful for sets)
export const posStr = (rowOrPosition: number | [number, number], col?: number | undefined) => col === undefined ? `${rowOrPosition[0]},${rowOrPosition[1]}` : `${rowOrPosition},${col}`;
