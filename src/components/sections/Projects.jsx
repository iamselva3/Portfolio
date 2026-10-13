import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ExternalLink,
  Code2,
  ArrowRight,
  Zap,
  Layers,
  ShieldCheck,
  CheckCircle2,
  X,
  ChevronRight,
  Cpu,
  Database,
  Server,
  Globe,
  Clock,
} from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import { portfolioData } from '../../data/portfolioData';

// ─── 3D Interactive Card Component ──────────────────────────────────────────

const ProjectCard = ({ project, index, onSelect }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);

  const glowBackground = useTransform(
    [mouseXSpring, mouseYSpring],
    (values) => {
      const mx = values[0];
      const my = values[1];
      const posX = (mx + 0.5) * 100;
      const posY = (my + 0.5) * 100;
      return `radial-gradient(500px circle at ${posX}% ${posY}%, rgba(59, 130, 246, 0.18), transparent 50%)`;
    }
  );

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

  const hasLiveLink = project.liveLink && project.liveLink !== '#';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="group relative flex flex-col rounded-[2rem] border border-gray-200/80 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl p-2 transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)] cursor-pointer"
      onClick={() => onSelect(project)}
    >
      <div
        style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
        className="relative flex flex-1 flex-col overflow-hidden rounded-[1.7rem] bg-white dark:bg-zinc-900/90 shadow-lg border border-gray-100 dark:border-white/5"
      >
        {/* Glow backdrop tracking mouse */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: glowBackground }}
        />

        {/* Card Header & Media Preview */}
        <div className="relative p-3 pb-0" style={{ transform: 'translateZ(20px)' }}>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-800/50 border border-gray-200/50 dark:border-white/5">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500/10 to-indigo-500/10">
                <Zap className="h-10 w-10 text-blue-500" />
              </div>
            )}

            {/* Badges Overlay */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-blue-600 dark:text-blue-400 border border-blue-500/20 shadow-sm">
                {project.category}
              </span>
              {project.badge && (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 backdrop-blur-md flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {project.status || project.badge}
                </span>
              )}
            </div>

            {/* Hover Action Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[3px]">
              {hasLiveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 text-white font-medium text-xs flex items-center gap-1.5 hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/30 transform translate-y-2 group-hover:translate-y-0"
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(project);
                }}
                className="px-3.5 py-2 rounded-xl bg-white/90 dark:bg-zinc-800 text-gray-900 dark:text-white font-medium text-xs flex items-center gap-1.5 hover:bg-white transition-all transform translate-y-2 group-hover:translate-y-0 shadow-lg cursor-pointer"
              >
                <ArrowRight size={14} className="text-blue-500" />
                Case Study
              </button>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="flex flex-1 flex-col p-5" style={{ transform: 'translateZ(15px)' }}>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors line-clamp-1">
              {project.title}
            </h3>
            <div className="p-1.5 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-2.5 line-clamp-1">
            {project.tagline || 'Full Stack Application'}
          </p>

          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed mb-4">
            {project.solution}
          </p>

          {/* Metric Pill if available */}
          {project.metrics && (
            <div className="mb-4 flex items-center gap-2 p-2 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                {project.metrics.highlight}
              </span>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                {project.metrics.label}
              </span>
            </div>
          )}

          {/* Tech Badges */}
          <div className="mt-auto pt-3 border-t border-gray-100 dark:border-white/5 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((t, i) => (
              <span
                key={i}
                className="rounded-lg bg-gray-100/80 dark:bg-zinc-800/80 px-2 py-0.5 text-[11px] font-medium text-gray-600 dark:text-gray-300 border border-gray-200/40 dark:border-white/5"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="rounded-lg bg-gray-100/50 dark:bg-zinc-800/40 px-1.5 py-0.5 text-[10px] text-gray-500 dark:text-gray-400">
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Project Deep Dive Modal (React Portal, Top-Level Z-Index) ──────────────

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Completely halt background smooth scrolling while modal is open
    window.__lenis?.stop();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.__lenis?.start();
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  if (!project) return null;

  const hasLiveLink = project.liveLink && project.liveLink !== '#';

  const modalContent = (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-hidden overscroll-contain"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Dialog */}
      <motion.div
        data-lenis-prevent
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ type: 'spring', damping: 28, stiffness: 350 }}
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-zinc-950 border border-gray-200 dark:border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden overscroll-contain"
      >
        {/* Sticky Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/10 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2 flex-wrap max-w-[80%]">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              {project.category}
            </span>
            {project.badge && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {project.status || project.badge}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div
          data-lenis-prevent
          className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 overscroll-contain"
          style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-blue-600 dark:text-blue-400 font-medium">
              {project.tagline || 'Full Stack Application Architecture'}
            </p>
          </div>

          {/* Controlled Media Banner */}
          {project.image && (
            <div className="relative h-48 sm:h-64 w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-zinc-900 shadow-inner">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top"
              />
            </div>
          )}

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/30">
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-2 flex items-center gap-1.5">
                <Zap size={14} /> The Problem
              </h4>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-1.5">
                <Cpu size={14} /> The Engineered Solution
              </h4>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Architectural Highlights */}
          {project.highlights && (
            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-zinc-900/60 border border-gray-200/60 dark:border-white/5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Layers size={14} className="text-blue-500" /> Key Architectural Highlights
              </h4>
              <ul className="space-y-2.5">
                {project.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Categorized Tech Breakdown */}
          {project.stackGroup && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-white/5">
                <div className="text-[11px] font-bold text-gray-400 uppercase mb-1 flex items-center gap-1">
                  <Globe size={12} className="text-cyan-500" /> Frontend
                </div>
                <div className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                  {project.stackGroup.frontend.join(' • ')}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-white/5">
                <div className="text-[11px] font-bold text-gray-400 uppercase mb-1 flex items-center gap-1">
                  <Server size={12} className="text-emerald-500" /> Backend
                </div>
                <div className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                  {project.stackGroup.backend.join(' • ')}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-white/5">
                <div className="text-[11px] font-bold text-gray-400 uppercase mb-1 flex items-center gap-1">
                  <Database size={12} className="text-amber-500" /> Database
                </div>
                <div className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                  {project.stackGroup.database.join(' • ')}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-white/5">
                <div className="text-[11px] font-bold text-gray-400 uppercase mb-1 flex items-center gap-1">
                  <Cpu size={12} className="text-purple-500" /> Cloud & AI
                </div>
                <div className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                  {project.stackGroup.cloud.join(' • ')}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-gray-100 dark:border-white/10 bg-gray-50/80 dark:bg-zinc-950/80 backdrop-blur-md shrink-0">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Selvaganesh • MERN Architecture
          </span>
          <div className="flex items-center gap-3">
            {hasLiveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
              >
                <ExternalLink size={15} />
                Launch Live App
              </a>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 text-gray-800 dark:text-gray-200 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

// ─── Flagship Spotlight Banner ──────────────────────────────────────────────

const FlagshipShowcase = ({ project, onSelect }) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative mb-14 overflow-hidden rounded-[2.5rem] border border-blue-500/30 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-cyan-500/5 dark:from-blue-950/30 dark:via-zinc-900/60 dark:to-zinc-950 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left / Info */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500 text-white shadow-md shadow-blue-500/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              FLAGSHIP SPOTLIGHT
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {project.status || 'Production'}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {project.category}
            </span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {project.title}
          </h3>

          <p className="text-base text-blue-600 dark:text-blue-400 font-medium">
            {project.tagline}
          </p>

          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {project.solution}
          </p>

          {/* Key highlights */}
          {project.highlights && (
            <div className="space-y-2 pt-2">
              {project.highlights.slice(0, 2).map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                  <CheckCircle2 size={15} className="text-blue-500 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          )}

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            {project.liveLink && project.liveLink !== '#' && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all cursor-pointer"
              >
                <ExternalLink size={16} />
                Launch Live App
              </a>
            )}
            <button
              onClick={() => onSelect(project)}
              className="px-5 py-2.5 rounded-xl bg-white dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-900 dark:text-white font-semibold text-xs sm:text-sm border border-gray-200 dark:border-white/10 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Layers size={16} className="text-blue-500" />
              View Architecture & Case Study
            </button>
          </div>
        </div>

        {/* Right / Mockup */}
        <div className="lg:col-span-5">
          <div
            onClick={() => onSelect(project)}
            className="group relative cursor-pointer rounded-2xl overflow-hidden border border-gray-200/80 dark:border-white/10 bg-zinc-950 shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
          >
            {/* Browser top chrome */}
            <div className="flex items-center gap-1.5 px-3 py-2 bg-zinc-900 border-b border-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-[10px] text-zinc-500 font-mono ml-2 truncate">
                {project.liveLink || 'https://production-app.vercel.app'}
              </span>
            </div>

            <div className="aspect-[16/10] overflow-hidden bg-zinc-900">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-2">
                <ArrowRight size={14} className="text-cyan-400" />
                Click to explore case study
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Projects Section ──────────────────────────────────────────────────

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    'All',
    'AI & Intelligence',
    'Fintech & Enterprise',
    'E-Commerce',
    'EdTech & Enterprise',
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === selectedCategory);

  const flagshipProject = portfolioData.projects.find((p) => p.featured) || portfolioData.projects[0];

  return (
    <AnimatedSection id="projects" className="relative py-12">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 left-1/4 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 -right-20 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-blue-500 font-semibold text-xs tracking-wider uppercase mb-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span>CASE STUDIES & ENGINEERING HIGHLIGHTS</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            Building Digital Experiences
          </h2>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            A curated showcase of production-grade MERN and AI applications. Designed for resilience, intuitive UX, and mission-critical reliability.
          </p>
        </div>

        {/* Stats counter pill */}
        <div className="flex items-center gap-4 p-3 rounded-2xl bg-gray-50 dark:bg-zinc-900/60 border border-gray-200/60 dark:border-white/5 backdrop-blur-md">
          <div className="text-center px-3 border-r border-gray-200 dark:border-white/10">
            <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
              {portfolioData.projects.length}+
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400">Deployed</div>
          </div>
          <div className="text-center px-3">
            <div className="text-xl font-extrabold text-emerald-500">100%</div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400">Full Stack</div>
          </div>
        </div>
      </div>

      {/* Flagship Spotlight Component */}
      <FlagshipShowcase project={flagshipProject} onSelect={setSelectedProject} />

      {/* Filter Tabs */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100/60 dark:bg-zinc-900/60'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 rounded-xl bg-blue-600 shadow-md shadow-blue-500/25 -z-10"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              {cat}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={setSelectedProject}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Deep Dive Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </AnimatedSection>
  );
}
