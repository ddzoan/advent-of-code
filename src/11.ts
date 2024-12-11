import { importFile } from './utils/utils';

let shouldLog = true;
const clog = (...args) => shouldLog && console.log(...args);

const data = importFile(__filename).trim();
const testAnswer = 55312;
const testData = '125 17';
// const testData = `Initial arrangement:
// 125 17

// After 1 blink:
// 253000 1 7

// After 2 blinks:
// 253 0 2024 14168

// After 3 blinks:
// 512072 1 20 24 28676032

// After 4 blinks:
// 512 72 2024 2 0 2 4 2867 6032

// After 5 blinks:
// 1036288 7 2 20 24 4048 1 4048 8096 28 67 60 32

// After 6 blinks:
// 2097446912 14168 4048 2 0 2 4 40 48 2024 40 48 80 96 2 8 6 7 6 0 3 2`

const change = (stone) => {
    // clog(stone)
    if(stone === 0) {
        return [1];
    }
    const length = `${stone}`.length;
    // clog('length', length, length % 2)
    if(length % 2 === 0) {
        const left = parseInt(`${stone}`.slice(0, length / 2));
        const right = parseInt(`${stone}`.slice(length / 2));
        // clog(left, right)
        return [left, right];
    }
    return [stone * 2024];
}

const dfs = (stone, times, memo) => {
    if(times === 0) {
        return 1;
    }
    if(memo[`${stone},${times}`]) {
        return memo[`${stone},${times}`];
    }
    const result = change(stone).flatMap(newStone => dfs(newStone, times - 1, memo)).reduce((a, b) => a + b);
    memo[`${stone},${times}`] = result;
    return result;
}

const run = (data) => {
    let answer = 0;
    const memoizer = {};

    const blinks = 75;
    let input = data.split(' ').map(a => parseInt(a));
    // for(let i = 0; i < blinks; i++) {
    //     input = input.flatMap(stone => change(stone));
    //     // clog('after', input)
    // }

    // clog(dfs(125, 6));
    input.forEach(num => {
        const result = dfs(num, blinks, memoizer);
        // clog(result)
        answer += result
    })

    // answer = input.length;
    return answer;
}

const testRunResult = run(data);
console.log(testRunResult);

// if(testRunResult === testAnswer) {
//     console.log('Test data answer correct! Trying with real input')
//     shouldLog = false;
//     console.log(run(data))
// }