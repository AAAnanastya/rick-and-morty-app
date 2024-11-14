import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import SearchBar from '../components/SearchBar';
import Background from '../assets/bg-cosmos-3.jpg';
import FiltersBar from '../components/FiltersBar';
import ItemsList from '../components/ItemsList';
import AllDataPageGrid from '../components/AllDataPageGrid';

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
    <AllDataPageGrid background={Background}>
      <SearchBar isSearching={setIsSearching} initialList={locations} searchedCharacters={setSearchedLocations} />

      <FiltersBar
        isFiltered={setIsFiltering}
        initialList={searchedLocations}
        updateFilteredList={setFilteredLocations}
        initialFilters={{ type: '', dimension: '' }}
        selectorOptions={{
          type: {
            sortBy: 'type',
            initial: 'Type',
            options: [
              'Planet',
              'Cluster',
              'Space station',
              'Microverse',
              'TV',
              'Resort',
              'Fantasy town',
              'Dream',
              'Dimension',
              'unknown',
              'Menagerie',
              'Game',
              'Customs',
              'Daycare',
              'Dwarf planet (Celestial Dwarf)',
              'Miniverse',
              'Teenyverse',
              'Box',
              'Spacecraft',
              'Artificially generated world',
              'Machine',
              'Arcade',
              'Spa',
              'Quadrant',
              'Quasar',
              'Mount',
              'Liquid',
              'Convention',
              'Woods',
              'Diegesis',
              'Non-Diegetic Alternative Reality',
              'Nightmare',
              'Asteroid',
              'Acid Plant',
              'Reality',
              'Death Star',
              'Base',
              'Elemental Rings',
              'Human',
              'Space',
              'Hell',
              'Police Department',
              'Country',
              'Consciousness',
              'Memory',
            ],
          },
          dimension: {
            sortBy: 'dimension',
            initial: 'Dimension',
            options: [
              'Dimension C-137',
              'unknown',
              'Post-Apocalyptic Dimension',
              'Replacement Dimension',
              'Cronenberg Dimension',
              'Fantasy Dimension',
              'Dimension 5-126',
              'Testicle Monster Dimension',
              'Cromulon Dimension',
              'Dimension C-500A',
              'Dimension K-83',
              'Dimension J19ζ7',
              'Eric Stoltz Mask Dimension',
              "Evil Rick's Target Dimension",
              'Giant Telepathic Spiders Dimension',
              'Unknown dimension',
              'Dimension K-22',
              'Dimension D-99',
              'Dimension D716',
              'Dimension D716-B',
              'Dimension D716-C',
              'Dimension J-22',
              'Dimension C-35',
              'Pizza Dimension',
              'Phone Dimension',
              'Chair Dimension',
              'Fascist Dimension',
              'Fascist Shrimp Dimension',
              'Fascist Teddy Bear Dimension',
              'Wasp Dimension',
              'Tusk Dimension',
              'Magic Dimension',
              'Merged Dimension',
            ],
          },
        }}
      />

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
    </AllDataPageGrid>
  );
}
