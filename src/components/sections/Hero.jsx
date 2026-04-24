import { motion } from 'framer-motion';
import { usePreference } from '../../context/PreferenceContext';
import AnimatedSection from '../ui/AnimatedSection';
import { portfolioData } from '../../data/portfolioData';
import { ArrowRight } from 'lucide-react';
import profilePic from '../../assets/Selva.png';

export default function Hero() {
  const { recruiterMode } = usePreference();
  const { name, role, intro } = portfolioData.hero;

  return (
    <AnimatedSection id="hero" className="min-h-[80vh] flex flex-col justify-center relative">
      <div className="flex flex-col-reverse md:flex-row items-center gap-12 max-w-5xl">
        <div className="flex-1">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 mb-2">
            {name}
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-blue-600 dark:text-blue-400 mb-6">
            {role}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-10 max-w-2xl">
            {intro}
          </p>
          
          <div className="flex gap-4">
            <a href="#projects" className="gravity-target inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
              View Projects <ArrowRight size={18} />
            </a>
            <a href="#contact" className="gravity-target inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 dark:bg-zinc-800 dark:text-white rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors">
              Contact Me
            </a>
          </div>
        </div>

        {/* Photo Section */}
        <div className="shrink-0 gravity-target mt-12 md:mt-0 relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-[2rem] transform rotate-3 scale-105 group-hover:rotate-6 transition-transform duration-500 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-[2rem] transform -rotate-3 scale-105 group-hover:-rotate-6 transition-transform duration-500 pointer-events-none"></div>
          <img 
            src={profilePic} 
            alt={name} 
            className="relative z-10 w-64 h-80 object-cover object-top rounded-[2rem] border border-gray-200 dark:border-zinc-800 shadow-2xl transition-all duration-500 group-hover:-translate-y-2"
          />
        </div>
      </div>

      {!recruiterMode && (
        <motion.div 
          className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block opacity-20 pointer-events-none"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-64 h-64 border border-gray-400 dark:border-gray-600 rounded-full blur-xl" />
        </motion.div>
      )}
    </AnimatedSection>
  );
}
