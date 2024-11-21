import { motion } from 'framer-motion';

export default function InnerCharactersList({ list, handleNavigate }) {
  return (
    <div className="col-span-2 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4 w-full mt-[30px]">
      {list.map((character, index) => (
        <motion.div
          key={character.id}
          className="bg-ivory-white rounded-lg shadow-md overflow-hidden hover:cursor-pointer"
          onClick={() => handleNavigate(character.id)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.2, duration: 0.5 }}>
          <img className="object-cover w-full" src={character.image} alt={character.name} />
          <h1 className="text-dark-green text-center font-bold font-barlow text-md">{character.name}</h1>
        </motion.div>
      ))}
    </div>
  );
}
