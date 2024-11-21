import { useState } from 'react';

import SearchBar from '../components/content_pages_components/content_filtering/SearchBar';
import Background from '../assets/bg-cosmos.jpg';
import FiltersBar from '../components/content_pages_components/content_filtering/FiltersBar';
import ItemsList from '../components/content_pages_components/ItemsList';
import AllDataPageGrid from '../components/content_pages_components/AllDataPageGrid';

export default function CharactersPage() {
  let url = `https://rickandmortyapi.com/api/character`;
  const [filters, setFilters] = useState([]);

  return (
    <AllDataPageGrid background={Background}>
      <SearchBar filters={filters} filtersChanger={setFilters} />

      <FiltersBar
        filters={filters}
        filtersChanger={setFilters}
        filtersOptions={{ status: '', species: '' }}
        selectorOptions={{
          status: { sortBy: 'status', initial: 'Status', options: ['Alive', 'Dead', 'Unknown'] },
          species: {
            sortBy: 'species',
            initial: 'Species',
            options: [
              'Human',
              'Alien',
              'Humanoid',
              'Poopybutthole',
              'Mythological Creature',
              'Animal',
              'Robot',
              'Cronenberg',
              'Disease',
              'unknown',
            ],
          },
        }}
      />

      <ItemsList contentType="characters" url={url} filters={filters} />
    </AllDataPageGrid>
  );
}
