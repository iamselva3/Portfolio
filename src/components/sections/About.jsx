import AnimatedSection from '../ui/AnimatedSection';
import { portfolioData } from '../../data/portfolioData';

export default function About() {
  return (
    <AnimatedSection id="about">
      <h2 className="text-3xl font-bold mb-8">About Me</h2>
      <div className="bg-gray-50 dark:bg-zinc-900/50 p-8 rounded-2xl border border-gray-100 dark:border-zinc-800">
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {portfolioData.about.summary}
        </p>
      </div>
    </AnimatedSection>
  );
}
