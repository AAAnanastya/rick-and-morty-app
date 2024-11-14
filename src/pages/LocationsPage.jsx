import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import SearchBar from '../components/SearchBar';
import Background from '../assets/bg-cosmos-3.jpg';
import FiltersBar from '../components/FiltersBar';
import ItemsList from '../components/ItemsList';

export default function LocationsPage() {
  const [locations, setLocations] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchedLocations, setSearchedLocations] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);

  const { data, isLoading, isError, error, refetch } = useQuery(
    'planetsData',
    async () => {
      let allResults = [];
      let url = `https://rickandmortyapi.com/api/location`;

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
      setLocations(data);
      setSearchedLocations(data);
      setFilteredLocations(data);
    }
  }, [data]);

  return (
    <div style={{ backgroundImage: `url(${Background})` }} className="bg-cover bg-fixed bg-no-repeat h-[100%] min-h-[100vh] w-full">
      <div className="grid grid-cols-1 grid-rows-auto max-w-[1150px] mx-auto justify-items-center pt-[60px]">
        <SearchBar isSearching={setIsSearching} initialList={locations} searchedCharacters={setSearchedLocations} />

        {/* <FiltersBar isFiltered={setIsFiltering} initialList={searchedPlanets} updateFilteredList={setFilteredPlanets} /> */}

        <ItemsList
          contentType="planets"
          isLoading={isLoading}
          isError={isError}
          isSearching={isSearching}
          isFiltering={isFiltering}
          initialList={locations}
          searchedList={searchedLocations}
          filteredList={filteredLocations}
        />
      </div>
    </div>
  );
}
