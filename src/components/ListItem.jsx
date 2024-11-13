import { motion } from 'framer-motion';

export default function ListItem({ item }) {
  return (
    <motion.div
      className="w-[310px] h-[150px] bg-deep-blue rounded-[15px] overflow-hidden shadow-md shadow-custom-yellow flex items-center relative"
      whileHover="hover">
      <motion.div
        className="absolute w-[100%] h-[100%] bg-custom-yellow bg-opacity-60 z-20 flex justify-center items-center"
        variants={{
          hover: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeInOut' } },
        }}
        initial={{ opacity: 0, y: '-100%' }}>
        <motion.p
          className="font-bungee text-dark-grey text-xl tracking-widest"
          variants={{
            hover: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeInOut', delay: 0.5 } },
          }}
          initial={{ opacity: 0, y: '-60%' }}>
          Learn more
        </motion.p>
      </motion.div>
      <img src={item.image} alt={item.name} className="h-[100%] w-auto object-cover" />
      <div className="absolute inset-0 top-0 left-[24%] h-full w-1/4 bg-gradient-to-r from-transparent to-deep-blue"></div>
      <h1 className="font-bungee text-custom-yellow text-lg w-[150px] text-center z-10">{item.name}</h1>
    </motion.div>
  );
}
