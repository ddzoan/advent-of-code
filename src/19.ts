import { importFile } from './utils/utils';

let shouldLog = true;
const clog = (...args) => shouldLog && console.log(...args);

const data = importFile(__filename).trim();
const testAnswer = 16;
const testData = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`

// const isPossible = (pattern, towels, cache) => {
//     if(pattern in cache) {
//         return cache[pattern];
//     }
//     if (pattern === '') {
//         return true;
//     }
//     // clog('pattern', pattern)
//     const patternsToCheck = towels.filter(towel => {
//         for (let i = 0; i < towel.length; i++) {
//             if (towel[i] !== pattern[i]) {
//                 return false;
//             }
//         }
//         return true;
//     }).map(towel => pattern.slice(towel.length));
//     clog(patternsToCheck)
//     if (patternsToCheck.length === 0) {
//         return false;
//     }

//     return patternsToCheck.some(newPattern => {
//         const possible = isPossible(newPattern, towels, cache);
//         cache[newPattern] = possible;
//         return possible;
//     });
// }

const ways = (pattern, towels, cache) => {
    if(pattern in cache) {
        return cache[pattern];
    }
    if (pattern === '') {
        return 1;
    }
    // clog('pattern', pattern)
    const patternsToCheck = towels.filter(towel => {
        for (let i = 0; i < towel.length; i++) {
            if (towel[i] !== pattern[i]) {
                return false;
            }
        }
        return true;
    }).map(towel => pattern.slice(towel.length));
    clog(patternsToCheck)
    if (patternsToCheck.length === 0) {
        return 0;
    }

    const differentWays = patternsToCheck.map(newPattern => ways(newPattern, towels, cache)).reduce((a, b) => a + b);
    cache[pattern] = 1 * differentWays;
    return differentWays;
}

const run = (data) => {
    const str = data.split('\n');
    const towels = str[0].split(', ');
    const patterns = str.slice(2);

    const cache = {};
    let waysCount = 0;
    clog(patterns.length, 'patterns to check')
    patterns.forEach((pattern, i) => {
        clog(`#${i} pattern, ${pattern}`)
        const count = ways(pattern, towels, cache);
        clog(count);
        waysCount += count;
    })
    return waysCount;
}

const testRunResult = run(testData);
console.log(testRunResult);

if (testRunResult === testAnswer) {
    console.log('Test data answer correct! Trying with real input')
    shouldLog = false;
    console.log(run(data))
}