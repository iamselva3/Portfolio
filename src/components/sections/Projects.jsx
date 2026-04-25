import { ExternalLink, Code2, ArrowRight } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import { portfolioData } from '../../data/portfolioData';

export default function Projects() {
  return (
    <AnimatedSection id="projects">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Selected Projects</h2>
        <p className="text-gray-600 dark:text-gray-400">Hover to view project details and previews.</p>
      </div>
      
      <div className="flex flex-col border-t border-gray-200 dark:border-zinc-800">
        {portfolioData.projects.map((project) => (
          <div 
            key={project.id} 
            id={`project-${project.id}`} 
            className="gravity-target group relative border-b border-gray-200 dark:border-zinc-800 py-6 md:py-8 transition-colors hover:bg-gray-50/50 dark:hover:bg-zinc-800/30 px-4 md:px-6 -mx-4 md:-mx-6 rounded-2xl"
          >
            
            {/* Always visible Header/Summary */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-default">
              <div className="space-y-3 max-w-3xl">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {project.title}
                </h3>
                {/* Focus on Tech Stack initially */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-xs md:text-sm rounded-full font-medium text-gray-700 dark:text-gray-300 transition-colors group-hover:border-blue-200 dark:group-hover:border-blue-900/50">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="hidden md:flex items-center text-gray-400 group-hover:text-blue-500 transition-colors shrink-0">
                <div className="w-10 h-10 rounded-full border border-current flex items-center justify-center transition-transform group-hover:translate-x-2 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500">
                  <ArrowRight size={18} />
                </div>
              </div>
            </div>

            {/* Expandable Content Area */}
            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
              <div className="overflow-hidden">
                <div className="flex flex-col md:flex-row gap-8 pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-[50ms]">
                  
                  {/* Left Side: Description & Links */}
                  <div className="flex-1 flex flex-col justify-between space-y-6">
                    <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                      {project.problem} {project.solution}
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <a href={project.liveLink} target='_blank' rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/20 transition-all hover:-translate-y-0.5">
                        <ExternalLink size={16} /> Live Demo
                      </a>
                      <a href={project.demoLink} target='_blank' rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5">
                        <Code2 size={16} /> Source Code
                      </a>
                    </div>
                  </div>

                  {/* Right Side: Image */}
                  <div className="w-full md:w-[45%] shrink-0">
                    <div className="w-full h-48 md:h-64 bg-gray-50 dark:bg-zinc-900 rounded-xl flex items-center justify-center overflow-hidden border border-gray-200 dark:border-zinc-800 relative shadow-lg transform transition-all duration-700 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={`${project.title} Preview`}
                          draggable={false}
                          onContextMenu={(e) => e.preventDefault()}
                          className="pointer-events-none select-none w-full h-full object-contain p-2 transition-transform duration-1000 scale-105 group-hover:scale-100"
                        />
                      ) : (
                        <span className="text-gray-400 dark:text-zinc-500 text-sm font-medium">Project Preview</span>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
