const {
  __,
  pipe,
  either,
  both,
  gte,
  lte,
  ifElse,
  inc,
  always,
  identity,
  when,
  unless,
} = require('ramda');

let test;

// ARITHMETIC

// 1
let multiply = (a, b) => a * b;
let addOne = x => x + 1;
let square = x => x * x;

let operate = pipe(
  multiply,
  addOne,
  square
);

test = () => operate(3, 4); // => ((3 * 4) + 1)^2 => (12 + 1)^2 => 13^2 => 169

console.log('1', test());

// 2 Real Ramda way
square = x => multiply(x, x);

operate = pipe(
  multiply,
  inc,
  square
);

console.log('2', test());

// COMPARISON

// 3
let wasBornInCountry = person => person.birthCountry === OUR_COUNTRY;
let wasNaturalized = person => Boolean(person.naturalizationDate);
let isOver18 = person => person.age >= 18;

let isCitizen = either(wasBornInCountry, wasNaturalized);

let isEligibleToVote = both(isOver18, isCitizen);

let OUR_COUNTRY = 'USA';
let person = {
  age: 10,
  birthCountry: 'SWZ',
  wasNaturalized: true,
  naturalizationDate: '2019-02-01',
};

test = () => isEligibleToVote(person);

console.log('3', test());

// 4
wasBornInCountry = person => equals(person.birthCountry, OUR_COUNTRY);
wasNaturalized = person => Boolean(person.naturalizationDate);
isOver18 = person => gte(person.age, 18);

console.log('4', test());

// CONDITIONALS

// 5
let forever21 = age => (age >= 21 ? 21 : age + 1);

test = () => forever21(forever21(forever21(19)));

console.log('5', test());

// 6
forever21 = ifElse(gte(__, 21), always(21), inc);

console.log('6', test());

// 7
alwaysDrivingAge = ifElse(lte(16), x => x, always(16));

test = () => alwaysDrivingAge(12);

console.log('7', test());

// 8
alwaysDrivingAge = ifElse(lte(16), identity, always(16));

console.log('8', test());

test = () => alwaysDrivingAge(16);
console.log('8', test());

test = () => alwaysDrivingAge(67);
console.log('8', test());

// 9
alwaysDrivingAge = unless(gte(__, 16), always(16));

test = () => alwaysDrivingAge(12);
console.log('9', test());

test = () => alwaysDrivingAge(16);
console.log('9', test());

test = () => alwaysDrivingAge(67);
console.log('9', test());
