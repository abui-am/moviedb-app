import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import filmApi from '../api/film';
import Image from '../components/Image';
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
    Released,
  } = filmDetails;
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { goBack } = useHistory();
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className='mb-md'>
          <button onClick={() => goBack()}>Back</button>
        </div>
        <div className='mb-md'>
          <div className='divider mb-md' />
        </div>
        <div>Loading...</div>
      </BasicLayout>
    );

  return (
    <BasicLayout>
      <div className='mb-md d-flex'>
        <button onClick={() => goBack()}>Back</button>
        <h6 className='ml-lg' style={{ alignSelf: 'center' }}>
          Film / Details / {Title}
        </h6>
      </div>
      <div className='mb-md'>
        <div className='divider mb-md' />
      </div>
      <div className='d-flex'>
        <div>
          <Image src={Poster} style={{ maxWidth: 300 }} alt={Title} />
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
            <div className='grid-2'>
              <div className='mb-sm'>Released</div>
              <div className='mb-sm'>{Released}</div>
              <div className='mb-sm'>Type:</div>
              <div className='mb-sm'>{Type}</div>
              <div className='mb-sm'>Genre:</div>
              <div className='mb-sm'>{Genre}</div>
              <div className='mb-sm'>Director:</div>
              <div className='mb-sm'>{Director}</div>
              <div className='mb-sm'>Writer:</div>
              <div className='mb-sm'>{Writer}</div>
              <div className='mb-sm'>Actors:</div>
              <div className='mb-sm'>{Actors}</div>
              <div className='mb-sm'>Language:</div>
              <div className='mb-sm'>{Language}</div>
              <div className='mb-sm'>Country:</div>
              <div className='mb-sm'>{Country}</div>
              <div className='mb-sm'>Awards:</div>
              <div className='mb-sm'>{Awards}</div>
              <div className='mb-sm'>Production:</div>
              <div className='mb-sm'>{Production}</div>
            </div>
          </section>
          <section id='rating' className='mb-sm'>
            <h5 className='mb-sm'>Ratings: </h5>
            <div className='-ml-sm d-flex wrap'>
              {Ratings.map(({ Source, Value }) => {
                return (
                  <div
                    key={Source}
                    className='d-flex col center border padding-md ml-sm'
                  >
                    <span>{Source}</span>
                    <h4>{Value}</h4>
                  </div>
                );
              })}
            </div>
          </section>
          <section id='gross'>
            <h5 className='mb-sm'>Gross: </h5>
            <div className='grid-2'>
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
