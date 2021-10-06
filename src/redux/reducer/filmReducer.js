export const FILM_DETAILS = 'FILM_DETAILS';
export const FILM_DATA = 'FILM_DATA';
export const KEYWORD = 'KEYWORD';

const INITIAL_STATE = {
  filmData: {
    Search: [],
    totalResults: 0,
    Response: 'true',
  },
  keyword: '',
  filmDetails: {},
};

const filmReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FILM_DATA:
      return {
        ...state,
        filmData: action.payload,
      };

    case KEYWORD:
      return {
        ...state,
        keyword: action.payload,
      };

    case FILM_DETAILS:
      return {
        ...state,
        filmDetails: action.payload,
      };

    default:
      return state;
  }
};

export default filmReducer;
