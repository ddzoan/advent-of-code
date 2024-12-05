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