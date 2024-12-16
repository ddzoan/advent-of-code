import { MinPriorityQueue } from '@datastructures-js/priority-queue';
import { dirOffset, Grid, importFile, positionMove } from './utils/utils';

let shouldLog = true;
const clog = (...args) => shouldLog && console.log(...args);

const data = importFile(__filename).trim();
const testAnswer = 7036;
const testData = `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`
// const testAnswer = 7036;
// const testData = `#################
// #...#...#...#..E#
// #.#.#.#.#.#.#.#.#
// #.#.#.#...#...#.#
// #.#.#.#.###.#.#.#
// #...#.#.#.....#.#
// #.#.#.#.#.#####.#
// #.#...#.#.#.....#
// #.#.#####.#.###.#
// #.#.#.......#...#
// #.#.###.#####.###
// #.#.#...#.....#.#
// #.#.#.#####.###.#
// #.#.#.........#.#
// #.#.#.#########.#
// #S#.............#
// #################`

type Direction = 'N' | 'E' | 'S' | 'W';
const dirMap = {
    N: [-1, 0],
    S: [1, 0],
    W: [0, -1],
    E: [0, 1],
}

const serialize = ({ position: pos, direction: dir }) => `${pos[0]},${pos[1]},${dir}`

const run = (data) => {
    const grid = new Grid(data);
    const starting = grid.find('S');
    if (starting === null) {
        throw 'didnt find start';
    }

    const visited = new Set();
    const minPQ = new MinPriorityQueue((pos) => pos.points);
    minPQ.push({ position: [...starting], direction: 'E', points: 0 });
    minPQ.push({ position: [...starting], direction: 'W', points: 2000 });
    // console.log(minPQ)
    let currentPosition;
    while (!minPQ.isEmpty()) {
        currentPosition = minPQ.pop();
        clog(currentPosition)
        if(!visited.has(serialize(currentPosition)) && grid.get(currentPosition.position) !== '#') {
            visited.add(serialize(currentPosition));
    
            if (grid.get(currentPosition.position) === 'E') {
                return currentPosition.points;
            }
    
            const nextPositionInSameDir = positionMove(currentPosition.position, dirMap[currentPosition.direction]);
            const charAtNextPosition = grid.get(nextPositionInSameDir);
            if(currentPosition.position[0] === 13 && currentPosition.position[1] === 11) {
                clog('next in same dir', currentPosition, nextPositionInSameDir)
            }
            if (
                // !visited.has(serialize({ position: nextPositionInSameDir, direction: currentPosition.direction }))
                true
                && (charAtNextPosition === '.'
                    || charAtNextPosition === 'E')
            ) {
                if(currentPosition.position[0] === 13 && currentPosition.position[1] === 11) {
                    clog(currentPosition, nextPositionInSameDir)
                    clog('next turn',{
                        position: nextPositionInSameDir,
                        direction: currentPosition.direction,
                        points: currentPosition.points + 1
                    })
                }
                minPQ.push({
                    position: nextPositionInSameDir,
                    direction: currentPosition.direction,
                    points: currentPosition.points + 1
                });
            }
            const nextDirs = currentPosition.direction === 'N' || currentPosition.direction === 'S' ? ['E', 'W'] : ['N', 'S'];
            if(currentPosition.position[0] === 13 && currentPosition.position[1] === 11) {
                clog(nextDirs)
            }
            nextDirs
                .map(direction => ({ position: currentPosition.position, direction, points: currentPosition.points + 1000 }))
                // .filter(nextPosition => !visited.has(serialize(nextPosition)))
                .forEach(nextPos => {
                    if(currentPosition.position[0] === 13 && currentPosition.position[1] === 11) {
                        clog(currentPosition)
                        clog('next turn',nextPos)
                    }
                    minPQ.push(nextPos)
                });
        }

    }
    console.log("didn't find apparently")
}






const testRunResult = run(testData);
console.log(testRunResult);

if (testRunResult === testAnswer) {
    console.log('Test data answer correct! Trying with real input')
    shouldLog = false;
    console.log(run(data))
}