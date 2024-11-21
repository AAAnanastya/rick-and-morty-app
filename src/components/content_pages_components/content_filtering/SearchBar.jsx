import { AiOutlineSearch } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SearchBar({ filters, filtersChanger }) {
  const [query, setQuery] = useState('');

  function handleInputChange(event) {
    setQuery(event.target.value);

    if (event.target.value === '') {
      let exclusion = filters.filter((filter) => !/^name=/.test(filter));

      if (exclusion !== -1) {
        filtersChanger(exclusion);
      }
    }
  }

  function handleSearch(searchParams) {
    let newUrlParams = `name=${searchParams.trim().toLowerCase().replace(/ /g, '%20')}`;

    if (filters.lenght == 0 && newUrlParams.length >= 1) {
      filtersChanger(newUrlParams);
    } else if (newUrlParams.length >= 1) {
      let exclusion = filters.filter((filter) => !/^name=/.test(filter));
      if (exclusion !== -1) {
        filtersChanger([...exclusion, newUrlParams]);
      } else {
        filtersChanger(newUrlParams);
      }
    }
  }

  return (
    <div className="relative flex justify-center my-[20px] w-max">
      <motion.input
        type="search"
        value={query}
        onChange={handleInputChange}
        className="w-[450px] h-[40px] p-4 rounded-full bg-ivory-white text-deep-blue font-barlow text-lg placeholder-deep-blue placeholder-opacity-75 appearance-none focus:outline-none"
        placeholder="Search..."
        initial={{ boxShadow: '0 0 5px 2px transparent' }}
        whileHover={{
          boxShadow: '0 0 5px 2px #f5e43e',
          transition: { duration: 0.5, ease: 'easeInOut' },
        }}
        whileFocus={{
          boxShadow: '0 0 5px 2px #f5e43e',
          transition: { duration: 0.5, ease: 'easeInOut' },
        }}
      />

      <button
        className="absolute top-1/2 right-1 -translate-y-1/2 p-[9px] bg-deep-blue rounded-full bg-opacity-20 h-[35px] w-[35px] flex items-center justify-center"
        onClick={() => handleSearch(query)}>
        <AiOutlineSearch className="text-deep-blue text-xl" />
      </button>
    </div>
  );
}
