const fs = require('fs')
const { StringDecoder } = require('string_decoder')
let input = fs.readFileSync('input.txt').toString().split('\n\n')

for (let i = 1; i < input.length; i++) {
  input[i] = input[i].split('\n')
  input[i].shift()
  input[i] = input[i].map((item) => item.split(' '))
}

let seeds = input[0].match(/\d+/g).map(Number)
input.shift()
let maps = input.map((line) => line.map((item) => item.map(Number)))

function convert(seed, map) {
  console.log('seed: ' + seed)
  if (!map) return seed
  let result
  map.forEach((range) => {
    let difference = range[0] - range[1]
    if (seed > range[1] && seed < range[1] + range[2]) {
      result = seed + difference
    }
  })
  if (!result) result = seed
  return convert(result, maps[maps.indexOf(map) + 1])
}

function part1() {
  results = []
  seeds.forEach((seed) => {
    results.push(convert(seed, maps[0]))
  })
  console.log(results)
  return results.reduce((acc, curr) => (curr < acc ? curr : acc))
}

console.log(part1())
