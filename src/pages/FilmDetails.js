import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import filmApi from '../api/film';
import BasicLayout from '../layouts/BasicLayout';
import { FILM_DETAILS } from '../redux/reducer/filmReducer';

export const FilmDetails = ({ film, dispatch }) => {
  const { filmDetails = {} } = film ?? {};
  const {
    Poster,
    Title,
    Year,
    Rated,
    Runtime,
    Ratings = [],
    Type,
    Genre,
    Director,
    Writer,
    Actors,
    Plot,
    Language,
    Country,
    Awards,
    Production,
    BoxOffice,
  } = filmDetails;
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { goBack } = useHistory();
  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setIsLoading(true);
    const { data } = await filmApi.getById(id);
    dispatch({ type: FILM_DETAILS, payload: data });
    setIsLoading(false);
  };

  if (isLoading)
    return (
      <BasicLayout>
        <div>Loading...</div>
      </BasicLayout>
    );

  return (
    <BasicLayout>
      <div className='mb-md'>
        <button onClick={() => goBack()}>Back</button>
      </div>
      <div className='mb-md'>
        <div className='divider mb-md' />
      </div>
      <div className='d-flex'>
        <div>
          <img src={Poster} style={{ maxWidth: 300 }} alt={Title} />
        </div>

        <section id='info' style={{ marginLeft: 40 }}>
          <div className='d-flex mb-sm'>
            <div>
              <h2 className='mb-sm'>{Title}</h2>
              <div className='d-flex'>
                <span>{Year}</span>
                <span className='ml-sm'>{Rated}</span>
                <span className='ml-sm'>{Runtime}</span>
              </div>
            </div>
          </div>
          <div id='plot' className='mb-sm'>
            {Plot}
          </div>
          <section id='info' className='mb-sm'>
            <h5 className='mb-sm'>Information: </h5>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, auto)',
                gridGap: 8,
              }}
            >
              <div>Type:</div>
              <div>{Type}</div>
              <div>Genre:</div>
              <div>{Genre}</div>
              <div>Director:</div>
              <div>{Director}</div>
              <div>Writer:</div>
              <div>{Writer}</div>
              <div>Actors:</div>
              <div>{Actors}</div>
              <div>Language:</div>
              <div>{Language}</div>
              <div>Country:</div>
              <div>{Country}</div>
              <div>Awards:</div>
              <div>{Awards}</div>
              <div>Production:</div>
              <div>{Production}</div>
            </div>
          </section>
          <section id='rating' className='mb-sm'>
            <h5 className='mb-sm'>Ratings: </h5>
            <div className='-ml-sm d-flex wrap'>
              {Ratings.map(({ Source, Value }) => {
                return (
                  <div className='d-flex col center border padding-md ml-sm'>
                    <span>{Source}</span>
                    <h4>{Value}</h4>
                  </div>
                );
              })}
            </div>
          </section>
          <section id='gross'>
            <h5 className='mb-sm'>Gross: </h5>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, auto)',
                gridGap: 8,
              }}
            >
              <div>Box Office:</div>
              <div>{BoxOffice ?? 'N/A'}</div>
            </div>
          </section>
        </section>
      </div>
    </BasicLayout>
  );
};

export default connect((state) => ({ film: state.film }))(FilmDetails);
