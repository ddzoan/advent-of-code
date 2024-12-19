import fs from "fs";

const FETCH_BUFFER = 5000; // add 5 seconds to make sure I'm fetching the input after it's available
const now = new Date();
const DAY = now.getDate() + 1;
const FETCH_NOW = false

const getInput = async (inputFilePath) => {
    const { Readable } = require('stream');
    const { finished } = require('stream/promises');
    const stream = fs.createWriteStream(inputFilePath);
    
    const {body} = await fetch(`https://adventofcode.com/2024/day/${DAY}/input`, {
        "headers": {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:132.0) Gecko/20100101 Firefox/132.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "same-origin",
            "Sec-GPC": "1",
            "Priority": "u=0, i",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache",
            "cookie": "session=53616c7465645f5f3275a813a2f2908264cefb81d7ba2bc4a34fbd2fdde8f9beb44cf7ac1f079383695a95c54ca3330e02ddcb9069a0793cff7f3d2fa8b4c092",
        },
        "referrer": "https://adventofcode.com/2024/day/2",
        "method": "GET",
        "mode": "cors"
    });
    await finished(Readable.fromWeb(body).pipe(stream));
}

const newFilePath = `src/${DAY}.ts`;

if (!fs.existsSync(newFilePath)) {
    fs.copyFileSync('src/template.ts', newFilePath)
} else {
    console.log(newFilePath, 'already exists. Not overwriting');
}

const openTime = new Date(`12/${now.getDate()}/2024 21:00:00`);

const secondsToStart = openTime.valueOf() - now.valueOf() + FETCH_BUFFER;

console.log(`fetching input in ${secondsToStart / 1000} seconds (${secondsToStart / 1000 / 60} minutes)`);

const inputFilePath = `./src/${DAY}i`;
if (!fs.existsSync(inputFilePath)) {
    if(FETCH_NOW) {
        getInput(inputFilePath)
    } else {
        setTimeout(() => getInput(inputFilePath), secondsToStart);
    }
}
