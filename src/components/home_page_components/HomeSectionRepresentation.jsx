import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HomeSectionRepresentation({ title, redirect, children, bgColor, image }) {
  return (
    <section className={`h-[100vh] grid grid-cols-2 gap-4 ${bgColor}`}>
      <div className="flex flex-col justify-center mx-[130px]">
        <h1 className="mb-[30px] text-5xl text-ivory-white font-bungee tracking-widest">{title}</h1>
        <p className="text-ivory-white font-barlow text-xl text-justify">{children}</p>

        <div className="mt-[50px] ml-[30px]">
          <motion.div className="flex items-center cursor-pointer" whileHover={{ scale: 1.08 }}>
            <Link to={redirect} className="text-light-yellow font-barlow font-bold text-xl tracking-widest">
              View All
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <img src={image} className="h-[450px] rounded-md border-2 border-emerald-green" />
      </div>
    </section>
  );
}
