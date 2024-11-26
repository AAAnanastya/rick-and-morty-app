import { useState } from 'react';

import SearchBar from '../components/content_pages_components/content_filtering/SearchBar';
import FiltersBar from '../components/content_pages_components/content_filtering/FiltersBar';
import ItemsList from '../components/content_pages_components/ItemsList';
import PageGrid from '../components/content_pages_components/PageGrid';

export default function EpisodesPage() {
  let url = `https://rickandmortyapi.com/api/episode`;
  const [filters, setFilters] = useState([]);

  return (
    <PageGrid className="bg-episodes-page-bg">
      <SearchBar filters={filters} filtersChanger={setFilters} />

      <FiltersBar
        filters={filters}
        filtersChanger={setFilters}
        filtersOptions={{ season: '' }}
        selectorOptions={{
          season: {
            sortBy: 'episode',
            initial: 'Season',
            options: ['Season 1', 'Season 2', 'Season 3', 'Season 4', 'Season 5'],
          },
        }}
      />

      <ItemsList contentType="episodes" url={url} filters={filters} />
    </PageGrid>
  );
}
