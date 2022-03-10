const { commentCounterFunc } = require('./modules/commentCounter.js');

const { countAllMovies } = require('./modules/movieCounter.js');

describe('Tests for comment counter function', () => {
  test('Should output of comment counter be', () => {
    const testObject = {
      user_name_1: 'it is nice movie',
      user_name_2: 'it is nice movie',
      user_name_3: 'it is nice movie',
      user_name_4: 'it is nice movie',
      user_name_5: 'it is nice movie',
      user_name_6: 'it is nice movie',
      user_name_7: 'it is nice movie',
    };

    const count = commentCounterFunc(testObject);

    expect(count).toBe(7);
  });

  test('Should output of comment counter be', () => {
    const testObject = {
      user_name_1: 'it is nice movie',
      user_name_2: 'it is nice movie',
      user_name_3: 'it is nice movie',
    };

    const count = commentCounterFunc(testObject);

    expect(count).toBe(3);
  });
});

describe('Test for the movies counter function', () => {
  test('Test that the movies list is not zero', () => {
    const movieNo = 0;
    const movieCount = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 90, 31];

    expect(countAllMovies(movieCount)).not.toBe(movieNo);
  });

  test('Test that the number of movies displayed is same as the number showd', () => {
    const mvCount = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 90, 31];
    const expectedMovies = 12;

    expect(countAllMovies(mvCount)).toBe(expectedMovies);
  });
});
