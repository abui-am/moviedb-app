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
};

export default filmApi;
