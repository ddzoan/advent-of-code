import { importFile } from './utils/utils';
import { Logger } from './utils/utils';

const data = importFile(__filename).trim();
const testAnswer = 0;
const testData = ``

const run = (data, showLogs) => {
    const clog = new Logger(showLogs);
    clog.log()


}

const testRunResult = run(testData, true);
console.log(testRunResult);

if(testRunResult === testAnswer) {
    console.log('Test data answer correct! Trying with real input')
    console.log(run(data, false))
}