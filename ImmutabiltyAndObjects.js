const {
  __,
  pipe,
  call,
  eithe,
  prop,
  map,
  equals,
  both,
  either,
  gte,
  lte,
  ifElse,
  inc,
  always,
  identity,
  when,
  unless,
} = require('ramda');

// 1

let wasBornInCountry = person => equals(person.birthCountry, OUR_COUNTRY);
let wasNaturalized = person => Boolean(person.naturalizationDate);
let isCitizen = person => either(wasBornInCountry, wasNaturalized)(person);
let isOver18 = person => gte(person.age, 18);
let isEligibleToVote = both(isOver18, isCitizen);

let OUR_COUNTRY = 'USA';
let person1 = {
  age: 10,
  birthCountry: 'SWZ',
  wasNaturalized: true,
  naturalizationDate: '2019-02-01',
};

let person2 = {
  age: 20,
  birthCountry: 'SWZ',
  wasNaturalized: true,
  naturalizationDate: '2019-02-01',
};

let person3 = {
  age: 17,
  birthCountry: 'USA',
};

let test = () => map(isEligibleToVote, [person1, person2, person3]);

console.log('1', test());

// 2 Completely point-free and declarative
wasBornInCountry = pipe(
  prop('birthCountry'),
  equals(OUR_COUNTRY)
);

isCitizen = either(wasBornInCountry, wasNaturalized);

wasNaturalized = pipe(
  prop('naturalizationDate'),
  Boolean
);

isOver18 = pipe(
  prop('age'),
  gte(__, 18)
);

console.log('2', test());
