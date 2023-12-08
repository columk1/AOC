const fs = require('fs')
let input = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .filter((e) => e !== '')

const route = input.shift().split('')
const tree = {}

input.forEach((line) => {
  let values = line.match(/[A-Z]+/g)
  const key = values[0]
  tree[key] = [values[1], values[2]]
})

const L = (key) => tree[key][0]
const R = (key) => tree[key][1]

function part1() {
  let count = 0
  let node = 'AAA'
  while (node !== 'ZZZ') {
    route.forEach((direction) => {
      node = direction === 'L' ? L(node) : R(node)
      count++
    })
  }
  return count
}

console.log(part1())
