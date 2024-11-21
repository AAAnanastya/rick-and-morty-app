import { useEffect, useState } from 'react';
import FilterSelector from './FilterSelector';

export default function FiltersBar({ filtersOptions, selectorOptions, filters, filtersChanger }) {
  const [currentFilters, setCurrentFilters] = useState(filtersOptions);

  useEffect(() => {
    let newUrlParams = Array.from(
      Object.entries(currentFilters)
        .map(([key, value]) => {
          if (value !== '') {
            return key + '=' + value.replace(/ /g, '%20');
          } else {
            return null;
          }
        })
        .filter((param) => param !== null)
    );

    if (filters.length == 0 && newUrlParams.length !== 0) {
      filtersChanger(newUrlParams);
    } else if (filters.length >= 1 && newUrlParams.length !== 0) {
      let exclusion = filters.filter((filter) => /^name=/.test(filter));
      if (exclusion !== -1) {
        filtersChanger([...exclusion, ...newUrlParams]);
      } else {
        filtersChanger(newUrlParams);
      }
    }
  }, [currentFilters]);

  return (
    <div className="mb-[20px]">
      {Object.entries(selectorOptions).map(([key, value]) => (
        <FilterSelector key={key} sortBy={value.sortBy} initial={value.initial} filters={value.options} onSelect={setCurrentFilters} />
      ))}
    </div>
  );
}
