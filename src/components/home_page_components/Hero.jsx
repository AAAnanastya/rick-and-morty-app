import { motion } from 'framer-motion';

import HeroImg from '../../assets/hero-image.png';
import HeroLogo from '../../assets/hero-logo.png';

const Star = ({ x, y }) => {
  const opacityValues = [0.2, 1, 0.5];
  const duration = Math.random() * 2 + 1;

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: `${y}%`,
        left: `${x}%`,
        width: '4px',
        height: '4px',
        backgroundColor: 'white',
        borderRadius: '50%',
        boxShadow: '0 0 10px white',
      }}
      animate={{ opacity: opacityValues }}
      transition={{ duration: duration, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
};

export default function Hero() {
  const stars = Array.from({ length: 50 }).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <section className="h-[100vh] bg-dark-grey flex flex-col justify-center items-center pb-[70px]">
      {stars.map((star, index) => (
        <Star key={index} x={star.x} y={star.y} />
      ))}

      <div className="relative w-auto rounded-full bg-[radial-gradient(circle,_theme('colors.yellow-green')_0%,_transparent_70%)]">
        <img src={HeroLogo} alt="Rick and Morty" className="absolute top-0 left-0 z-1 w-auto" />
        <img src={HeroImg} className="z-10 h-[600px]" alt="Hero" />
      </div>

      <div className="relative h-[40px] w-full">
        <motion.div
          className="absolute border-solid border-yellow-green  border-[5px] border-t-0 border-r-0 pt-3 pl-3"
          style={{
            transform: 'translateX(-50%) rotate(-45deg)',
            left: '50%',
            top: '0',
          }}
          initial={{ top: '0', opacity: 1 }}
          animate={{ top: '100%', opacity: 0 }}
          transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
        />

        <motion.div
          className="absolute border-solid border-yellow-green border-[5px] border-t-0 border-r-0 pt-3 pl-3"
          style={{
            transform: 'translateX(-50%) rotate(-45deg)',
            left: '50%',
            top: '0',
          }}
          initial={{ top: '0', opacity: 1 }}
          animate={{ top: '60%', opacity: 0 }}
          transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
        />

        <motion.div
          className="absolute border-solid border-scuba-blue border-[5px] border-t-0 border-r-0 pt-3 pl-3"
          style={{
            transform: 'translateX(-50%) rotate(-45deg)',
            left: '50%',
            top: '0',
          }}
        />
      </div>
    </section>
  );
}
