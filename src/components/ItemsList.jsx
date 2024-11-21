import { useInfiniteQuery, useQuery } from 'react-query';
import ListItem from '../components/ListItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';

export default function ItemsList({ contentType, url, filters }) {
  const [urlParams, setUrlParams] = useState('');

  useEffect(() => {
    if (filters?.length >= 1) {
      setUrlParams(filters.join('&'));
    } else {
      setUrlParams('');
    }
  }, [filters]);

  const { data, isLoading, isError, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery(
    [contentType, urlParams],
    async ({ pageParam = 1 }) => {
      const res = await fetch(`${url}/?page=${pageParam}${urlParams ? `&${urlParams}` : ''}`);
      const data = await res.json();
      return data;
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.info.next === null) {
          return null;
        } else {
          return lastPage.info.next.split('=').pop();
        }
      },
      enabled: !!urlParams || filters.length === 0,
    }
  );

  useEffect(() => {
    refetch();
  }, [urlParams, refetch]);

  return (
    <div className="w-full h-max py-[30px] px-[30px] bg-deep-blue bg-opacity-30 backdrop-blur-[50px] rounded-[10px]">
      {isLoading ? (
        <p className="text-ivory-white font-barlow text-lg tracking-widest">Loading {contentType}...</p>
      ) : isError ? (
        <p className="text-ivory-white text-bold font-barlow text-lg tracking-widest">
          Cannot fetch {contentType} data. Please try again later.
        </p>
      ) : data.pages?.length ? (
        <InfiniteScroll
          className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] justify-items-center gap-[30px] w-full"
          dataLength={data.pages.flatMap((page) => page.results).length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<h4 className="text-ivory-white font-barlow">Loading...</h4>}>
          {data.pages
            .flatMap((page) => page.results)
            .map((el, index) => (
              <ListItem key={`${el.id}-${index}`} item={el} />
            ))}
        </InfiniteScroll>
      ) : (
        <p className="text-ivory-white font-barlow text-lg tracking-widest">No {contentType} found.</p>
      )}
    </div>
  );
}
