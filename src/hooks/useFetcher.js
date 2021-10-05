import React, { useEffect, useState } from 'react';

const useFetcher = (dependency = [], fetcher) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    fetchData();
  }, dependency);

  const fetchData = async () => {
    setIsLoading(true);
    const data = await fetcher();
    setData(data);
    setIsLoading(false);
  };

  return { data, isLoading };
};

export default useFetcher;
