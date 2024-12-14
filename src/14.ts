import { importFile } from './utils/utils';

let shouldLog = true;
const clog = (...args) => shouldLog && console.log(...args);

const data = importFile(__filename).trim();
const testAnswer = 12;
const testData = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`

const parseLine = line => {
    const [positionStr, velocityStr] = line.split(' ');
    const position = positionStr.slice(2).split(',').map(a => parseInt(a));
    const velocity = velocityStr.slice(2).split(',').map(a => parseInt(a));
    return [position, velocity];
}

const SECONDS = 100;

const ROWS = 103;
const COLS = 101;

const whichQuadrant = (pos) => {
    if(Math.floor(ROWS / 2) === pos[0] || Math.floor(COLS / 2) === pos[1]) {
        return null;
    }
    if(pos[0] < Math.floor(ROWS / 2)) {
        if(pos[1] < Math.floor(COLS / 2)) {
            return 1;
        } else {
            return 2;
        }
    } else {
        if(pos[1] < Math.floor(COLS / 2)) {
            return 3;
        } else {
            return 4;
        }
    }
}

const modPos = (num, mod) => 
    (num % mod + mod) % mod;


const run = (data) => {
    // const robots = {};
    const quadrantCount = [0, 0, 0, 0];
    data.split('\n').forEach(robotLine => {
        console.log(robotLine)
        const [p, v] = parseLine(robotLine);
        clog(p, v)
        const [col, row] = p;
        const [offsetCol, offsetRow] = v.map(v => v * SECONDS);
        console.log(offsetCol, offsetRow)
        const newPosition = [modPos(row + offsetRow, ROWS), modPos(col + offsetCol, COLS)];
        clog(newPosition)
        const quadrant = whichQuadrant(newPosition);
        if(quadrant) {
            quadrantCount[quadrant - 1]++;
        }
    });
    console.log('q count', quadrantCount)
    return quadrantCount.reduce((a, b) => a * b);
}

const testRunResult = run(data);
console.log(testRunResult);

// if(testRunResult === testAnswer) {
//     console.log('Test data answer correct! Trying with real input')
//     shouldLog = false;
//     console.log(run(data))
// }