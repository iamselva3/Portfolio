import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { usePreference } from '../../context/PreferenceContext';
import AnimatedSection from '../ui/AnimatedSection';
import { portfolioData } from '../../data/portfolioData';
import { ArrowRight, Download } from 'lucide-react';
import profilePic from '../../assets/Selva.png';

export default function Hero() {
  const { recruiterMode } = usePreference();
  const { name, role, intro, resumeLink } = portfolioData.hero;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <AnimatedSection id="hero" className="min-h-[80vh] flex flex-col justify-center relative">
      <div className="flex flex-col-reverse md:flex-row items-center gap-12 max-w-5xl">
        <div className="flex-1">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 pb-2 sm:pb-4 mb-2">
            {name}
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-blue-600 dark:text-blue-400 mb-6">
            {role}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-10 max-w-2xl">
            {intro}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="gravity-target inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
              View Projects <ArrowRight size={18} />
            </a>
            <a href="#contact" className="gravity-target inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 dark:bg-zinc-800 dark:text-white rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors">
              Contact Me
            </a>
            {resumeLink && (
              <a href={resumeLink} target="_blank" rel="noopener noreferrer" className="gravity-target inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                <Download size={18} /> Resume
              </a>
            )}
          </div>
        </div>

        {/* Photo Section */}
        <motion.div 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
          className="shrink-0 gravity-target mt-12 md:mt-0 relative group perspective-[1000px] cursor-pointer"
        >
          <motion.div 
            style={{ transform: "translateZ(-30px)" }}
            animate={{ 
              y: [-15, 15, -15],
              rotate: [3, 8, 3],
              scale: [1.05, 1.1, 1.05]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-purple-500/30 rounded-[2rem] blur-md pointer-events-none"
          />
          <motion.div 
            style={{ transform: "translateZ(-10px)" }}
            animate={{ 
              y: [15, -15, 15],
              rotate: [-3, -8, -3],
              scale: [1.05, 1.02, 1.05]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-pink-500/20 rounded-[2rem] pointer-events-none"
          />
          <motion.img 
            style={{ transform: "translateZ(50px)" }}
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            src={profilePic} 
            alt={name} 
            className="relative z-10 w-64 h-80 object-cover object-top rounded-[2rem] border border-gray-200/50 dark:border-zinc-800/50 shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:-translate-y-4 group-hover:scale-[1.02]"
          />
        </motion.div>
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
