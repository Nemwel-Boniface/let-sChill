const { commentCounterFunc } = require('./modules/commentCounter.js');

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
