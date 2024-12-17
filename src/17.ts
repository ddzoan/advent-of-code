import { register } from 'module';
import { importFile } from './utils/utils';
import assert from 'assert';

let shouldLog = true;
const clog = (...args) => shouldLog && console.log(...args);

const data = importFile(__filename).trim();
// const testAnswer = '4,6,3,5,6,3,5,2,1,0';
// const testData = `Register A: 729
// Register B: 0
// Register C: 0

// Program: 0,1,5,4,3,0`
const testAnswer = 117440;
const testData = `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`

const comboOperand = (operand, registers) => {
    switch(operand) {
        case 0:
        case 1:
        case 2:
        case 3:
            return operand;
        case 4:
            return registers.A;
        case 5:
            return registers.B;
        case 6:
            return registers.C;
        case 7:
        default:
            throw 'shouldnt happen';
    }
}

const adv = (operand, registers) => {
    clog('adv', operand, registers)
    const denominator = comboOperand(operand, registers);
    registers.A = Math.floor(registers.A / (Math.pow(2, denominator)));
}

const bxl = (operand, registers) => {
    clog('bxl', operand, registers)
    registers.B = registers.B ^ operand;
}

const bst = (operand, registers) => {
    clog('bst', operand, registers)
    registers.B = comboOperand(operand, registers) % 8;
}

const jnz = (operand, registers) => {
    clog('jnz', operand, registers)
    if(registers.A === 0) {
        return undefined;
    }
    return {instructionPointer: operand};
}

const bxc = (operand, registers) => {
    clog('bxc', operand, registers)
    registers.B = registers.B ^ registers.C
}

const out = (operand, registers) => {
    clog('out', operand, registers)
    const output = comboOperand(operand, registers) % 8;
    return {output};
}

const bdv = (operand, registers) => {
    clog('bdv', operand, registers)
    const denominator = comboOperand(operand, registers);
    registers.B = Math.floor(registers.A / (Math.pow(2, denominator)));
}

const cdv = (operand, registers) => {
    clog('cdv', operand, registers)
    const denominator = comboOperand(operand, registers);
    registers.C = Math.floor(registers.A / (Math.pow(2, denominator)));
}

const functionMap = {
    0: adv,
    1: bxl,
    2: bst,
    3: jnz,
    4: bxc,
    5: out,
    6: bdv,
    7: cdv,
}

const outputMatchesSoFar = (output, program) => {
    for(let i = 0; i < output.length; i++) {
        if(output[i] !== program[i]) {
            return false;
        }
    }
    return true;
}

const outputMatches = (output, program) => {
    if(output.length !== program.length) {
        return false;
    }
    return outputMatchesSoFar(output, program);
}

const run = (data) => {
    const registers = {};
    const rawData = data.split('\n');
    const split = rawData.findIndex(row => row === '');
    // registers data
    rawData.slice(0, split).forEach(register => {
        const [_, key, val] = register.split(' ');
        registers[key[0]] = parseInt(val);
    });
    const program = rawData.slice(split + 1)[0].split(' ')[1].split(',').map(a => parseInt(a));
    clog(registers)
    clog(program)
    let startingA = 0;
    let matchFound;
    while(!matchFound) {
        registers.A = startingA;
        registers.B = 0;
        registers.C = 0;
        console.log('checking with register A starting at:', startingA)
        const output = [];
        let instructionPointer = 0;
        while(instructionPointer < program.length && outputMatchesSoFar(output, program)) {
            const opcode = program[instructionPointer];
            const operand = program[instructionPointer + 1];
            
            const result = functionMap[opcode](operand, registers);
            if(result?.output !== undefined) {
                output.push(result.output);
            }
            if(result?.instructionPointer !== undefined) {
                instructionPointer = result.instructionPointer;
            } else {
                instructionPointer += 2;
            }
            // console.log('ins pointer', instructionPointer)
            // clog(registers)
        }
        if(outputMatches(output, program)) {
            matchFound = true;
        } else {
            startingA++;
        }
    }
    return registers.A;
    // console.log(registers)
    // return {registers, output: output.join(',')};
}

// let tests;
// let res;

// tests = {C: 9};
// res = bst(6, tests);
// assert(tests.B === 1)

// tests = `Register A: 10
// Register B: 0
// Register C: 0

// Program: 5,0,5,1,5,4`
// res = run(tests);
// assert(res.output === '0,1,2');

// tests = `Register A: 2024

// Program: 0,1,5,4,3,0`
// res = run(tests)
// console.log(res)
// assert(res.output === '4,2,5,6,7,7,7,7,3,1,0');
// assert(res.registers.A === 0)

// tests = `Register B: 29

// Program: 1,7`
// res = run(tests);
// assert(res.registers.B === 26);

// tests = `Register B: 2024
// Register C: 43690

// Program: 4,0`
// res = run(tests);
// assert(res.registers.B === 44354)




const testRunResult = run(testData);
console.log(testRunResult);

if(testRunResult === testAnswer) {
    console.log('Test data answer correct! Trying with real input')
    shouldLog = false;
    console.log(run(data))
}