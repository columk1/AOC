const fs = require('fs');
const { StringDecoder } = require('string_decoder');
const input = fs.readFileSync('input.txt').toString().split("\n");

// Part One //

const isNumber = (string) => !isNaN(parseInt(string))

function getFirstNumber(string) {
  for (let i = 0; i < string.length; i++) {
    if (isNumber(string[i])) return string[i]
  }
}

function getLastNumber(string) {
  for (let i = string.length - 1; i >= 0; i--) {
    if (isNumber(string[i])) return string[i]
  }
}

function getValues(string) {
  return getFirstNumber(string) + getLastNumber(string)
}

function getAllValues(array) {
  return array.map(string => getValues(string))
}

let part1 = getAllValues(input).reduce((acc, curr) => acc + parseInt(curr), 0)

console.log(part1)

/* Second Puzzle */

let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

let convertNumber = (string) => {
  switch (string) {
    case 'one': return 1
    case 'two': return 2
    case 'three': return 3
    case 'four': return 4
    case 'five': return 5
    case 'six': return 6
    case 'seven': return 7
    case 'eight': return 8
    case 'nine': return 9
    default: return string
  }
}

function getFirst(string) {
  for (let i = 0; i < string.length; i++) {
    let newString = string.slice(i)
    for (let i = 0; i <= newString.length; i++) {
      let subString = newString.slice(0, i)
      if (numbers.includes(subString)) return (convertNumber(subString) % 10).toString()
    }
  }
}

function getLast(string) {
  for (let i = string.length; i >= 0; i--) {
    let newString = string.slice(i)
    for (let j = newString.length; j >= 0; j--) {
      let subString = newString.slice(0, j)
      if (numbers.includes(subString)) return (convertNumber(subString) % 10).toString()
    }
  }
}

function getBoth(string) {
  return getFirst(string) + getLast(string)
}

function getAll(array) {
  return array.map(string => getValues(string))
}

let part2 = getAll(input).reduce((acc, curr) => acc + parseInt(curr), 0)

console.log(result2)




