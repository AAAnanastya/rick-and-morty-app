import { useEffect, useState } from 'react';
import FilterSelector from './FilterSelector';

export default function FiltersBar({ isFiltered, initialList, updateFilteredList }) {
  const [order, setOrder] = useState('');
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');
  const [exceptionList, setExceptionList] = useState([]);

  useEffect(() => {
    if (order === '' && status === '' && species === '') {
      isFiltered(false);
      updateFilteredList(initialList);
      setExceptionList([]);
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

    if (status) {
      exceptions = results.filter((item) => item.status.toLowerCase() !== status.toLowerCase());
      results = results.filter((item) => item.status.toLowerCase() === status.toLowerCase());
      setExceptionList((prevExceptions) => [
        ...prevExceptions,
        ...exceptions.filter((item) => !prevExceptions.some((ex) => ex.id === item.id)),
      ]);
    }

    if (species) {
      exceptions = results.filter((item) => item.species.toLowerCase() !== species.toLowerCase());
      results = results.filter((item) => item.species.toLowerCase() === species.toLowerCase());
      setExceptionList((prevExceptions) => [
        ...prevExceptions,
        ...exceptions.filter((item) => !prevExceptions.some((ex) => ex.id === item.id)),
      ]);
    }

    updateFilteredList(results);
  }, [order, status, species, initialList]);

  return (
    <div className="mb-[20px]">
      <FilterSelector sortBy="Order" initial="Sort by" filters={['From A to Z', 'From Z to A']} onSelect={setOrder} />
      <FilterSelector sortBy="Status" initial="Status" filters={['Alive', 'Dead', 'Unknown']} onSelect={setStatus} />
      <FilterSelector
        initial="Species"
        sortBy="Species"
        filters={[
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
        ]}
        onSelect={setSpecies}
      />
    </div>
  );
}
