const fs = require('fs')
let input = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map((e) => (e = e.split('')))

function isRowEmpty(image, row) {
  for (let i = 0; i < image[row].length; i++) {
    if (image[row][i] !== '.') return false
  }
  return true
}

function isColumnEmpty(image, column) {
  for (let i = 0; i < image.length; i++) {
    if (image[i][column] !== '.') return false
  }
  return true
}

// Params: {r: 0, c: 3}
function shortestPath(input, a, b, expansion) {
  let count = 0
  while (JSON.stringify(a) !== JSON.stringify(b)) {
    if (a.r < b.r) {
      count = isRowEmpty(input, a.r) ? count + expansion : count + 1
      a.r++
    } else if (a.r > b.r) {
      count = isRowEmpty(input, a.r) ? count + expansion : count + 1
      a.r--
    } else if (a.c < b.c) {
      count = isColumnEmpty(input, a.c) ? count + expansion : count + 1
      a.c++
    } else if (a.c > b.c) {
      count = isColumnEmpty(input, a.c) ? count + expansion : count + 1
      a.c--
    }
  }
  return count
}

function part1(input, expansion) {
  let image = JSON.parse(JSON.stringify(input))
  let galaxies = []
  let pairs = []
  let paths = []
  for (let r = 0; r < image.length; r++) {
    for (let c = 0; c < image[r].length; c++) {
      if (image[r][c] === '#') galaxies.push([r, c])
    }
  }
  galaxies.forEach((galaxy) =>
    galaxies.forEach((e) => {
      if (!pairs.includes([galaxy, e])) pairs.push([galaxy, e])
    })
  )
  pairs.forEach((pair) =>
    paths.push(
      shortestPath(
        image,
        { r: pair[0][0], c: pair[0][1] },
        { r: pair[1][0], c: pair[1][1] },
        expansion
      )
    )
  )
  return paths.reduce((a, b) => a + b, 0) / 2
}

console.log(part1(input, 2))

// Part Two

console.log(part1(input, 1000000))

// Unused expansion function to add rows and columns to the image

// function expand(input, amount = 1) {
//   let image = JSON.parse(JSON.stringify(input)) // Useful deep copy
//   rows: for (let r = 0; r < image.length; r++) {
//     if (isRowEmpty(image, r)) {
//       for (let i = 0; i < amount; i++) {
//         image.splice(r, 0, new Array(image[0].length).fill('.'))
//         r++
//       }
//     }
//   }
//   columns: for (let c = 0; c < image[0].length; c++) {
//     if (isColumnEmpty(image, c)) {
//       for (let i = 0; i < amount; i++) {
//         image.forEach((row, index) => image[index].splice(c, 0, '.'))
//         c++
//       }
//     }
//   }
//   return image
// }
