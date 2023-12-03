const fs = require('fs')
const { StringDecoder } = require('string_decoder')
let input = fs.readFileSync('input.txt').toString().split('\n')
input = input.map((line) => line.split(''))

let finder = new Array(140).fill().map(() => new Array(140).fill(0))
// let finder = new Array(10).fill().map(() => new Array(10).fill(0));

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
