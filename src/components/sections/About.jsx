import AnimatedSection from '../ui/AnimatedSection';
import { portfolioData } from '../../data/portfolioData';
import AnimatedSignature from '../ui/AnimatedSignature';

export default function About() {
  return (
    <AnimatedSection id="about">
      <h2 className="text-3xl font-bold mb-8">About Me</h2>
      <div className="bg-gray-50 dark:bg-zinc-900/50 p-8 md:p-10 rounded-2xl border border-gray-100 dark:border-zinc-800 flex flex-col justify-between shadow-sm">
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line mb-8">
          {portfolioData.about.summary}
        </p>

        <div className="pt-6 border-t border-gray-200/60 dark:border-zinc-800/80 flex justify-end">
          <AnimatedSignature className="w-44 sm:w-56 h-auto" />
        </div>
      </div>
    </AnimatedSection>
  );
}
