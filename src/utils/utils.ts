import fs from "fs";

export const importFile = (filename: string) => {
    // console.log(filename)
    const inputFile = filename.match(/\/[\d]+\.ts/g)[0].split('.ts')[0] + 'i'
    return fs.readFileSync(`./src${inputFile}`).toString();
}