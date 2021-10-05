export const FILM_DATA = 'FILM_DATA';

const INITIAL_STATE = {
  filmData: {
    Search: [],
    totalResults: 0,
    Response: 'true',
  },
};

const filmReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FILM_DATA:
      return {
        ...state,
        filmData: action.payload,
      };

    default:
      return state;
  }
};

export default filmReducer;
