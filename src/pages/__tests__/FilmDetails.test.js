import { render, screen, waitFor } from '@testing-library/react';
import { useParams } from 'react-router';
import filmApi from '../../api/film';
import { FilmDetails } from '../FilmDetails';

jest.mock('../../api/film', () => ({
  getById: () => ({
    data: {
      Search: [],
    },
  }),
  search: jest.fn(),
}));

jest.mock('react-router', () => ({
  useParams: () => ({
    id: 'tt0096895',
  }),

  useHistory: () => ({
    push: jest.fn(),
  }),
}));

const filmDetails = {
  Title: 'Batman',
  Year: '1989',
  Rated: 'PG-13',
  Released: '23 Jun 1989',
  Runtime: '126 min',
  Genre: 'Action, Adventure',
  Director: 'Tim Burton',
  Writer: 'Bob Kane, Sam Hamm, Warren Skaaren',
  Actors: 'Michael Keaton, Jack Nicholson, Kim Basinger',
  Plot: 'The Dark Knight of Gotham City begins his war on crime with his first major enemy being Jack Napier, a criminal who becomes the clownishly homicidal Joker.',
  Language: 'English, French, Spanish',
  Country: 'United States, United Kingdom',
  Awards: 'Won 1 Oscar. 9 wins & 26 nominations total',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg',
  Ratings: [
    {
      Source: 'Internet Movie Database',
      Value: '7.5/10',
    },
    {
      Source: 'Rotten Tomatoes',
      Value: '71%',
    },
    {
      Source: 'Metacritic',
      Value: '69/100',
    },
  ],
  Metascore: '69',
  imdbRating: '7.5',
  imdbVotes: '351,618',
  imdbID: 'tt0096895',
  Type: 'movie',
  DVD: '22 Aug 1997',
  BoxOffice: '$251,348,343',
  Production:
    'Warner Brothers, PolyGram Filmed Entertainment, Guber-Peters Company',
  Website: 'N/A',
  Response: 'True',
};

describe('FilmDetails', () => {
  it('should display the data', async () => {
    render(<FilmDetails film={{ filmDetails }} dispatch={jest.fn()} />);

    await waitFor(() => expect(screen.getByText(/Batman/)).toBeVisible(), 300);
    expect(screen.getByText('1989')).toBeVisible();
    expect(screen.getByText(/PG-13/)).toBeVisible();
    expect(screen.getByText(/23 Jun 1989/)).toBeVisible();
    expect(screen.getByText(/126 min/)).toBeVisible();
    expect(screen.getByText(/Action, Adventure/)).toBeVisible();
    expect(
      screen.getByText(/Bob Kane, Sam Hamm, Warren Skaaren/)
    ).toBeVisible();
    expect(screen.getByText(/Tim Burton/)).toBeVisible();
    expect(
      screen.getByText(/Michael Keaton, Jack Nicholson, Kim Basinger/)
    ).toBeVisible();
    expect(
      screen.getByText(
        /The Dark Knight of Gotham City begins his war on crime with his first major enemy being Jack Napier, a criminal who becomes the clownishly homicidal Joker./
      )
    ).toBeVisible();
    expect(screen.getByText(/English, French, Spanish/)).toBeVisible();
    expect(screen.getByText(/United States, United Kingdom/)).toBeVisible();
    expect(
      screen.getByText(/Won 1 Oscar. 9 wins & 26 nominations total/)
    ).toBeVisible();
    expect(screen.getByText(/Internet Movie Database/)).toBeVisible();
    expect(screen.getByText(/Rotten Tomatoes/)).toBeVisible();
    expect(
      screen.getByText(
        /Warner Brothers, PolyGram Filmed Entertainment, Guber-Peters Company/
      )
    ).toBeVisible();
    expect(screen.getByText(/Metacritic/)).toBeVisible();
    expect(screen.getByText('$251,348,343')).toBeVisible();
    expect(screen.getByAltText(/Batman/)).toHaveAttribute(
      'src',
      'https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg'
    );
  });

  it('should call param id for fetching', async () => {
    const dispatch = jest.fn();
    render(<FilmDetails dispatch={dispatch} />);

    await waitFor(
      () =>
        expect(dispatch).toBeCalledWith({
          type: 'FILM_DETAILS',
          payload: {
            Search: [],
          },
        }),

      2000
    );
  });
});
