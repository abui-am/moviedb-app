import { useState } from 'react';
import { connect } from 'react-redux';
import { FILM_DATA } from './../redux/reducer/filmReducer';
import filmApi from '../api/film';
import './../../src/styles/App.css';
import Modal from '../components/Modal';
import InfiniteScroll from '../components/InifiniteScroll';

function App({ film, dispatch }) {
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
      <div className='d-flex'>
        <input onChange={(e) => setKeyword(e.target.value)}></input>
        <button onClick={() => fetchByKeyword()} />
      </div>
      <div>
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
            {filmData?.Search.map(({ Title, Poster }) => {
              return (
                <div key={Title}>
                  <Modal
                    renderOpener={(open) => (
                      <img src={Poster} alt={Title} onClick={() => open()} />
                    )}
                  >
                    <img src={Poster} alt={Title} />
                  </Modal>
                  <span>{Title}</span>
                </div>
              );
            })}
          </InfiniteScroll>
        ) : (
          filmData?.Search.map(({ Title, Poster }) => {
            return (
              <div key={Title}>
                <Modal
                  renderOpener={(open) => (
                    <img src={Poster} alt={Title} onClick={() => open()} />
                  )}
                >
                  <img src={Poster} alt={Title} />
                </Modal>

                <span>{Title}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default connect((state) => state)(App);
