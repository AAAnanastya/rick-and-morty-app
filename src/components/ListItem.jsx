import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ListItem({ item }) {
  let seasonNum;
  let episodeNum;

  if (typeof item.episode === 'string') {
    const match = item.episode.match(/^S(\d+)E(\d+)$/);
    if (match) {
      seasonNum = parseInt(match[1], 10);
      episodeNum = parseInt(match[2], 10);
    }
  }

  const navigate = useNavigate();
  const location = useLocation();

  function handleClick(itemId) {
    navigate(`${location.pathname}/${itemId}`);
  }

  return (
    <motion.div
      onClick={() => handleClick(item.id)}
      className="w-[310px] h-[150px] mb-[8px] bg-deep-blue rounded-[15px] overflow-hidden shadow-md shadow-custom-yellow flex items-center relative"
      whileHover="hover"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.7 }}>
      <motion.div
        className="absolute w-[100%] h-[100%] bg-custom-yellow bg-opacity-60 z-20 flex justify-center items-center"
        variants={{
          hover: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeInOut' } },
        }}
        initial={{ opacity: 0, y: '-100%' }}>
        <motion.p
          className="font-bungee text-dark-grey text-xl tracking-widest"
          variants={{
            hover: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeInOut', delay: 0.3 } },
          }}
          initial={{ opacity: 0, y: '-60%' }}>
          Learn more
        </motion.p>
      </motion.div>

      {item.image && <img src={item.image} alt={item.name} className="h-[100%] w-auto object-cover" />}
      {item.image && <div className="absolute inset-0 top-0 left-[24%] h-full w-1/4 bg-gradient-to-r from-transparent to-deep-blue"></div>}

      <div className="w-[310px] flex flex-col items-center text-center">
        {!item.image && item.type && item.type !== '' && <h1 className="w-100% font-bungee text-custom-yellow text-lg">{item.type}:</h1>}
        <h1 className="font-bungee text-custom-yellow text-lg z-10 max-w-[260px]">{item.name}</h1>
        {typeof item.episode === 'string' && (
          <h2 className="font-barlow text-custom-yellow text-md tracking-wider z-10">
            Season: {seasonNum}
            {'\u00A0'}Episode: {episodeNum}
          </h2>
        )}
      </div>
    </motion.div>
  );
}
