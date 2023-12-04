const fs = require('fs')
const { StringDecoder } = require('string_decoder')
let input = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map((line) => line.split('|'))
input = input.map((line) => [line[0].slice(7), line[1]].map((card) => card.split(' ')))
input = input.map((line) => line.map((card) => card.filter((item) => item != 0)))

let part1 = 0

input.forEach((card) => {
  let points = 0
  card[1].forEach((number) => {
    if (card[0].includes(number)) {
      points = points ? points * 2 : 1
    }
  })
  part1 += points
})

console.log(part1)

// Part Two

let part2 = 0
let cardCounts = {}

for (let i = 0; i < input.length; i++) {
  cardCounts[i] = 1
}

input.forEach((card, i) => {
  cardCounts[i]
  while (cardCounts[i] > 0) {
    let nextCardIndex = i + 1
    card[1].forEach((number) => {
      if (card[0].includes(number)) {
        cardCounts[nextCardIndex]++
        nextCardIndex++
      }
    })
    cardCounts[i]--
    part2++
  }
})

console.log(part2)
