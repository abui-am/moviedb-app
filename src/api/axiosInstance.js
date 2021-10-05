import axios from 'axios';

function apiInstance() {
  return axios.create({
    baseURL: 'http://www.omdbapi.com',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      apikey: 'aecbedaf',
    },
  });
}

export default apiInstance;
