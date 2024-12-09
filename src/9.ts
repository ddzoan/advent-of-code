import { importFile } from './utils/utils';

const data = importFile(__filename).trim();
const testAnswer = 1928;
const testData = `2333133121414131402`

const checksum = (dataObj, length) => {
    let sum = 0;
    for(let i = 0; i < length; i++) {
        if(dataObj[i] !== '.') {
            sum += dataObj[i] * i;
        }
    }
    return sum;
}

const run = (data) => {
    const uncompressed = {};
    let length = 0;
    for(let i = 0; i < data.length; i++) {
        const fileId = i % 2 === 0 ? Math.floor(i / 2) : null;
        for(let j = 0; j < parseInt(data[i]); j++) {
            uncompressed[length] = fileId === null ? '.' : fileId;
            length++;
        }
    }

    // console.log(uncompressed);

    let left = 0;
    while(uncompressed[left] !== '.') {
        left++;
    }
    let right = length - 1;
    while(uncompressed[right] === '.') {
        right--;
    }


    // let count = 0;
    // const length = compressed.length;
    while(left < right) {
        // console.log('left', left)
        // console.log('right', right)
        // console.log(compressed)
        // console.log(compressed.substring(0, left) ,
        //  compressed[right] ,
        //  compressed.substring(left + 1, right) ,
        //   '.' ,
        //   compressed.substring(right + 1))
        // console.log(left, right)
        // console.log(compressed)
        // if(count === 11) {
        //     console.log(compressed)
        // console.log(compressed.substring(0, left) ,
        //  compressed[right] ,
        //  compressed.substring(left + 1, right) ,
        //   '.' ,
        //   compressed.substring(right + 1))
        //   break;
        // }
        // compressed = compressed.substring(0, left) + compressed[right] + compressed.substring(left + 1, right) + '.' + compressed.substring(right + 1);
        uncompressed[left] = uncompressed[right];
        uncompressed[right] = '.';


        while(uncompressed[left] !== '.') {
            left++;
        }
        while(uncompressed[right] === '.') {
            right--;
        }

        // console.log(compressed)
        // console.log(left, right)
        // if(compressed.length !== length) {
        //     console.log('oops')
        //     console.log(left, right)
        //     console.log(compressed);
        //     break;
        // }
    }
    // console.log('final', uncompressed)
    return checksum(uncompressed, length);
}

const testRunResult = run(testData);
console.log(testRunResult);

if(testRunResult === testAnswer) {
    console.log(run(data))
}