import { importFile } from './utils/utils';

const data = importFile(__filename).trim();
const testAnswer = 2858;
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
    const freeBlocks = [];
    let length = 0;
    for(let i = 0; i < data.length; i++) {
        const fileId = i % 2 === 0 ? Math.floor(i / 2) : null;
        if(fileId === null && data[i] > 0) {
            freeBlocks.push([parseInt(data[i]), length]);
        }
        for(let j = 0; j < parseInt(data[i]); j++) {
            uncompressed[length] = fileId === null ? '.' : fileId;
            length++;
        }
    }

    // console.log(uncompressed);
    // console.log(freeBlocks)

    // let left = 0;
    // while(uncompressed[left] !== '.') {
    //     left++;
    // }
    // let right = length - 1;
    // while(uncompressed[right] === '.') {
    //     right--;
    // }


    // // let count = 0;
    // // const length = compressed.length;
    // while(left < right) {
    //     // console.log('left', left)
    //     // console.log('right', right)
    //     // console.log(compressed)
    //     // console.log(compressed.substring(0, left) ,
    //     //  compressed[right] ,
    //     //  compressed.substring(left + 1, right) ,
    //     //   '.' ,
    //     //   compressed.substring(right + 1))
    //     // console.log(left, right)
    //     // console.log(compressed)
    //     // if(count === 11) {
    //     //     console.log(compressed)
    //     // console.log(compressed.substring(0, left) ,
    //     //  compressed[right] ,
    //     //  compressed.substring(left + 1, right) ,
    //     //   '.' ,
    //     //   compressed.substring(right + 1))
    //     //   break;
    //     // }
    //     // compressed = compressed.substring(0, left) + compressed[right] + compressed.substring(left + 1, right) + '.' + compressed.substring(right + 1);
        
        
    //     // uncompressed[left] = uncompressed[right];
    //     // uncompressed[right] = '.';

    //     // while(uncompressed[left] !== '.') {
    //     //     left++;
    //     // }
    //     // while(uncompressed[right] === '.') {
    //     //     right--;
    //     // }
    // }
    // console.log('final', uncompressed)

    let right = length - 1;
    while(right > 0) {
        while(uncompressed[right] === '.') {
            right--;
        }
        let length = 1;
        let id = uncompressed[right];
        while(uncompressed[right - 1] === id) {
            length++;
            right--;
        }

        // find open spot
        const openSpaceIndex = freeBlocks.findIndex(block => {
            return block[0] >= length;
        })
        if(openSpaceIndex !== -1) {
            const openSpace = freeBlocks[openSpaceIndex];
            console.log('id', id)
            console.log('length', length)
            console.log('open space at', openSpaceIndex)
            console.log(openSpace)
            if(right > openSpace[1]) {
                for(let i = 0; i < length; i++) {
                    uncompressed[i + openSpace[1]] = uncompressed[i + right];
                    uncompressed[i + right] = '.';
                }
    
                // update freespace objects
                const [space, index] = freeBlocks[openSpaceIndex];
                freeBlocks[openSpaceIndex] = [space - length, index + length]
            } else {
                right--
            }

            // console.log(freeBlocks)
        } else {
            right--;
        }
    }
    console.log(uncompressed)
    return checksum(uncompressed, length);
}

const testRunResult = run(testData);
console.log(testRunResult);

if(testRunResult === testAnswer) {
    console.log('Test data answer correct! Trying with real input')
    console.log(run(data))
}