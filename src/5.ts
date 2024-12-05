import {importFile} from './utils/utils';

const data = importFile(__filename).trim();
// const data = `47|53
// 97|13
// 97|61
// 97|47
// 75|29
// 61|13
// 75|53
// 29|13
// 97|29
// 53|29
// 61|53
// 97|53
// 61|29
// 47|13
// 75|47
// 97|75
// 47|61
// 75|61
// 47|29
// 75|13
// 53|13

// 75,47,61,53,29
// 97,61,53,29,13
// 75,29,13
// 75,97,47,61,53
// 61,13,29
// 97,13,75,29,47`;

// console.log(data)

const rules = [];
const updates = [];

data.split('\n').forEach(row => {
    if(row.includes('|')) {
        rules.push(row);
    }
    if(row.includes(',')) {
        updates.push(row.split(','))
    }
});

const valid = (update, adjList) => {
    const visitedSet = new Set();
    for(let i = 0; i < update.length; i++) {
        const visit = update[i];
        if(adjList[visit] && Array.from(adjList[visit]).some(num => visitedSet.has(num))) {
            return false;
        }
        visitedSet.add(visit);
    }
    return true;
}

const findInvalid = (update, adjList) => {
    const visitedSet = new Set();
    for(let i = 0; i < update.length; i++) {
        const visit = update[i];
        if(adjList[visit] && Array.from(adjList[visit]).some(num => visitedSet.has(num))) {
            return i;
        }
        visitedSet.add(visit);
    }
}

const fix = (update, adjList) => {
    const newArr = [...update];
    while(!valid(newArr, adjList)) {
        const invalid = findInvalid(newArr, adjList);
        const temp = newArr[invalid];
        newArr[invalid] = newArr[invalid - 1];
        newArr[invalid - 1] = temp;
    }
    return newArr;
}

// console.log(rules)
// console.log(updates)

const adjList = {};
rules.forEach(rule => {
    const [from, to] = rule.split('|');
    if(!(from in adjList)) {
        adjList[from] = new Set();
    }
    adjList[from].add(to);
});

let middleCount = 0;
let wrongMiddleCount = 0;

updates.forEach(update => {
    if(valid(update, adjList) === true) {
        middleCount += parseInt(update[Math.floor(update.length / 2)]);
    } else {
        const fixed = fix(update, adjList);
        wrongMiddleCount += parseInt(fixed[Math.floor(fixed.length / 2)]);
    }
});

console.log(middleCount);
console.log(wrongMiddleCount);