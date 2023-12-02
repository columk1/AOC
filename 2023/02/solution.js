const fs = require('fs')
const { StringDecoder } = require('string_decoder')
const input = fs.readFileSync('input.txt').toString().split('\n')

// Part One
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

// Part Two

input = input.map((line) => line.split(/: |, |; /))

function getPower(game) {
  let [red, green, blue] = [1, 1, 1]

  game.forEach((str) => {
    let currentVal = str[0] + str[1]
    if (str.endsWith('red') && currentVal > red) {
      red = parseInt(currentVal)
    } else if (str.endsWith('green') && currentVal > green) {
      green = parseInt(currentVal)
    } else if (str.endsWith('blue') && currentVal > blue) {
      blue = parseInt(currentVal)
    }
  })
  return red * green * blue
}
let part2 = input.reduce((acc, curr) => acc + getPower(curr), 0)

console.log(part2)
