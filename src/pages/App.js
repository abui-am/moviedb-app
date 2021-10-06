import { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { FILM_DATA, KEYWORD } from './../redux/reducer/filmReducer';
import filmApi from '../api/film';
import Modal from '../components/Modal';
import InfiniteScroll from '../components/InfiniteScroll';
import { useHistory } from 'react-router';
import BasicLayout from '../layouts/BasicLayout';
import SearchMovie from '../components/SearchMovie';
import Image from '../components/Image';

export function App({ film, dispatch }) {
  const { filmData, keyword } = film ?? {};
  const [isLoading, setIsLoading] = useState(false);

  const fetchNextPage = async (page) => {
    setIsLoading(true);
    const { data } = await filmApi.search({ keyword, page });
    dispatch({
      type: FILM_DATA,
      payload: {
        ...filmData,
        Search: [...filmData.Search, ...(data?.Search ?? [])],
      },
    });
    setIsLoading(false);
  };

  const getNextStatus = (page) => {
    return (
      !isLoading &&
      // filmData?.Response === 'True' &&
      page * 10 < filmData?.totalResults
    );
  };

  const history = useHistory();

  return (
    <BasicLayout>
      <div
        style={{
          height: 500,
          position: 'absolute',
          width: '100%',
          zIndex: -1,
          left: 0,
          top: 0,
          backgroundColor: 'var(--background-secondary)',
        }}
      />
      <div className='d-flex mb-md center'>
        <h3 className='mb-sm'>Search Movie</h3>
      </div>
      <section id='search' className='d-flex center mb-md'>
        <div className='mb-sm' style={{ width: '100%' }}>
          <SearchMovie
            onInputChange={(e, action) => {
              if (
                action.action !== 'set-value' &&
                action.action !== 'menu-close' &&
                action.action !== 'input-blur'
              ) {
                dispatch({ type: KEYWORD, payload: e });
              }
            }}
            inputValue={keyword}
            onChange={(select) => {
              history.push('/film/' + select?.value);
            }}
            onSearch={(data, keyword) => {
              dispatch({ type: KEYWORD, payload: keyword });
              dispatch({ type: FILM_DATA, payload: data });
            }}
          />
        </div>
      </section>
      <div className='mb-md'>
        <div className='divider mb-md' />
      </div>
      <section id='list'>
        <div
          className='mb-md d-flex'
          style={{ justifyContent: 'space-between' }}
        >
          <h5>Search Result</h5>
          <span>
            {filmData?.totalResults ?? 0} result found for "{keyword}"
          </span>
        </div>
        <MemoizedList
          filmData={filmData}
          getNextStatus={getNextStatus}
          fetchNextPage={fetchNextPage}
          isLoading={isLoading}
        />
      </section>
    </BasicLayout>
  );
}

export const MemoizedList = ({
  filmData = {},
  getNextStatus,
  fetchNextPage,
  isLoading,
}) => {
  const { Search = [], Error: err, totalResults } = filmData ?? {};
  return useMemo(() => {
    if (isLoading && Search.length === 0) return <div>Loading...</div>;

    if (!!err) return <div>{err}</div>;
    return (
      <>
        {totalResults > 5 ? (
          <InfiniteScroll
            fetchNextPage={fetchNextPage}
            getNextStatus={getNextStatus}
          >
            {Search?.map(({ Title, Poster, Type, Year, imdbID }) => {
              return (
                <ListItem
                  id={imdbID}
                  key={imdbID}
                  title={Title}
                  type={Type}
                  year={Year}
                  imgUrl={Poster}
                />
              );
            }) ?? <div />}
          </InfiniteScroll>
        ) : (
          Search?.map(({ Title, Poster, Type, Year, imdbID }) => {
            return (
              <ListItem
                id={imdbID}
                key={imdbID}
                title={Title}
                year={Year}
                type={Type}
                imgUrl={Poster}
              />
            );
          }) ?? <div />
        )}
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, filmData]);
};

export const ListItem = ({ title, imgUrl, year, type, id }) => {
  const history = useHistory();

  return (
    <article>
      <div
        style={{
          padding: 24,
          borderRadius: 8,
          border: '1px solid #e3e3e3',
          marginBottom: 16,
          backgroundColor: 'white',
        }}
        className='d-flex'
      >
        <Modal
          renderOpener={(open) => (
            <Image
              src={imgUrl}
              alt={title}
              onClick={() => open()}
              style={{ width: 150 }}
            />
          )}
        >
          <div
            style={{
              width: '100vw',
              maxWidth: 568,
            }}
          ></div>
          <Image width='100%' src={imgUrl} alt={`Modal ${title}`} />
        </Modal>
        <section className='ml-lg'>
          <h5 className='mb-sm'>{title}</h5>
          <p className='mb-sm'>Type : {type}</p>
          <p className='mb-sm'>Year : {year}</p>
          <div>
            <button onClick={() => history.push(`/film/${id}`)}>
              Show Details
            </button>
          </div>
        </section>
      </div>
    </article>
  );
};

export default connect((state) => state)(App);
