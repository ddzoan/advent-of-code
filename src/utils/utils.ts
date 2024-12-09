import fs from "fs";

export const importFile = (filename: string) => {
    // console.log(filename)
    const inputFile = filename.match(/\/[\d]+\.ts/g)[0].split('.ts')[0] + 'i'
    return fs.readFileSync(`./src${inputFile}`).toString();
}

export class Logger {
    showLogs: boolean;
    constructor(showLogs: boolean) {
        this.showLogs = showLogs;
    }
    log(...args) {
        if(this.showLogs) {
            console.log(args);
        }
    }
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