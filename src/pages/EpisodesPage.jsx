import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import SearchBar from '../components/SearchBar';
import Background from '../assets/episodes-background.jpg';
import FiltersBar from '../components/FiltersBar';
import ItemsList from '../components/ItemsList';
import AllDataPageGrid from '../components/AllDataPageGrid';

export default function EpisodesPage() {
  const [episodes, setEpisodes] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchedEpisodes, setSearchedEpisodes] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredEpisodes, setFilteredEpisodes] = useState([]);

  const { data, isLoading, isError, error, refetch } = useQuery(
    'episodesData',
    async () => {
      let allResults = [];
      let url = `https://rickandmortyapi.com/api/episode`;

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
      localStorage.setItem('episodes', JSON.stringify(data));

      setEpisodes(data);
      setSearchedEpisodes(data);
      setFilteredEpisodes(data);
    }
  }, [data]);

  return (
    <AllDataPageGrid background={Background}>
      <SearchBar isSearching={setIsSearching} initialList={episodes} searchedCharacters={setSearchedEpisodes} />

      <FiltersBar
        isEpisodes
        isFiltered={setIsFiltering}
        initialList={searchedEpisodes}
        updateFilteredList={setFilteredEpisodes}
        initialFilters={{ airData: '', season: '' }}
        selectorOptions={{
          airData: { sortBy: 'air_date', initial: 'Sort by', options: ['Newest First', 'Oldest First'] },
          season: {
            sortBy: 'episode',
            initial: 'Season',
            options: ['Season 1', 'Season 2', 'Season 3', 'Season 4', 'Season 5', 'Season 6', 'Season 7', 'Season 8'],
          },
        }}
      />

      <ItemsList
        contentType="episodes"
        isLoading={isLoading}
        isError={isError}
        isSearching={isSearching}
        isFiltering={isFiltering}
        initialList={episodes}
        searchedList={searchedEpisodes}
        filteredList={filteredEpisodes}
      />
    </AllDataPageGrid>
  );
}
