const fs = require('fs')
let input = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .filter((e) => e !== '')

const route = input.shift().split('')
const tree = {}

input.forEach((line) => {
  let values = line.match(/[A-Z0-9]+/g)
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

function getCounts() {
  let counts = []
  let nodes = Object.keys(tree).filter((key) => key.indexOf('A') === 2 || key === 'AAA')
  nodes.forEach((node, i) => {
    let count = 0
    while (!(node[2] === 'Z'))
      route.forEach((direction) => {
        node = direction === 'R' ? R(node) : L(node)
        count++
        if (node[2] === 'Z') {
          counts.push(count)
        }
      })
  })
  return counts
}

const gcd = (a, b) => {
  if (b === 0) return a
  return gcd(b, a % b)
}

const lcm = (a, b) => {
  return (a * b) / gcd(a, b)
}

function part2() {
  let arr = getCounts()
  return arr.reduce((acc, curr) => lcm(acc, curr), 1)
}

console.log(part1())
console.log(part2())
