const fs = require('fs')
let input = fs
  .readFileSync('testData.txt')
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
      if (entry !== 'N' && entry !== 'S') return null
      return entry === 'S' ? 'S' : 'N'
    case '-':
      if (entry !== 'E' && entry !== 'W') return null
      return entry === 'E' ? 'E' : 'W'
    case 'L':
      if (entry !== 'S' && entry !== 'W') return null
      return entry === 'S' ? 'E' : 'N'
    case 'J':
      if (entry !== 'S' && entry !== 'E') return null
      return entry === 'S' ? 'W' : 'N'
    case '7':
      if (entry !== 'E' && entry !== 'N') return null
      return entry === 'E' ? 'S' : 'W'
    case 'F':
      if (entry !== 'N' && entry !== 'W') return null
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
    if (start[0] === 0 && dr === -1) continue
    const symbol = input[r + dr][c + dc]
    console.log(symbol, point)
    if (pipes.includes(symbol)) {
      if (!getExit(symbol, point)) continue
      pipe = symbol
      coords = [r + dr, c + dc]
      direction = point
      break
    }
  }

  let count = 1
  while (pipe !== 'S') {
    console.log({ pipe, coords, direction })
    let [r, c] = coords
    input[r][c] = 'X'
    let exit = getExit(pipe, direction)
    let [dr, dc] = map[exit]
    coords = [r + dr, c + dc]
    pipe = input[coords[0]][coords[1]]
    direction = exit
    count++
  }
  return count / 2
}

console.log(part1(input))

// Part Two

console.log(input.flat())
