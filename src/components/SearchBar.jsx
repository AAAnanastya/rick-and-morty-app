import { AiOutlineSearch } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SearchBar({ isSearching, initialList, searchedCharacters }) {
  const [query, setQuery] = useState('');

  function handleInputChange(event) {
    setQuery(event.target.value);

    if (event.target.value === '') {
      isSearching(false);
      searchedCharacters(initialList);
    }
  }

  function handleSearch(searchParams) {
    isSearching(true);

    try {
      const searchResults = initialList.filter((item) => {
        return Object.values(item).some((value) => {
          const stringValue = String(value).toLowerCase();

          if (stringValue.startsWith('http://') || stringValue.startsWith('https://')) {
            return false;
          }

          return stringValue.includes(searchParams.toLowerCase());
        });
      });

      searchedCharacters(searchResults);
    } catch (error) {
      console.error('Sorry. Cannot find the information.', error);
    }
  }

  return (
    <div className="relative flex justify-center my-[30px] w-max">
      <motion.input
        type="search"
        value={query}
        onChange={handleInputChange}
        className="w-[450px] h-[40px] p-4 rounded-full bg-ivory-white text-deep-blue font-barlow text-lg placeholder-deep-blue placeholder-opacity-75 appearance-none focus:outline-none"
        placeholder="Search..."
        initial={{ boxShadow: '0 0 10px 2px transparent' }}
        whileHover={{
          boxShadow: '0 0 10px 2px #00b0c8',
          transition: { duration: 0.5, ease: 'easeInOut' },
        }}
        whileFocus={{
          boxShadow: '0 0 10px 2px #00b0c8',
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
