import ListItem from '../components/ListItem';

export default function ItemsList({ isLoading, isError, isSearching, isFiltering, contentType, initialList, searchedList, filteredList }) {
  console.log(searchedList.length);
  return (
    <div className="w-full h-max py-[30px] px-[30px] bg-deep-blue bg-opacity-30 backdrop-blur-[50px] rounded-[10px] grid grid-cols-3 grid-rows-auto gap-[30px] justify-items-center">
      {isLoading ? (
        <p className="text-ivory-white font-barlow text-lg tracking-widest">Loading {contentType}...</p>
      ) : isError ? (
        <p className="text-ivory-white text-bold font-barlow text-lg tracking-widest">
          Cannot fetch {contentType} data. Please try again later.
        </p>
      ) : !isSearching && !isFiltering && initialList.length > 0 ? (
        initialList.map((el) => <ListItem key={el.id} item={el} />)
      ) : !isFiltering && isSearching && searchedList.length > 0 ? (
        searchedList.map((el) => <ListItem key={el.id} item={el} />)
      ) : (isSearching || isFiltering) && filteredList.length > 0 ? (
        filteredList.map((el) => <ListItem key={el.id} item={el} />)
      ) : (
        <p className="text-ivory-white font-barlow text-lg tracking-widest">No {contentType} found.</p>
      )}
    </div>
  );
}
