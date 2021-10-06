import { createRef, useState } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

// I dont create Hooks again in here because i think adding more abstraction won't make it any good
// It just a simple reuse of useIntersectionObserver, so i'll just make some reusable component
const InfiniteScroll = ({ fetchNextPage, getNextStatus, children }) => {
  const targetRef = createRef();

  const [page, setPage] = useState(1);
  const enabled = getNextStatus?.(page);

  const onIntersect = async () => {
    await fetchNextPage(page + 1);
    setPage((page) => page + 1);
  };
  useIntersectionObserver({
    target: targetRef,
    onIntersect: onIntersect,
    enabled,
  });

  return (
    <div data-testid='infinite-scroll'>
      {children}
      {
        // This was intentional,
        // We need to render Loding indicator after our children to prevent double fetch on initialFetching
        children && enabled && (
          <div ref={targetRef} style={{ height: 200 }}>
            Loading...
          </div>
        )
      }
    </div>
  );
};

export default InfiniteScroll;
