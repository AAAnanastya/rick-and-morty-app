import { useEffect, useState } from 'react';
import FilterSelector from './FilterSelector';

export default function FiltersBar({ isFiltered, initialList, initialFilters, selectorOptions, updateFilteredList }) {
  const [order, setOrder] = useState('');
  const [filters, setFilters] = useState(initialFilters);
  const [exceptionList, setExceptionList] = useState([]);

  useEffect(() => {
    let initials = Object.values(filters).join('');
    if (order === '' && initials === '') {
      return;
    }

    isFiltered(true);
    let results = [];
    let exceptions = [];

    if (exceptionList.length > 0) {
      results = [...initialList, ...exceptionList.filter((item2) => !initialList.some((item1) => item1.id === item2.id))];
      setExceptionList([]);
    } else {
      results = [...initialList];
    }

    if (order === 'From A to Z') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === 'From Z to A') {
      results.sort((a, b) => b.name.localeCompare(a.name));
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        exceptions = results.filter((item) => item[key]?.toLowerCase() !== value.toLowerCase());
        results = results.filter((item) => item[key]?.toLowerCase() === value.toLowerCase());

        setExceptionList((prevExceptions) => [
          ...prevExceptions,
          ...exceptions.filter((item) => !prevExceptions.some((ex) => ex.id === item.id)),
        ]);
      }
    });

    updateFilteredList(results);
  }, [order, filters, initialList]);

  return (
    <div className="mb-[20px]">
      <FilterSelector sortBy="order" initial="Sort by" filters={['From A to Z', 'From Z to A']} onSelectOrder={setOrder} />
      {Object.entries(selectorOptions).map(([key, value]) => (
        <FilterSelector key={key} sortBy={value.sortBy} initial={value.initial} filters={value.options} onSelectAnother={setFilters} />
      ))}
    </div>
  );
}
