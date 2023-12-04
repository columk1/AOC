const fs = require('fs')
const { StringDecoder } = require('string_decoder')
let input = fs.readFileSync('input.txt').toString().split('\n')
input = input.map((line) => line.split(''))

let finder = new Array(140).fill().map(() => new Array(140).fill(0))
// let finder = new Array(10).fill().map(() => new Array(10).fill(0))

input.forEach((line, lineIndex) => {
  line.forEach((char, charIndex) => {
    if (char.match(/[^.a-zA-Z0-9]/)) {
      finder[lineIndex - 1][charIndex - 1] = 1
      finder[lineIndex - 1][charIndex] = 1
      finder[lineIndex - 1][charIndex + 1] = 1
      finder[lineIndex][charIndex - 1] = 1
      finder[lineIndex][charIndex + 1] = 1
      finder[lineIndex + 1][charIndex - 1] = 1
      finder[lineIndex + 1][charIndex] = 1
      finder[lineIndex + 1][charIndex + 1] = 1
    }
  })
})

let parts = []

input.forEach((line, lineIndex) => {
  let validNumber = false
  let number = []
  line.forEach((char, charIndex) => {
    // If it's a number
    if (!isNaN(char)) {
      if (finder[lineIndex][charIndex]) {
        validNumber = true
      }
      number.push(char)
    }
    // If it's not a number or it's the last character in a line
    if (char.match(/[^a-zA-Z0-9]/) || charIndex === line.length - 1) {
      if (validNumber) {
        parts.push(number.join(''))
      }
      validNumber = false
      number = []
    }
  })
})

let part1 = parts.filter((e) => e !== '').reduce((acc, curr) => acc + parseInt(curr), 0)
console.log(part1)

// Part Two

finder = new Array(140).fill().map(() => new Array(140).fill(0))

let gearIndex = 1

input.forEach((line, lineIndex) => {
  line.forEach((char, charIndex) => {
    if (char === '*') {
      let gearCount = 0
      // Top row all numbers
      if (
        !isNaN(input[lineIndex - 1][charIndex - 1]) &&
        !isNaN(input[lineIndex - 1][charIndex]) &&
        !isNaN(input[lineIndex - 1][charIndex - 1])
      ) {
        gearCount++
      } else {
        // Top row corners have a number
        if (!isNaN(input[lineIndex - 1][charIndex - 1])) gearCount++
        if (!isNaN(input[lineIndex - 1][charIndex + 1])) gearCount++
      }
      // Number on either side of *
      if (!isNaN(input[lineIndex][charIndex - 1])) gearCount++
      if (!isNaN(input[lineIndex][charIndex + 1])) gearCount++
      // Bottom row all numbers
      if (
        !isNaN(input[lineIndex + 1][charIndex - 1]) &&
        !isNaN(input[lineIndex + 1][charIndex]) &&
        !isNaN(input[lineIndex + 1][charIndex - 1])
      ) {
        gearCount++
      } else {
        // Bottom row corners have a number
        if (!isNaN(input[lineIndex + 1][charIndex - 1])) gearCount++
        if (!isNaN(input[lineIndex + 1][charIndex + 1])) gearCount++
      }
      if (gearCount === 2) {
        finder[lineIndex - 1][charIndex - 1] = gearIndex
        finder[lineIndex - 1][charIndex] = gearIndex
        finder[lineIndex - 1][charIndex + 1] = gearIndex
        finder[lineIndex][charIndex - 1] = gearIndex
        finder[lineIndex][charIndex + 1] = gearIndex
        finder[lineIndex + 1][charIndex - 1] = gearIndex
        finder[lineIndex + 1][charIndex] = gearIndex
        finder[lineIndex + 1][charIndex + 1] = gearIndex
        gearIndex++
      }
    }
  })
})

let gears = {}

input.forEach((line, lineIndex) => {
  let gearNum
  let validNumber = false
  let number = []
  line.forEach((char, charIndex) => {
    // If it's a number
    if (!isNaN(char)) {
      if (finder[lineIndex][charIndex]) {
        gearNum = finder[lineIndex][charIndex]
        validNumber = true
      }
      number.push(char)
    }
    // If it's not a number or it's the last character in a line
    if (char.match(/[^a-zA-Z0-9]/) || charIndex === line.length - 1) {
      if (validNumber) {
        // gears.push([gearNum, parseInt(number.join(''))])
        gears[gearNum] = gears[gearNum] || []
        gears[gearNum].push(parseInt(number.join('')))
      }
      validNumber = false
      number = []
    }
  })
})

let gearRatios = []

Object.values(gears).forEach((gearRatio) => {
  gearRatios.push(gearRatio.reduce((acc, curr) => acc * curr, 1))
})

let part2 = gearRatios.reduce((acc, curr) => acc + curr, 0)
console.log(part2)
