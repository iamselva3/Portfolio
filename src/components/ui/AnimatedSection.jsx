import { motion } from 'framer-motion';
import { usePreference } from '../../context/PreferenceContext';
import { cn } from '../../utils/cn';

export default function AnimatedSection({ 
  children, 
  id, 
  className,
  delay = 0 
}) {
  const { recruiterMode } = usePreference();

  if (recruiterMode) {
    return (
      <section id={id} className={cn("py-20", className)}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={cn("py-20", className)}
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
