const fs = require('fs')
let input = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map((line) => line.match(/(\d+)/g).map(Number))

let time = input[0]
let distance = input[1]

function getWins(time, record) {
  let wins = 1
  for (let speed = 2; speed < time; speed++) {
    let distance = (time - speed) * speed
    if (distance > record) wins = time - (speed * 2 + 1)
  }
  return wins * -1
}

function part1() {
  let part1 = 1
  time.forEach((time, index) => {
    part1 *= getWins(time, distance[index])
  })
  return part1
}

console.log(part1())

// Part Two

time = +time.reduce((acc, curr) => acc + curr, '')
distance = +distance.reduce((acc, curr) => acc + curr, '')

console.log(getWins(time, distance))
