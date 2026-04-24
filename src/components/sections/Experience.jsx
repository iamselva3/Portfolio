import AnimatedSection from '../ui/AnimatedSection';
import { portfolioData } from '../../data/portfolioData';

export default function Experience() {
  return (
    <AnimatedSection id="experience">
      <h2 className="text-3xl font-bold mb-8">Experience & Education</h2>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">Experience</h3>
          <div className="space-y-8">
            {portfolioData.experience.map((exp, idx) => (
              <div key={idx} className="relative pl-6 border-l border-gray-200 dark:border-zinc-800">
                <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[6.5px] top-1.5" />
                <h4 className="font-bold text-lg">{exp.role}</h4>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{exp.company} | {exp.period}</div>
                <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">Education</h3>
          <div className="space-y-8">
            {portfolioData.education.map((edu, idx) => (
              <div key={idx} className="relative pl-6 border-l border-gray-200 dark:border-zinc-800">
                <div className="absolute w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full -left-[6.5px] top-1.5" />
                <h4 className="font-bold text-lg">{edu.degree}</h4>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{edu.institution} | {edu.period}</div>
                <p className="text-gray-700 dark:text-gray-300">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
