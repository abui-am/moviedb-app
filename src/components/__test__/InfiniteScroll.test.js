import { render, screen } from '@testing-library/react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import InfiniteScroll from '../InfiniteScroll';

jest.mock('../../hooks/useIntersectionObserver', () => jest.fn());

/**
 * It's  hard to test useIntersection observer due to their behaviour
 * I'll just make sure that i call it
 */

describe('InfiniteScroll', () => {
  it('should call intersectionObserver', () => {
    const getNextStatus = jest.fn();

    render(<InfiniteScroll getNextStatus={getNextStatus} />);
    expect(useIntersectionObserver).toBeCalled();
    expect(getNextStatus).toBeCalledWith(1);
  });

  it('should not render loading when children isnt present', () => {
    render(<InfiniteScroll />);
    expect(screen.queryAllByText('Loading...').length).toBe(0);
  });

  it('should  render loading when children present', () => {
    render(<InfiniteScroll>Something here</InfiniteScroll>);
    expect(screen.getByText('Loading...')).toBeVisible();
  });
});
