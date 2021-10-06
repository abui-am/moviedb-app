import filmApi from '../film';

jest.mock('../film', () => ({
  search: jest.fn(),
  getById: jest.fn(),
}));

describe('Film API', () => {
  it('search to be called with correct parameter', () => {
    filmApi.search({ keyword: 's', page: 0 });
    expect(filmApi.search).toBeCalledWith({ keyword: 's', page: 0 });
  });

  it('getById to be called with correct parameter', () => {
    filmApi.getById('tt0096895');
    expect(filmApi.getById).toBeCalledWith('tt0096895');
  });
});
