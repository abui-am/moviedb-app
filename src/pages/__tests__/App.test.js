import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useHistory } from 'react-router';
import { App, ListItem, MemoizedList } from './../App';

jest.mock('../../api/film', () => ({
  search: jest.fn(),
}));

jest.mock('react-router', () => ({ useHistory: jest.fn() }));

describe('App Component', () => {
  it('render Search result', () => {
    render(<App />);
    const linkElement = screen.getByText(/Search Result/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('render infinite scroll when having 5+ data', () => {
    render(
      <App
        film={{
          filmData: {
            Search: [
              {
                Title: 'Batman Begins',
                Year: '2005',
                imdbID: 'tt0372784',
                Type: 'movie',
                Poster:
                  'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
              },
              {
                Title: 'Batman v Superman: Dawn of Justice',
                Year: '2016',
                imdbID: 'tt2975590',
                Type: 'movie',
                Poster:
                  'https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
              },
              {
                Title: 'Batman',
                Year: '1989',
                imdbID: 'tt0096895',
                Type: 'movie',
                Poster:
                  'https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg',
              },
              {
                Title: 'Batman Returns',
                Year: '1992',
                imdbID: 'tt0103776',
                Type: 'movie',
                Poster:
                  'https://m.media-amazon.com/images/M/MV5BOGZmYzVkMmItM2NiOS00MDI3LWI4ZWQtMTg0YWZkODRkMmViXkEyXkFqcGdeQXVyODY0NzcxNw@@._V1_SX300.jpg',
              },
              {
                Title: 'Batman Forever',
                Year: '1995',
                imdbID: 'tt0112462',
                Type: 'movie',
                Poster:
                  'https://m.media-amazon.com/images/M/MV5BNDdjYmFiYWEtYzBhZS00YTZkLWFlODgtY2I5MDE0NzZmMDljXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
              },
              {
                Title: 'Batman & Robin',
                Year: '1997',
                imdbID: 'tt0118688',
                Type: 'movie',
                Poster:
                  'https://m.media-amazon.com/images/M/MV5BMGQ5YTM1NmMtYmIxYy00N2VmLWJhZTYtN2EwYTY3MWFhOTczXkEyXkFqcGdeQXVyNTA2NTI0MTY@._V1_SX300.jpg',
              },
              {
                Title: 'The Lego Batman Movie',
                Year: '2017',
                imdbID: 'tt4116284',
                Type: 'movie',
                Poster:
                  'https://m.media-amazon.com/images/M/MV5BMTcyNTEyOTY0M15BMl5BanBnXkFtZTgwOTAyNzU3MDI@._V1_SX300.jpg',
              },
              {
                Title: 'Batman: The Animated Series',
                Year: '1992–1995',
                imdbID: 'tt0103359',
                Type: 'series',
                Poster:
                  'https://m.media-amazon.com/images/M/MV5BOTM3MTRkZjQtYjBkMy00YWE1LTkxOTQtNDQyNGY0YjYzNzAzXkEyXkFqcGdeQXVyOTgwMzk1MTA@._V1_SX300.jpg',
              },
            ],
            totalResults: 8,
          },
        }}
      />
    );
    expect(screen.getByText(/Batman Begins/)).toBeVisible();
    expect(screen.getByTestId('infinite-scroll')).toBeVisible();
  });

  it('should not render infinitescroll when having 5 data or less', () => {
    render(
      <App
        film={{
          filmData: {
            Search: [
              {
                Title: 'Batman Begins',
                Year: '2005',
                imdbID: 'tt0372784',
                Type: 'movie',
                Poster:
                  'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
              },
              {
                Title: 'Batman v Superman: Dawn of Justice',
                Year: '2016',
                imdbID: 'tt2975590',
                Type: 'movie',
                Poster:
                  'https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
              },
              {
                Title: 'Batman',
                Year: '1989',
                imdbID: 'tt0096895',
                Type: 'movie',
                Poster:
                  'https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg',
              },
              {
                Title: 'Batman Returns',
                Year: '1992',
                imdbID: 'tt0103776',
                Type: 'movie',
                Poster:
                  'https://m.media-amazon.com/images/M/MV5BOGZmYzVkMmItM2NiOS00MDI3LWI4ZWQtMTg0YWZkODRkMmViXkEyXkFqcGdeQXVyODY0NzcxNw@@._V1_SX300.jpg',
              },
              {
                Title: 'Batman Forever',
                Year: '1995',
                imdbID: 'tt0112462',
                Type: 'movie',
                Poster:
                  'https://m.media-amazon.com/images/M/MV5BNDdjYmFiYWEtYzBhZS00YTZkLWFlODgtY2I5MDE0NzZmMDljXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
              },
            ],
            totalResults: 5,
          },
        }}
      />
    );

    expect(screen.queryAllByTestId('infinite-scroll').length).toBe(0);
    expect(
      screen.getByText(/Batman v Superman: Dawn of Justice/)
    ).toBeVisible();
  });
});

describe('MemoizedList', () => {
  it('should render Loading... if loading', () => {
    render(<MemoizedList isLoading />);

    screen.getByText('Loading...');
  });

  it('should render error if error', () => {
    render(
      <MemoizedList
        filmData={{
          Response: 'False',
          Error: 'This is error message',
        }}
      />
    );

    screen.getByText('This is error message');
  });
});

describe('ListItem', () => {
  it('should render given title, type, year, and image', async () => {
    render(
      <ListItem
        type={'Movie'}
        title={'React Testing In Nutshell'}
        year={'2021'}
        imgUrl={
          'https://m.media-amazon.com/images/M/MV5BMTkwMjM4MTcwOF5BMl5BanBnXkFtZTgwOTMyMTM2MTE@._V1_SX300.jpg'
        }
      />
    );

    expect(screen.getByText(/Movie/)).toBeVisible();
    expect(screen.getByText(/React Testing In Nutshell/)).toBeVisible();
    expect(screen.getByText(/2021/)).toBeVisible();
    await waitFor(() =>
      expect(screen.getByAltText('React Testing In Nutshell')).toHaveAttribute(
        'src',
        'https://m.media-amazon.com/images/M/MV5BMTkwMjM4MTcwOF5BMl5BanBnXkFtZTgwOTMyMTM2MTE@._V1_SX300.jpg'
      )
    );
  }, 4000);

  it('Show Movie Poster in a popup modal window when image from the list is clicked', async () => {
    render(
      <>
        <div id='modal'></div>
        <ListItem
          type={'Movie'}
          title={'React Testing In Nutshell'}
          year={'2021'}
          imgUrl={
            'https://m.media-amazon.com/images/M/MV5BMTkwMjM4MTcwOF5BMl5BanBnXkFtZTgwOTMyMTM2MTE@._V1_SX300.jpg'
          }
        />
      </>
    );

    await waitFor(() =>
      fireEvent.click(screen.getByAltText('React Testing In Nutshell'))
    );
    expect(
      screen.getByAltText(`Modal React Testing In Nutshell`)
    ).toBeVisible();
  });

  it('should go to film/:id when clicking show details', () => {
    const push = jest.fn();
    useHistory.mockImplementation(() => ({
      push: push,
    }));
    render(
      <>
        <div id='modal'></div>
        <ListItem
          type={'Movie'}
          title={'React Testing In Nutshell'}
          year={'2021'}
          imgUrl={
            'https://m.media-amazon.com/images/M/MV5BMTkwMjM4MTcwOF5BMl5BanBnXkFtZTgwOTMyMTM2MTE@._V1_SX300.jpg'
          }
          id={'tt0096895'}
        />
      </>
    );

    fireEvent.click(screen.getByText(/Show Details/));
    expect(push).toBeCalledWith(`/film/tt0096895`);
  });
});
