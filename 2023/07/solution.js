const fs = require('fs')
let jack = 'C'
let input = fs
  .readFileSync('input.txt')
  .toString()
  .replaceAll('T', 'B')
  .replaceAll('J', jack)
  .replaceAll('Q', 'D')
  .replaceAll('A', 'Z')
  .split('\n')
  .map((x) => x.split(' '))

function getStrength(hand) {
  let cards = hand.split('')
  if (cards.every((e) => e === cards[0])) return 7
  if (hand.match(/([a-zA-Z0-9]).*\1.*\1.*\1/)) return 6
  let threePair = hand.match(/([a-zA-Z0-9]).*\1.*\1/)
  if (threePair) {
    return cards.filter((e) => e !== threePair[1]).every((e, i, a) => e === a[0]) ? 5 : 4
  } else {
    let pair = hand.match(/([a-zA-Z0-9]).*\1/)
    if (pair) {
      return cards
        .filter((e) => e !== pair[1])
        .toString()
        .match(/([a-zA-Z0-9]).*\1/)
        ? 3
        : 2
    }
    return 1
  }
}

function sort(input) {
  return input.sort((a, b) => {
    if (a[2] > b[2]) return 1
    if (a[2] < b[2]) return -1
    if (a[2] === b[2]) {
      for (let i = 0; i < a[0].length; i++) {
        if (a[0][i] > b[0][i]) return 1
        if (a[0][i] < b[0][i]) return -1
      }
    }
  })
}

function part1() {
  input.forEach((player) => {
    player.push(getStrength(player[0]))
  })
  sort(input)
  return input.reduce((acc, curr, i) => acc + curr[1] * (i + 1), 0)
}

console.log(part1())

// Part 2

function getMode(arr) {
  let copy = [...arr]
  return copy
    .filter((e) => e !== jack)
    .sort((a, b) => copy.filter((v) => v === a).length - copy.filter((v) => v === b).length)
    .pop()
}

function getStrengthB(hand) {
  let cards = hand.split('')
  let mode = getMode(cards)
  hand = hand.replaceAll(jack, mode)
  getStrength(hand)
}

function part2() {
  input.forEach((player) => {
    player.push(getStrengthB(player[0]))
    player[0] = player[0].replaceAll(jack, '1')
  })
  sort(input)
  return input.reduce((acc, curr, i) => acc + curr[1] * (i + 1), 0)
}

console.log(part2())
