const fs = require('fs')
let input = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map((e) => (e = e.split('')))

const pipes = ['|', '-', 'L', 'J', '7', 'F', 'S']
const isPipe = (symbol) => pipes.includes(symbol)
let points = []

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
  points.push({ r: r, c: c, pipe: 'S' })
  let direction
  let pipe
  let coords

  for (const [dr, dc, point] of neighbors) {
    if (start[0] === 0 && dr === -1) continue
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
  while (pipe !== 'S') {
    let [r, c] = coords
    points.push({ r: r, c: c, pipe: pipe })
    let exit = getExit(pipe, direction)
    let [dr, dc] = map[exit]
    coords = [r + dr, c + dc]
    pipe = input[coords[0]][coords[1]]
    direction = exit
    count++
  }
  points.push(points[0])
  return count / 2
}

console.log(part1(input))

// Part Two

function joinPipes(xlGrid) {
  rows: for (let r = 0; r < xlGrid.length; r++) {
    columns: for (let c = 0; c < xlGrid[r].length; c++) {
      // Replace S with the correct pipe after seeing it in the terminal (lazy!)
      if (xlGrid[r][c] === 'S') xlGrid[r][c] = '7'
      let cur = xlGrid[r][c]
      if (isPipe(cur)) {
        let i = r
        let j = c
        if (cur === 'L' || cur === 'F' || cur === '-') {
          while (xlGrid[i]?.[j + 1] === '.') {
            j++
            xlGrid[i][j] = '-'
          }
          i = r
          j = c
        }
        if (cur === '|' || cur === 'F' || cur === '7') {
          while (xlGrid[i + 1]?.[j] === '.') {
            i++
            xlGrid[i][j] = '|'
          }
        }
      }
    }
  }
}

let xlGrid = new Array(input.length * 2)
  .fill('.')
  .map((e) => new Array(input[0].length * 2).fill('.'))
points.forEach(({ r, c, pipe }) => {
  xlGrid[r * 2][c * 2] = pipe
})

joinPipes(xlGrid)

// Add a buffer so the floodFill can get around the edges
xlGrid.unshift(new Array(xlGrid[0].length).fill('.'))
xlGrid.forEach((e) => e.unshift('.'))

function isValidCell(grid, r, c, symbol) {
  return r >= 0 && r < grid.length && c >= 0 && c < grid[r].length && grid[r][c] === symbol
}

function stackFill(grid, r, c, symbol) {
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]
  let stack = [{ r, c, symbol }]
  while (stack.length) {
    let curr = stack.pop()
    for (let i = 0; i < directions.length; i++) {
      let child = {
        r: curr.r + directions[i][0],
        c: curr.c + directions[i][1],
        symbol,
      }
      if (isValidCell(grid, child.r, child.c, child.symbol)) {
        grid[child.r][child.c] = 'O'
        stack.push(child)
      }
    }
  }
}

stackFill(xlGrid, 0, 0, '.')

function part2() {
  let count = 0
  let oldPath = new Array(input.length).fill('.').map((e) => new Array(input[0].length).fill('.'))
  points.forEach(({ r, c, pipe }) => {
    oldPath[r][c] = pipe
  })
  for (let r = 0; r < xlGrid.length; r++) {
    for (let c = 0; c < xlGrid[r].length; c++) {
      if (r % 2 && c % 2 && xlGrid[r][c] === '.') {
        let row = Math.floor(r / 2)
        let column = Math.floor(c / 2)
        if (oldPath[row][column] === '.') {
          count++
        }
      }
    }
  }
  return count
}
console.log(part2())

// Remove dots to make the shape look sweet in the terminal
for (let r = 0; r < xlGrid.length; r++) {
  for (let c = 0; c < xlGrid[r].length; c++) {
    if (xlGrid[r][c] === '.') xlGrid[r][c] = ' '
  }
}

console.log(xlGrid.map((e) => e.join('')).join('\n'))
