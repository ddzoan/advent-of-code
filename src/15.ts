import { Grid, importFile, positionMove } from './utils/utils';

let shouldLog = true;
const clog = (...args) => shouldLog && console.log(...args);

const data = importFile(__filename).trim();
const testAnswer = 10092;
const testData = `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^
`

const dirMap = {
    '<': [0, -1],
    'v': [1, 0],
    '>': [0, 1],
    '^': [-1, 0]
};

const canMove = (position, grid, dirStr) => {
    let [row, col] = position;
    let gridCell = grid.get(position);
    while (gridCell !== '.' && gridCell !== '#') {
        const [rOff, cOff] = dirMap[dirStr];
        row += rOff;
        col += cOff;
        gridCell = grid.get([row, col])
    }
    return gridCell === '.' ? [row, col] : null;
}

const moveThings = (grid, robotPosition, moveDir) => {
    let moveTo = canMove(robotPosition, grid, moveDir);
    if (moveTo !== null) {
        grid.place(robotPosition, '.');
        const newPosition = positionMove(robotPosition, dirMap[moveDir]);
        robotPosition[0] = newPosition[0];
        robotPosition[1] = newPosition[1];
        grid.place(newPosition, '@');
        if (moveTo[0] === newPosition[0] && moveTo[1] === newPosition[1]) {
    
        } else {
            grid.place(moveTo, 'O');
        }
    }
}

const run = (data) => {
    const rawData = data.split('\n');
    const split = rawData.findIndex(row => row === '');
    // let newGrid = '';
    let newGrid = rawData.slice(0, split).join('\n');
    // rawData.slice(0, split).forEach(line => {
    //     for(let i = 0; i < line.length; i++) {
    //         switch (line[i]) {
    //             case '#':
    //                 newGrid += '##';
    //                 break;
    //             case 'O':
    //                 newGrid += '[]';
    //                 break;
    //             case '.':
    //                 newGrid += '..';
    //                 break;
    //             case '@':
    //                 newGrid += '@.';
    //                 break;
    //             default:
    //                 throw 'shoundt be here';
    //                 break;
    //         }
    //     }
    //     newGrid += '\n';
    // });
    const grid = new Grid(newGrid);
    // clog(grid);
    // grid.display()
    const moves = rawData.slice(split).join('').split('');
    // clog(moves);

    let robotPosition = grid.find('@');
    clog(robotPosition)

    moves.forEach((move) => {
        // clog(move)
        moveThings(grid, robotPosition, move);
    });

    grid.display();
    let sum = 0;
    grid.getAllOf('O').forEach(boxCoord => {
        sum += boxCoord[0] * 100 + boxCoord[1]
    })
    return sum;
}

const testRunResult = run(testData);
console.log(testRunResult);

if (testRunResult === testAnswer) {
    console.log('Test data answer correct! Trying with real input')
    shouldLog = false;
    console.log(run(data))
}