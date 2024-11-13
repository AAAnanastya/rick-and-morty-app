import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import SearchBar from '../components/SearchBar';
import Background from '../assets/bg-cosmos.jpg';
import FiltersBar from '../components/FiltersBar';
import ItemsList from '../components/ItemsList';

export default function CharactersPage() {
  const [characters, setCharacters] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchedCharacters, setSearchedCharacters] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  const { data, isLoading, isError, error, refetch } = useQuery(
    'characterData',
    async () => {
      let allResults = [];
      let url = `https://rickandmortyapi.com/api/character`;

      while (url) {
        const res = await fetch(url);
        const data = await res.json();

        if (data.results) allResults = [...allResults, ...data.results];
        url = data.info.next || null;
      }

      return allResults;
    },
    {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (data) {
      setCharacters(data);
      setSearchedCharacters(data);
      setFilteredCharacters(data);
    }
  }, [data]);

  return (
    <div style={{ backgroundImage: `url(${Background})` }} className="bg-cover bg-fixed bg-no-repeat h-[100%] min-h-[100vh] w-full">
      <div className="grid grid-cols-1 grid-rows-auto max-w-[1200px] mx-auto justify-items-center pt-[60px]">
        <SearchBar isSearching={setIsSearching} initialList={characters} searchedCharacters={setSearchedCharacters} />

        <FiltersBar isFiltered={setIsFiltering} initialList={searchedCharacters} updateFilteredList={setFilteredCharacters} />

        <ItemsList
          contentType="characters"
          isLoading={isLoading}
          isError={isError}
          isSearching={isSearching}
          isFiltering={isFiltering}
          initialList={characters}
          searchedList={searchedCharacters}
          filteredList={filteredCharacters}
        />
      </div>
    </div>
  );
}

// //infinite scroll data fetching function
// useEffect(() => {
//   const handleScroll = () => {
//     const scrollTop = window.scrollY;
//     const windowHeight = window.innerHeight;
//     const fullHeight = document.documentElement.scrollHeight;

//     if (scrollTop + windowHeight >= fullHeight - 20 && !loading) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   window.addEventListener('scroll', handleScroll);

//   return () => window.removeEventListener('scroll', handleScroll);
// }, [loading]);
