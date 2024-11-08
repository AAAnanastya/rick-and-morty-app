import { AiOutlineSearch } from 'react-icons/ai';
import { motion } from 'framer-motion';

export default function SearchBar() {
  return (
    <div className="relative flex justify-center my-[30px] w-max">
      <motion.input
        type="search"
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

      <button className="absolute top-1/2 right-1 -translate-y-1/2 p-[9px] bg-deep-blue rounded-full bg-opacity-20 h-[35px] w-[35px] flex items-center justify-center">
        <AiOutlineSearch className="text-deep-blue text-xl" />
      </button>
    </div>
  );
}
