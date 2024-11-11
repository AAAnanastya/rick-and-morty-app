export default function SortConditionItem({ isSearching, characters, searchedCharacters, children }) {
  const handleSort = async () => {
    isSearching(true);

    try {
      const sortedResults = [...characters].sort((a, b) => a.name.localeCompare(b.name));
      searchedCharacters(sortedResults);
    } catch (error) {
      console.error('Error sorting characters:', error);
    }
  };

  return (
    <button className="m-4 p-4 bg-ivory-white" onClick={handleSort}>
      {children}
    </button>
  );
}
