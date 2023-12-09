const fs = require('fs')
let input = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map((e) => (e = e.split(' ')).map(Number))

function getNext(arr, diffs = []) {
  diffs.push(arr[arr.length - 1])
  let nextSeq = []
  for (let i = 1; i < arr.length; i++) {
    let increment = arr[i] - arr[i - 1]
    nextSeq.push(increment)
  }
  if (nextSeq.every((e) => e === 0)) return diffs.reduce((a, b) => a + b)
  return getNext(nextSeq, diffs)
}

function part1(input) {
  let result = []
  input.forEach((e) => result.push(getNext(e)))
  return result.reduce((a, b) => a + b)
}

console.log(part1(input))

// Part Two

function getPrevious(arr, diffs = []) {
  diffs.unshift(arr[0])
  let nextSeq = []
  for (let i = 1; i < arr.length; i++) {
    let increment = arr[i] - arr[i - 1]
    nextSeq.push(increment)
  }
  if (nextSeq.every((e) => e === 0)) return diffs.reduce((a, b) => b - a)
  return getPrevious(nextSeq, diffs)
}

function part2(input) {
  let result = []
  input.forEach((e) => result.push(getPrevious(e)))
  return result.reduce((a, b) => a + b)
}

console.log(part2(input))
