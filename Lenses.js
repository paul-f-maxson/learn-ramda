const {
  lensPath,
  lensProp,
  view,
  set,
  map,
  over,
  pipe,
  toUpper,
} = require('ramda');

// 1
let nameLens = lensProp('name');
let twitterLens = lensPath(['socialMedia', 'twitter']);

let person = {
  name: 'Randy',
  socialMedia: {
    github: 'randycoulman',
    twitter: '@randycoulman',
  },
};

let test = () =>
  map(f => f(person), [
    view(nameLens),
    pipe(
      set(twitterLens, '@randy'),
      view(twitterLens)
    ),
    pipe(
      over(nameLens, toUpper),
      view(nameLens)
    ),
  ]);

console.log('1', test());
