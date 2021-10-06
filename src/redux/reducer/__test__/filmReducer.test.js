import filmReducer, { FILM_DATA } from '../filmReducer';

describe('filmReducer', () => {
  it('should return the initial state', () => {
    expect(filmReducer(undefined, {})).toEqual({
      filmData: {
        Search: [],
        totalResults: 0,
        Response: 'true',
      },
      filmDetails: {},
      keyword: '',
    });
  });

  it('should handle FILM_DATA', () => {
    const filmAction = {
      type: FILM_DATA,
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(filmReducer({}, filmAction)).toEqual({});
  });

  it('should handle FILM_DATA with value', () => {
    const filmActionWithValue = {
      type: FILM_DATA,
      payload: {
        Search: ['Anything'],
        totalResults: 0,
        Response: 'true',
      },
    };
    expect(filmReducer({}, filmActionWithValue)).toEqual({
      filmData: {
        Search: ['Anything'],
        totalResults: 0,
        Response: 'true',
      },
    });
  });
});
