import { ExternalLink, Code2 } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import { portfolioData } from '../../data/portfolioData';

export default function Projects() {
  return (
    <AnimatedSection id="projects">
      <h2 className="text-3xl font-bold mb-8">Selected Projects</h2>
      
      <div className="flex flex-col gap-12">
        {portfolioData.projects.map((project) => (
          <div key={project.id} id={`project-${project.id}`} className="gravity-target group flex flex-col md:flex-row gap-8 items-center bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 transition-all hover:shadow-xl dark:hover:shadow-black/50">
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl font-bold">{project.title}</h3>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-400"><strong>Problem:</strong> {project.problem}</p>
                <p className="text-gray-800 dark:text-gray-200"><strong>Solution:</strong> {project.solution}</p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tech.map((t, i) => (
                  <span key={i} className="gravity-target px-3 py-1 bg-gray-100 dark:bg-zinc-800 text-sm rounded-full font-medium">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 pt-4">
                <a href={project.liveLink} className="flex items-center gap-2 text-sm font-bold hover:text-blue-500 transition-colors">
                  <ExternalLink size={16} /> Live Demo
                </a>
                <a href={project.demoLink} className="flex items-center gap-2 text-sm font-bold hover:text-blue-500 transition-colors">
                  <Code2 size={16} /> Source Code
                </a>
              </div>
            </div>
            <div className="flex-1 w-full aspect-video bg-gray-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center overflow-hidden border border-gray-200 dark:border-zinc-700">
              <span className="text-gray-400 dark:text-zinc-500 font-medium">Project Preview</span>
            </div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
