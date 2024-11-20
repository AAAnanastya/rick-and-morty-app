import { useEffect, useState, useRef } from 'react';
import ListItem from '../components/ListItem';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function ItemsList({ isLoading, isError, isSearching, isFiltering, contentType, initialList, searchedList, filteredList }) {
  const [items, setItems] = useState(initialList);
  const [shownItems, setShownItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [newTimeout, setNewTimeout] = useState(2000);

  const scrollableDivRef = useRef(null);

  useEffect(() => {
    setShownItems([]);

    if (!isSearching && !isFiltering) {
      setItems(initialList.slice(18));
      setShownItems(initialList.slice(0, 18));
    } else if (!isFiltering && isSearching) {
      setItems(searchedList.slice(21));
      setShownItems(searchedList.slice(0, 18));
    } else if (isSearching || isFiltering) {
      setItems(filteredList.slice(21));
      setShownItems(filteredList.slice(0, 18));
    }
  }, [isSearching, isFiltering, initialList, searchedList, filteredList]);

  function handleLoader() {
    if (items.length === 0) {
      setHasMore(false);
      return;
    }

    let variables = items.slice(0, 18);
    let exceptions = items.slice(18);

    setShownItems((prevElements) => [...prevElements, ...variables]);
    setItems(exceptions);
    setIsFetching(true);

    console.log('хоба');
    setNewTimeout((prevTimeout) => prevTimeout + 500);

    if (exceptions.length === 0) {
      setHasMore(false);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsFetching(false);
    }, newTimeout);

    console.log(newTimeout);

    return () => clearTimeout(timeout);
  }, [shownItems]);

  return (
    <>
      {isFetching && (
        <h4 className="fixed text-ivory-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">Loading...</h4>
      )}
      <div
        ref={scrollableDivRef}
        className="w-full max-h-max py-[30px] px-[30px] bg-deep-blue bg-opacity-30 backdrop-blur-[50px] rounded-[10px]">
        {isLoading ? (
          <p className="text-ivory-white font-barlow text-lg tracking-widest">Loading {contentType}...</p>
        ) : isError ? (
          <p className="text-ivory-white text-bold font-barlow text-lg tracking-widest">
            Cannot fetch {contentType} data. Please try again later.
          </p>
        ) : (
          <InfiniteScroll
            className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] justify-items-center gap-[30px] w-full"
            dataLength={shownItems.length}
            next={handleLoader}
            hasMore={hasMore}
            scrollableTarget={scrollableDivRef}
            scrollThreshold={0.9}>
            {shownItems.map((el) => (
              <ListItem key={el.id} item={el} />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </>
  );
}
