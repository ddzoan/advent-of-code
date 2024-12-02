import fs from "fs";
import {
    MinPriorityQueue,
  } from '@datastructures-js/priority-queue';

const inputFile = __filename.match(/\/[\d]+\.ts/g)[0].split('.ts')[0] + 'i'
const input = fs.readFileSync(`./src${inputFile}`).toString();

const queue1 = new MinPriorityQueue()
const queue2 = new MinPriorityQueue()
const rightCount = {};
input.split('\n').forEach(line => {
    const [one, two] = line.split('   ')
    if(!one || !two) {
        console.log('one', one, 'two', two)
    } else {
        queue1.push(one);
        queue2.push(two);
        if(!(two in rightCount)) {
            rightCount[two] = 0;
        }
        rightCount[two]++;
    }
});
let sum = 0;
let similarity = 0;
while(!queue1.isEmpty()) {
    // console.log(queue1.front(), queue2.front())
    if(queue1.front() && queue2.front()) {
        const one = queue1.pop();
        sum += Math.abs(one - queue2.pop());
        similarity += one * (rightCount[one] || 0);
    }
}
console.log('sum', sum)
console.log('similarity', similarity)
