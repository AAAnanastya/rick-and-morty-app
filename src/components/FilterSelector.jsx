import { useState } from 'react';

export default function FilterSelector({ sortBy, initial, filters, onSelect }) {
  const [sortOption, setSortOption] = useState(initial);

  function handleChange(id, event) {
    let sortParams = event ? event.target.value : sortOption;
    setSortOption(sortParams);

    if (/^Season/.test(sortParams)) {
      let number = sortParams.charAt(sortParams.length - 1);
      sortParams = `S0${number}`;
    }

    onSelect((prevFilter) => ({
      ...prevFilter,
      [id]: sortParams,
    }));
  }

  return (
    <select
      id={sortBy}
      className="m-4 p-[3px] w-[85px] rounded-[5px] bg-ivory-white text-deep-blue font-barlow text-md focus:outline-none hover:shadow-custom-yellow hover:shadow-md"
      value={sortOption}
      onChange={(event) => handleChange(sortBy, event)}>
      <option value={initial} disabled>
        {initial}
      </option>
      {filters.map((filter) => (
        <option key={filter} value={filter}>
          {filter}
        </option>
      ))}
    </select>
  );
}
