import { render, screen, fireEvent } from '@testing-library/react';
import filmApi from '../../api/film';
import { App, ListItem } from './../App';

jest.mock('../../api/film', () => ({
  search: jest.fn(),
}));

describe('App Component', () => {
  it('render Search result', () => {
    render(<App />);
    const linkElement = screen.getByText(/Search Result/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('can search', () => {
    render(<App />);
    const box = screen.getByTestId('search-box');
    fireEvent.change(box, { target: { value: 'test' } });

    const button = screen.getByTestId('search-button');
    fireEvent.click(button);

    expect(filmApi.search).toBeCalledWith({ keyword: 'test', page: 1 });
  });
});

describe('ListItem', () => {
  it('should render given title, type, year, and image', () => {
    render(
      <ListItem
        type={'Movie'}
        title={'React Testing In Nutshell'}
        year={'2021'}
        imgUrl={'https://somewhere.com'}
      />
    );

    expect(screen.getByText(/Movie/)).toBeVisible();
    expect(screen.getByText(/React Testing In Nutshell/)).toBeVisible();
    expect(screen.getByText(/2021/)).toBeVisible();
    expect(screen.getByAltText('React Testing In Nutshell')).toHaveAttribute(
      'src',
      'https://somewhere.com'
    );
  });
});
