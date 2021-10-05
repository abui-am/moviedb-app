import filmApi from '../film';

jest.mock('../film', () => ({
  search: jest.fn(),
}));

describe('Film API', () => {
  it('axios be called with correct parameter', () => {
    filmApi.search({ keyword: 's', page: 0 });
    expect(filmApi.search).toBeCalledWith({ keyword: 's', page: 0 });
  });
});
