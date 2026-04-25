import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePreference } from '../../context/PreferenceContext';
import AnimatedSection from '../ui/AnimatedSection';
import { portfolioData } from '../../data/portfolioData';
import { ArrowRight, Download } from 'lucide-react';

import profilePic from '../../assets/Selva.png';
import selva1 from '../../assets/selva1.png';
import selva2 from '../../assets/selva2.png';

export default function Hero() {
  const { recruiterMode } = usePreference();
  const { name, role, intro, resumeLink } = portfolioData.hero;

  const [currentIndex, setCurrentIndex] = useState(1);
  const images = [selva1, profilePic, selva2];

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    } else if (info.offset.x > swipeThreshold) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <AnimatedSection id="hero" className="min-h-[80vh] flex flex-col justify-center items-center relative overflow-hidden pt-10 md:pt-20 pb-10">
      
      {/* Desktop Interactive Background Container */}
      <motion.div 
        className="absolute inset-0 w-full h-full hidden md:flex items-center justify-center z-0 pt-0"
        initial="initial"
        whileHover="hover"
      >
        
        {/* Left Card */}
        <motion.div
          variants={{
            initial: { x: "-15vw", y: "10%", rotate: -8, scale: 0.85, opacity: 0.4 },
            hover: { x: "-20vw", y: "2%", rotate: -12, scale: 0.9, opacity: 0.8 }
          }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="absolute w-56 md:w-60 lg:w-72 aspect-[3/4] rounded-3xl overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl"
        >
          <img src={images[0]} alt="Background Left" className="w-full h-full object-cover pointer-events-none select-none" draggable={false} onContextMenu={e => e.preventDefault()} />
          <div className="absolute inset-0 bg-black/10 dark:bg-black/40"></div>
        </motion.div>

        {/* Right Card */}
        <motion.div
          variants={{
            initial: { x: "15vw", y: "10%", rotate: 8, scale: 0.85, opacity: 0.4 },
            hover: { x: "20vw", y: "2%", rotate: 12, scale: 0.9, opacity: 0.8 }
          }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="absolute w-56 md:w-60 lg:w-72 aspect-[3/4] rounded-3xl overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl"
        >
          <img src={images[2]} alt="Background Right" className="w-full h-full object-cover pointer-events-none select-none" draggable={false} onContextMenu={e => e.preventDefault()} />
          <div className="absolute inset-0 bg-black/10 dark:bg-black/40"></div>
        </motion.div>

        {/* Center Card */}
        <motion.div
          variants={{
            initial: { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 },
            hover: { x: 0, y: "-5%", rotate: 0, scale: 1.05, opacity: 1 }
          }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="absolute w-56 md:w-60 lg:w-72 aspect-[3/4] rounded-3xl overflow-hidden border-2 border-white/30 dark:border-white/20 shadow-2xl z-10"
        >
          <img src={images[1]} alt="Background Center" className="w-full h-full object-cover pointer-events-none select-none" draggable={false} onContextMenu={e => e.preventDefault()} />
        </motion.div>

      </motion.div>

      {/* Mobile Swipeable Carousel */}
      <div className="absolute inset-0 w-full h-full flex md:hidden items-start justify-center z-0 pt-20 overflow-hidden">
        {images.map((img, index) => {
          let offset = index - currentIndex;
          if (offset === 2) offset = -1;
          if (offset === -2) offset = 1;

          let x = 0;
          let y = 0;
          let rotate = 0;
          let scale = 1;
          let zIndex = 10;
          let opacity = 1;

          if (offset === 0) {
            x = 0;
            y = 0;
            rotate = 0;
            scale = 1;
            zIndex = 20;
            opacity = 1;
          } else if (offset === -1) {
            x = "-25vw";
            y = "5%";
            rotate = -8;
            scale = 0.85;
            zIndex = 10;
            opacity = 0.7;
          } else if (offset === 1) {
            x = "25vw";
            y = "5%";
            rotate = 8;
            scale = 0.85;
            zIndex = 10;
            opacity = 0.7;
          }

          return (
            <motion.div
              key={index}
              animate={{ x, y, rotate, scale, opacity }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              drag={offset === 0 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={offset === 0 ? handleDragEnd : undefined}
              className="absolute w-56 aspect-[3/4] rounded-3xl overflow-hidden border-2 border-white/30 dark:border-white/20 shadow-2xl"
              style={{ zIndex, pointerEvents: offset === 0 ? 'auto' : 'none', cursor: offset === 0 ? 'grab' : 'default' }}
              whileTap={offset === 0 ? { cursor: 'grabbing' } : {}}
            >
              <img src={img} alt={`Profile ${index + 1}`} className="w-full h-full object-cover pointer-events-none select-none" draggable={false} onContextMenu={e => e.preventDefault()} />
              {offset !== 0 && <div className="absolute inset-0 bg-black/20 dark:bg-black/50 pointer-events-none transition-opacity duration-300"></div>}
            </motion.div>
          );
        })}
        
        {/* Pagination Dots */}
        <div className="absolute top-[400px] flex gap-2 z-30 pointer-events-auto">
          {images.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-blue-600 w-5' : 'bg-gray-300 dark:bg-gray-600'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-4 pointer-events-none mt-64 md:mt-32">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xs md:text-sm lg:text-base font-bold tracking-[0.3em] text-blue-600 dark:text-blue-400 uppercase mb-3"
        >
          {role}
        </motion.h2>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-800 dark:from-white dark:via-white dark:to-white leading-[1.1] mb-6 drop-shadow-xl"
        >
          {name}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-base md:text-xl text-gray-800 dark:text-gray-200 max-w-2xl font-medium mb-10 drop-shadow-md bg-white/50 dark:bg-black/50 p-4 rounded-2xl backdrop-blur-sm"
        >
          {intro}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 pointer-events-auto"
        >
          <a href="#projects" className="gravity-target inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all hover:-translate-y-1 hover:shadow-xl">
            View Projects <ArrowRight size={20} />
          </a>
          <a href="#contact" className="gravity-target inline-flex items-center gap-2 px-8 py-4 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white rounded-xl font-bold hover:bg-white dark:hover:bg-zinc-700 transition-all hover:-translate-y-1 hover:shadow-xl">
            Contact Me
          </a>
          {resumeLink && (
            <a 
              href={resumeLink} 
              download="Selvaganesh_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="gravity-target inline-flex items-center gap-2 px-8 py-4 bg-blue-600/90 backdrop-blur-md text-white rounded-xl font-bold hover:bg-blue-700 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/20"
            >
              <Download size={20} /> Resume
            </a>
          )}
        </motion.div>
      </div>

    </AnimatedSection>
  );
}
