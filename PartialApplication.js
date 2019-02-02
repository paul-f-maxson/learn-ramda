const { filter, map, partialRight, curry, __, pipe } = require('ramda');

let publishedInYear;

let titlesForYear;

let test;

publishedInYear = (book, year) => book.year === year;

// 1
titlesForYear = (books, year) => {
  const selected = filter(book => publishedInYear(book, year), books);

  return map(book => book.title, selected);
};

test = () =>
  titlesForYear(
    [
      { title: 'one', year: 1 },
      { title: 'uno', year: 1 },
      { title: 'deux', year: 2 },
    ],
    1
  );

console.log('1', test());

// 2
publishedInYear = year => book => book.year === year;

titlesForYear = (books, year) => {
  const selected = filter(publishedInYear(year), books);

  return map(book => book.title, selected);
};

console.log('2', test());

// 3
publishedInYear = (book, year) => book.year === year;

titlesForYear = (books, year) => {
  const selected = filter(partialRight(publishedInYear, [year]), books);

  return map(book => book.title, selected);
};

console.log('3', test());

// 4
publishedInYear = curry((year, book) => book.year === year);

titlesForYear = (books, year) => {
  const selected = filter(publishedInYear(year), books);

  return map(book => book.title, selected);
};

console.log('4', test());

// 5
publishedInYear = curry((book, year) => book.year === year);

titlesForYear = (books, year) => {
  const selected = filter(publishedInYear(__, year), books);

  return map(book => book.title, selected);
};

console.log('5', test());

// 6
publishedInYear = curry((year, book) => book.year === year);

titlesForYear = (books, year) => {
  const selected = filter(publishedInYear(year), books);

  return map(book => book.title, selected);
};

console.log('6', test());

// 7
publishedInYear = curry((year, book) => book.year === year);

titlesForYear = (books, year) =>
  pipe(
    filter(publishedInYear(year)),
    map(book => book.title)
  )(books);

console.log('7', test());
