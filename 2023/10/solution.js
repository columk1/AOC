const fs = require('fs')
let input = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map((e) => (e = e.split('')))

let pipes = ['|', '-', 'L', 'J', '7', 'F']

let neighbors = [
  [-1, 0, 'N'],
  [1, 0, 'S'],
  [0, 1, 'E'],
  [0, -1, 'W'],
]

let map = {
  N: [-1, 0],
  S: [1, 0],
  E: [0, 1],
  W: [0, -1],
}

function getExit(symbol, entry) {
  switch (symbol) {
    case '|':
      if (entry === 'W' || entry === 'E') return null
      return entry === 'S' ? 'S' : 'N'
    case '-':
      if (entry === 'N' || entry === 'S') return null
      return entry === 'E' ? 'E' : 'W'
    case 'L':
      return entry === 'S' ? 'E' : 'N'
    case 'J':
      return entry === 'S' ? 'W' : 'N'
    case '7':
      return entry === 'E' ? 'S' : 'W'
    case 'F':
      return entry === 'W' ? 'S' : 'E'
  }
}

function part1(input) {
  rows: for (let i = 0; i < input.length; i++) {
    columns: for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === 'S') {
        start = [i, j]
        break rows
      }
    }
  }

  let [r, c] = start
  let direction
  let pipe
  let coords

  for (const [dr, dc, point] of neighbors) {
    const symbol = input[r + dr][c + dc]
    if (pipes.includes(symbol)) {
      if (!getExit(symbol, point)) continue
      pipe = symbol
      coords = [r + dr, c + dc]
      direction = point
      break
    }
  }

  let count = 1
  console.log({ direction, coords, pipe })
  while (pipe !== 'S') {
    let [row, column] = coords
    let exit = getExit(pipe, direction)
    let [dr, dc] = map[exit]
    coords = [row + dr, column + dc]
    pipe = input[coords[0]][coords[1]]
    direction = exit
    count++
  }
  return count / 2
}

console.log(part1(input))
