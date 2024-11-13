import ListItem from '../components/ListItem';

export default function ItemsList({ isLoading, isError, isSearching, isFiltering, contentType, initialList, searchedList, filteredList }) {
  return (
    <div className="w-full h-max py-[30px] px-[10px] bg-ivory-white bg-opacity-5 backdrop-blur-lg rounded-[10px] grid grid-cols-3 grid-rows-auto gap-[20px] justify-items-center">
      {isLoading ? (
        <p className="text-ivory-white font-barlow text-lg tracking-widest">Loading {contentType}...</p>
      ) : isError ? (
        <p className="text-ivory-white text-bold font-barlow text-lg tracking-widest">
          Cannot fetch {contentType} data. Please try again later.
        </p>
      ) : !isSearching && !isFiltering && initialList.length > 0 ? (
        initialList.map((el) => <ListItem key={el.id} character={el} />)
      ) : !isFiltering && isSearching && searchedList.length > 0 ? (
        searchedList.map((el) => <ListItem key={el.id} character={el} />)
      ) : isSearching || (isFiltering && filteredList.length > 0) ? (
        filteredList.map((el) => <ListItem key={el.id} character={el} />)
      ) : (
        <p className="text-ivory-white font-barlow text-lg tracking-widest">No {contentType} found.</p>
      )}
    </div>
  );
}
