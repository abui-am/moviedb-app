import apiInstance from './axiosInstance';

const filmApi = {
  search: ({ keyword, page }) => {
    return apiInstance().get('', {
      params: {
        s: keyword,
        page: page,
      },
    });
  },
  getById: (id) => {
    return apiInstance().get('', {
      params: {
        i: id,
      },
    });
  },
};

export default filmApi;
