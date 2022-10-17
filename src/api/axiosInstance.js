import axios from 'axios';

function apiInstance() {
  return axios.create({
    baseURL: 'https://www.omdbapi.com',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      apikey: process.env.REACT_APP_OMBAPIKEY,
    },
  });
}

export default apiInstance;
