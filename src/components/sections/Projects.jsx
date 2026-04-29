import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Code2, ArrowRight, Zap } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import { portfolioData } from '../../data/portfolioData';

const ProjectCard = ({ project, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex flex-col rounded-[2rem] border border-gray-200/50 dark:border-white/10 bg-white/10 dark:bg-zinc-900/10 backdrop-blur-xl p-2 transition-all duration-500 hover:border-blue-500/40"
    >
      <div 
        style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
        className="relative flex flex-1 flex-col overflow-hidden rounded-[1.8rem] bg-white/95 dark:bg-zinc-900/95 shadow-xl"
      >
        {/* Dynamic Glow Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [mouseXSpring, mouseYSpring],
              ([mx, my]) => `radial-gradient(600px circle at ${(mx + 0.5) * 100}% ${(my + 0.5) * 100}%, rgba(59, 130, 246, 0.15), transparent 40%)`
            ),
          }}
        />

        {/* Aesthetic Image Container */}
        <div className="relative p-4 pb-0" style={{ transform: "translateZ(30px)" }}>
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-50 dark:bg-zinc-800/30 border border-gray-100 dark:border-white/5">
            {project.image ? (
              <motion.img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-contain p-4 transition-all duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Zap className="h-8 w-8 text-gray-300 dark:text-zinc-700" />
              </div>
            )}
            
            {/* Minimal Overlay for Links */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4 backdrop-blur-[2px]">
              {project.liveLink && project.liveLink !== "#" && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white text-black hover:bg-blue-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0"
                >
                  <ExternalLink size={20} />
                </a>
              )}
              {project.demoLink && project.demoLink !== "#" && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-zinc-900 text-white hover:bg-blue-600 transition-all transform translate-y-4 group-hover:translate-y-0 delay-75"
                >
                  <Code2 size={20} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col p-6" style={{ transform: "translateZ(20px)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
              {project.title}
            </h3>
            <div className="p-2 rounded-full bg-gray-50 dark:bg-zinc-800/50 group-hover:bg-blue-500 transition-colors">
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {project.solution}
            </p>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5 flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="rounded-lg bg-gray-50 dark:bg-zinc-800/50 px-2.5 py-1 text-[11px] font-semibold text-gray-600 dark:text-gray-400 border border-gray-200/30 dark:border-white/5"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};




export default function Projects() {
  return (
    <AnimatedSection id="projects" className="relative">
      <div className="absolute -top-24 left-0 -z-10 h-64 w-64 rounded-full bg-blue-500/10 blur-[120px]" />
      
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-blue-500 font-semibold mb-2"
          >
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Building Digital Experiences
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            A collection of projects where I've combined design thinking with engineering excellence.
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">10+</p>
            <p className="text-sm text-gray-500">Completed Projects</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioData.projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </AnimatedSection>
  );
}

