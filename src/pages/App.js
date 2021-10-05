import { createRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FILM_DATA } from './../redux/reducer/filmReducer';
import filmApi from '../api/film';
import './../../src/styles/App.css';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

function App({ film, dispatch }) {
  const { filmData } = film ?? {};
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

    const newSearch = [...filmData.Search, ...data.Search];
    dispatch({
      type: FILM_DATA,
      payload: { ...filmData, Search: newSearch },
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
                  <img src={Poster} alt={Title} />
                  <span>{Title}</span>
                </div>
              );
            })}
          </InfiniteScroll>
        ) : (
          filmData?.Search.map(({ Title, Poster }) => {
            return (
              <div key={Title}>
                <img src={Poster} alt={Title} />
                <span>{Title}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

const InfiniteScroll = ({ fetchNextPage, getNextStatus, children }) => {
  const targetRef = createRef();

  const [page, setPage] = useState(1);

  const onIntersect = async () => {
    await fetchNextPage(page + 1);
    setPage((page) => page + 1);
  };
  useIntersectionObserver({
    target: targetRef,
    onIntersect: onIntersect,
    enabled: getNextStatus(page),
  });

  return (
    <div>
      {children}
      {children && (
        <div ref={targetRef} style={{ height: 200 }}>
          Loading...
        </div>
      )}
    </div>
  );
};

export default connect((state) => state)(App);
