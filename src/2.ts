import {importFile} from './utils/utils';

const data = importFile(__filename);
// console.log(data)

const reports = data.trim().split('\n');
let safeReports = 0;
reports.forEach(report => {
    const levels = report.split(' ').map(a => parseInt(a));
    let current: number = levels[0];
    let tolerate = true;
    const dir = levels[1] > levels[0] ? 1 : -1;
    for(let i = 1; i < levels.length; i++) {
        const diff = dir * (levels[i] - current);
        if(levels[i] === current || diff < 1 || diff > 3) {
            // console.log('bad', levels)
            if(tolerate) {
                tolerate = false;
            } else {
                return;
            }
        }
        current = levels[i];
    }
    // console.log('good', levels)
    safeReports++;
})
console.log(safeReports)