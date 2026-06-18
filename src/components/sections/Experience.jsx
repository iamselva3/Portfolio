import { motion } from 'framer-motion';
import AnimatedSection from '../ui/AnimatedSection';
import { portfolioData } from '../../data/portfolioData';

const cardVariants = {
  hidden: { opacity: 0, y: 30, rotateX: -8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

function TimelineItem({ item, index, isExperience }) {
  const isPresent = /present/i.test(item.period || '');
  const title = isExperience ? item.role : item.degree;
  const subtitle = isExperience ? item.company : item.institution;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -4, rotateX: 3, rotateY: -3 }}
      style={{ transformStyle: 'preserve-3d', transformPerspective: 1000 }}
      className="relative pl-6 border-l border-gray-200 dark:border-zinc-800 transition-shadow"
    >
      <span
        className={
          'absolute w-3 h-3 rounded-full -left-[6.5px] top-1.5 ' +
          (isPresent
            ? 'bg-blue-500'
            : isExperience
            ? 'bg-blue-500/70'
            : 'bg-gray-300 dark:bg-gray-600')
        }
      >
        {isPresent && (
          <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping" />
        )}
      </span>

      <div className="flex items-center gap-2 flex-wrap">
        <h4 className="font-bold text-lg">{title}</h4>
        {isPresent && (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 text-[11px] font-semibold border border-blue-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Current
          </span>
        )}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        {subtitle} | {item.period}
      </div>
      <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <AnimatedSection id="experience">
      <h2 className="text-3xl font-bold mb-8">Experience & Education</h2>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">Experience</h3>
          <div className="space-y-8" style={{ perspective: 1000 }}>
            {portfolioData.experience.map((exp, idx) => (
              <TimelineItem key={idx} item={exp} index={idx} isExperience />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">Education</h3>
          <div className="space-y-8" style={{ perspective: 1000 }}>
            {portfolioData.education.map((edu, idx) => (
              <TimelineItem key={idx} item={edu} index={idx} isExperience={false} />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
