const fs = require('fs')
let input = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map((e) => (e = e.split('')))

function isRowEmpty(input, row) {
  for (let i = 0; i < input[row].length; i++) {
    if (input[row][i] !== '.') return false
  }
  return true
}

function isColumnEmpty(input, column) {
  for (let i = 0; i < input.length; i++) {
    if (input[i][column] !== '.') return false
  }
  return true
}

function expand(input) {
  rows: for (let r = 0; r < input.length; r++) {
    if (isRowEmpty(input, r)) {
      input.splice(r, 0, new Array(input[0].length).fill('.'))
      r++
    }
  }
  columns: for (let c = 0; c < input[0].length; c++) {
    if (isColumnEmpty(input, c)) {
      input.forEach((row, index) => input[index].splice(c, 0, '.'))
      c++
    }
  }
  return input
}

// Params: {r: 0, c: 3}
function shortestPath(a, b) {
  let count = 0
  while (JSON.stringify(a) !== JSON.stringify(b)) {
    if (a.r < b.r) {
      a.r++
      count++
    } else if (a.r > b.r) {
      a.r--
      count++
    } else if (a.c < b.c) {
      a.c++
      count++
    } else if (a.c > b.c) {
      a.c--
      count++
    }
  }
  return count
}

function part1(input) {
  let expanded = expand(input)
  let galaxies = []
  let pairs = []
  let paths = []
  for (let r = 0; r < expanded.length; r++) {
    for (let c = 0; c < expanded[r].length; c++) {
      if (expanded[r][c] === '#') galaxies.push([r, c])
    }
  }
  galaxies.forEach((galaxy) =>
    galaxies.forEach((e) => {
      if (!pairs.includes([galaxy, e])) pairs.push([galaxy, e])
    })
  )
  pairs.forEach((pair) =>
    paths.push(shortestPath({ r: pair[0][0], c: pair[0][1] }, { r: pair[1][0], c: pair[1][1] }))
  )
  return paths.reduce((a, b) => a + b, 0) / 2
}

console.log(part1(input))

// Part Two
