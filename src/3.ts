import {importFile} from './utils/utils';

const data = importFile(__filename).trim();
// console.log(data)
// const data = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"

// const array = [...data.matchAll(/mul\(\d+,\d+\)/g)]
let sum = 0;
// array.forEach(match => {
//     console.log(match[0])
//     const nums = match[0].split('mul(')[1].split(')')[0].split(',');
//     sum += nums[0] * nums[1]
// })

let dont = false;

for(let i = 0; i < data.length; i++) {
    // console.log(data[i])
    switch(data[i]) {
        case 'd':
            // console.log('d', data.slice(i, i+5), data[i+1])
            if(data.slice(i, i+5) === "don't") {
                dont = true;
                i = i + 4;
                // console.log(data.slice(i, i+5), i)
            } else if(data[i + 1] === 'o') {
                dont = false;
                i = i + 1;
            }
            break;
        case 'm':
            // console.log('m', dont, data.slice(i, i+4))
            if(!dont) { 
                if(data.slice(i, i+4) === 'mul(') {
                    let j = i + 4;
                    let num1 = '';
                    while(data[j] !== ',' && (data[j] === '0' || parseInt(data[j]))) {
                        num1 += data[j];
                        j++;
                    }
                    let num2 = '';
                    if(data[j] === ',') {
                        j++;
                        while(data[j] !== ')' && (data[j] === '0' || parseInt(data[j]))) {
                            num2 += data[j];
                            j++;
                        }
                        if(data[j] === ')') {
                            sum += parseInt(num1) * parseInt(num2);
                        }
                    }
                }
            }
            break;
        default:
            break;
    }
}

console.log(sum)