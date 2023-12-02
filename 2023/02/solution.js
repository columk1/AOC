const fs = require('fs')
const { StringDecoder } = require('string_decoder')
const input = fs.readFileSync('input.txt').toString().split('\n')

// Part One //
const isValid = (string) => {
  if (
    string.match(/1[3-9] red|[2][0] red/) ||
    string.match(/1[4-9] green|[2][0] green/) ||
    string.match(/1[5-9] blue|[2][0] blue/)
  )
    return false
  return true
}
let part1 = 0

input.forEach((string, index) => {
  if (isValid(string)) part1 += index + 1
})

console.log(part1)

// Part Two //
