import { importFile } from './utils/utils';

let shouldLog = true;
const clog = (...args) => shouldLog && console.log(args);

const data = importFile(__filename).trim();
const testAnswer = 0;
const testData = ``

const run = (data) => {

}

const testRunResult = run(testData);
console.log(testRunResult);

if(testRunResult === testAnswer) {
    console.log('Test data answer correct! Trying with real input')
    shouldLog = false;
    console.log(run(data))
}