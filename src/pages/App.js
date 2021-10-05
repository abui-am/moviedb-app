import { useState } from 'react';
import { connect } from 'react-redux';
import { FILM_DATA } from './../redux/reducer/filmReducer';
import filmApi from '../api/film';
import './../../src/styles/App.css';
import Modal from '../components/Modal';
import InfiniteScroll from '../components/InfiniteScroll';

export function App({ film, dispatch }) {
  const { filmData } = film ?? {};

  // We dont need to pass keyword into redux,
  // this state mutate in high frequency we need to keep it local to prevent performance problem
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchByKeyword = async () => {
    setIsLoading(true);
    const { data } = await filmApi.search({ keyword, page: 1 });
    dispatch({ type: FILM_DATA, payload: data });
    setIsLoading(false);
  };

  const fetchNextPage = async (page) => {
    setIsLoading(true);
    const { data } = await filmApi.search({ keyword, page });
    dispatch({
      type: FILM_DATA,
      payload: { ...filmData, Search: [...filmData.Search, ...data.Search] },
    });
    setIsLoading(false);
  };
  return (
    <div className='App'>
      <main className='container'>
        <div className='d-flex center'>
          <input
            placeholder='Search movie here...'
            data-testid='search-box'
            onChange={(e) => setKeyword(e.target.value)}
          ></input>
          <button data-testid='search-button' onClick={() => fetchByKeyword()}>
            Search
          </button>
        </div>
        <section>
          <div>
            <h2>Search Result</h2>
          </div>
          {!!filmData?.Error ? (
            filmData.Error
          ) : filmData?.totalResults > 5 ? (
            <InfiniteScroll
              fetchNextPage={fetchNextPage}
              getNextStatus={(page) =>
                !isLoading &&
                // filmData?.Response === 'True' &&
                page < filmData?.totalResults
              }
            >
              {filmData?.Search.map(({ Title, Poster, Type, Year }) => {
                return (
                  <ListItem
                    key={Title}
                    title={Title}
                    type={Type}
                    year={Year}
                    imgUrl={Poster}
                  />
                );
              })}
            </InfiniteScroll>
          ) : (
            filmData?.Search.map(({ Title, Poster, Type, Year }) => {
              return (
                <ListItem
                  key={Title}
                  title={Title}
                  year={Year}
                  type={Type}
                  imgUrl={Poster}
                />
              );
            })
          )}
        </section>
      </main>
    </div>
  );
}

export const ListItem = ({ title, imgUrl, year, type }) => {
  return (
    <article>
      <div
        style={{
          padding: 24,
          borderRadius: 8,
          border: '1px solid #e3e3e3',
          marginBottom: 16,
        }}
        className='d-flex'
      >
        <Modal
          renderOpener={(open) => (
            <img
              src={imgUrl}
              alt={title}
              onClick={() => open()}
              style={{ width: 150 }}
            />
          )}
        >
          <img src={imgUrl} alt={title} />
        </Modal>
        <section style={{ marginLeft: 40 }}>
          <h2>{title}</h2>
          <p>Type : {type}</p>
          <p>Year : {year}</p>
          <div>
            <button>Show Detail</button>
          </div>
        </section>
      </div>
    </article>
  );
};

export default connect((state) => state)(App);
