import { importFile } from './utils/utils';

const data = importFile(__filename).trim();
// const data = `190: 10 19
// 3267: 81 40 27
// 83: 17 5
// 156: 15 6
// 7290: 6 8 6 15
// 161011: 16 10 13
// 192: 17 8 14
// 21037: 9 7 18 13
// 292: 11 6 16 20`

const lines = data.split('\n');

const calibrated = (runningVal, total, index, arr) => {
    if(index === arr.length) {
        if(runningVal === total) {
            return true;
        } else {
            return false;
        }
    } else {
        return [
            calibrated(runningVal + arr[index], total, index + 1, arr),
            calibrated(runningVal * arr[index], total, index + 1, arr),
            calibrated(parseInt(`${runningVal}${arr[index]}`), total, index+1, arr)
        ].some(a => a);
    }
}

let sum = 0;

lines.forEach(line => {
    const total = parseInt(line.split(': ')[0]);
    const vals = line.split(': ')[1].split(' ').map(a => parseInt(a));
    if(calibrated(vals[0], total, 1, vals)) {
        sum += total;
        // console.log(line)
    } else {
        // console.log('nope', line)
    }
})
console.log(sum)