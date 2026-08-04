import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { usePreference } from '../../context/PreferenceContext';
import AnimatedSection from '../ui/AnimatedSection';
import { portfolioData } from '../../data/portfolioData';
import { ArrowRight, Download, Mail } from 'lucide-react';
import portrait2 from '../../assets/2.png';
import portrait3 from '../../assets/3.png';
import portrait4 from '../../assets/4.png';
import './hero.css';

// ─── SVG Tech Icons (inline for glow + crisp rendering) ─────────────────────

const ReactIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="2.5" fill="#61DAFB"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none" opacity="0.8"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none" opacity="0.8" transform="rotate(60 12 12)"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none" opacity="0.8" transform="rotate(120 12 12)"/>
  </svg>
);

const NodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="none" stroke="#68A063" strokeWidth="1.2"/>
    <path d="M12 2v20M3 7l9 5 9-5M3 17l9-5 9 5" stroke="#68A063" strokeWidth="0.8" opacity="0.6"/>
    <text x="12" y="14" textAnchor="middle" fill="#68A063" fontSize="6" fontWeight="bold">N</text>
  </svg>
);

const TypeScriptIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="#3178C6" strokeWidth="1.2"/>
    <text x="12" y="16" textAnchor="middle" fill="#3178C6" fontSize="10" fontWeight="bold">TS</text>
  </svg>
);

const DockerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="10" width="4" height="3" rx="0.5" stroke="#2496ED" strokeWidth="0.8"/>
    <rect x="8" y="10" width="4" height="3" rx="0.5" stroke="#2496ED" strokeWidth="0.8"/>
    <rect x="13" y="10" width="4" height="3" rx="0.5" stroke="#2496ED" strokeWidth="0.8"/>
    <rect x="8" y="6" width="4" height="3" rx="0.5" stroke="#2496ED" strokeWidth="0.8"/>
    <rect x="13" y="6" width="4" height="3" rx="0.5" stroke="#2496ED" strokeWidth="0.8"/>
    <path d="M1 14c2 3 6 5 11 5s9-2 11-5" stroke="#2496ED" strokeWidth="1.2" fill="none" opacity="0.5"/>
  </svg>
);

const AWSIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 16c0-1 1-2 2-2h12c1 0 2 1 2 2" stroke="#FF9900" strokeWidth="1.2" fill="none"/>
    <path d="M7 14V8c0-2 2-4 5-4s5 2 5 4v6" stroke="#FF9900" strokeWidth="1" fill="none" opacity="0.6"/>
    <circle cx="12" cy="11" r="2" fill="none" stroke="#FF9900" strokeWidth="0.8"/>
    <text x="12" y="22" textAnchor="middle" fill="#FF9900" fontSize="5" fontWeight="bold">AWS</text>
  </svg>
);

const MongoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2C12 2 8 6 8 12s4 10 4 10 4-4 4-10S12 2 12 2z" fill="none" stroke="#47A248" strokeWidth="1.2"/>
    <line x1="12" y1="6" x2="12" y2="20" stroke="#47A248" strokeWidth="0.8" opacity="0.5"/>
  </svg>
);

const PostgresIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="7" rx="8" ry="4" fill="none" stroke="#336791" strokeWidth="1.1"/>
    <path d="M4 7v10c0 2.2 3.6 4 8 4s8-1.8 8-4V7" stroke="#336791" strokeWidth="1.1" fill="none"/>
    <ellipse cx="12" cy="12" rx="8" ry="4" fill="none" stroke="#336791" strokeWidth="0.7" opacity="0.4"/>
  </svg>
);

const GitIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="7" cy="7" r="2" fill="none" stroke="#F05032" strokeWidth="1.2"/>
    <circle cx="17" cy="7" r="2" fill="none" stroke="#F05032" strokeWidth="1.2"/>
    <circle cx="12" cy="17" r="2" fill="none" stroke="#F05032" strokeWidth="1.2"/>
    <line x1="7" y1="9" x2="12" y2="15" stroke="#F05032" strokeWidth="1" opacity="0.6"/>
    <line x1="17" y1="9" x2="12" y2="15" stroke="#F05032" strokeWidth="1" opacity="0.6"/>
  </svg>
);

// ─── Floating Tech Icon Positions ───────────────────────────────────────────

const techIcons = [
  { Icon: ReactIcon,      label: 'React',      top: '5%',  left: '15%',  delay: 0,   parallax: 25 },
  { Icon: NodeIcon,       label: 'Node.js',    top: '12%', right: '8%',  delay: 0.8, parallax: 30 },
  { Icon: TypeScriptIcon, label: 'TypeScript',  top: '40%', left: '2%',   delay: 0.4, parallax: 20 },
  { Icon: DockerIcon,     label: 'Docker',     bottom: '25%', left: '10%', delay: 1.2, parallax: 35 },
  { Icon: AWSIcon,        label: 'AWS',        top: '30%', right: '3%',  delay: 0.6, parallax: 28 },
  { Icon: MongoIcon,      label: 'MongoDB',    bottom: '10%', right: '15%', delay: 1.0, parallax: 22 },
  { Icon: PostgresIcon,   label: 'PostgreSQL', bottom: '8%',  left: '25%', delay: 1.4, parallax: 32 },
  { Icon: GitIcon,        label: 'Git',        top: '8%',  left: '55%',  delay: 0.2, parallax: 18 },
];

// ─── Particles data ─────────────────────────────────────────────────────────

const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${10 + Math.random() * 80}%`,
  top: `${20 + Math.random() * 60}%`,
  size: 2 + Math.random() * 2,
  duration: 4 + Math.random() * 6,
  delay: Math.random() * 4,
}));

// ─── Animation Variants ─────────────────────────────────────────────────────

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Component ──────────────────────────────────────────────────────────────

// Each source PNG frames the subject differently, so `object-fit: contain` (which
// fits the CANVAS, not the person) renders them at very different sizes. The
// scale/x/y below are derived from each file's measured alpha mask so that every
// portrait ends up with:
//   - the TORSO centred horizontally in every shot
//   - the frame filled top to bottom, with no dead space under the subject
// Note the goal is a matching amount of VISIBLE BODY, not an identical bounding
// box: a mask that reaches the bottom edge can still look empty if the silhouette
// tapers, so 3.png is scaled past a strict height-match (see its comment).
// The anchor choice matters. The bounding-box centre is dragged sideways by
// outstretched arms (2.png's arms are up, so its box centre sits well right of
// the man himself). Head-top anchoring is no better: the head is 36% of the
// subject in 3.png but only 6% in 4.png, so it rides the tall-headed shots
// upward and leaves dead space underneath. The torso median-x is stable across
// all three poses, so that is what gets centred.
// All use transform-origin 50% 50% — scaling from an off-centre origin would
// re-introduce the drift these values correct for.
const heroImages = [
  {
    id: 1,
    src: portrait3,
    alt: 'Selvaganesh — Cloud & AI Developer',
    // 1080x2057 canvas, subject in the top half; raised hand well above shoulder.
    // Scaled harder than a pure height-match would give: this is a waist-up crop
    // whose silhouette tapers off toward the bottom (36% of the box width at the
    // last row vs ~78% for 2.png), which read as empty space under him. Pushing
    // the narrow tail past the frame lets the wide torso fill the visible area.
    // y is set so the raised hand sits just above the pagination dots.
    scale: 2.3,
    x: '2.02%',
    y: '34%',
    glowColor: 'rgba(14, 165, 233, 0.38)', // Cyan
  },
  {
    id: 2,
    src: portrait2,
    alt: 'Selvaganesh — Full Stack Developer',
    // 1080x1256 canvas, subject fills it; both arms raised beside the head
    scale: 1.147,
    x: '0.46%',
    y: '1.23%',
    glowColor: 'rgba(59, 130, 246, 0.38)', // Cyber Blue
  },
  {
    id: 3,
    src: portrait4,
    alt: 'Selvaganesh — Software Engineer',
    // 1536x1024 canvas, subject small and right-of-centre; tight standing crop
    scale: 2.649,
    x: '-2.28%',
    y: '-7.64%',
    glowColor: 'rgba(99, 102, 241, 0.38)', // Indigo
  },
];

export default function Hero() {
  const { recruiterMode } = usePreference();
  const { resumeLink } = portfolioData.hero;

  // ── Image cycling (every 10s) ──
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const activeImg = heroImages[currentImage];

  // ── Mouse Parallax ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { damping: 50, stiffness: 300 };
  const smoothX = useSpring(mouseX, springCfg);
  const smoothY = useSpring(mouseY, springCfg);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX - innerWidth / 2) / (innerWidth / 2));
      mouseY.set((e.clientY - innerHeight / 2) / (innerHeight / 2));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Create parallax transforms for different layers
  const createParallax = (intensity) => ({
    x: useTransform(smoothX, [-1, 1], [intensity, -intensity]),
    y: useTransform(smoothY, [-1, 1], [intensity, -intensity]),
  });

  const layerSlow = createParallax(10);
  const layerMed  = createParallax(20);
  const layerFast = createParallax(35);

  return (
    <AnimatedSection id="hero" className="!py-0">
      <section className="hero-section">
        {/* Background layers */}
        <div className="hero-grid-bg" />
        <div className="hero-glow hero-glow--primary" />
        <div className="hero-glow hero-glow--secondary" />
        <div className="hero-glow hero-glow--accent" />

        {/* Particles */}
        {!recruiterMode && particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        {/* Main Content Grid */}
        <div className="hero-content">

          {/* ─────── LEFT COLUMN: Text + CTAs ─────── */}
          <motion.div
            className="hero-left"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Label */}
            <motion.div variants={fadeUp}>
              <span className="hero-label">FULL STACK DEVELOPER</span>
            </motion.div>

            {/* Heading */}
            <motion.h1 variants={fadeUp} className="hero-heading">
              Building scalable web applications with{' '}
              <span className="hero-heading-accent">clean code</span> &amp;{' '}
              <span className="hero-heading-accent">modern technologies.</span>
            </motion.h1>

            {/* Description */}
            <motion.p variants={fadeUp} className="hero-description">
              I'm Selvaganesh, a Full Stack Developer focused on building fast, 
              scalable and accessible web applications using React, Node.js, 
              TypeScript, PostgreSQL and Cloud technologies.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="hero-cta-group">
              <a href="#projects" className="hero-btn hero-btn-primary gravity-target">
                View Projects <ArrowRight size={18} />
              </a>
              <a href="#contact" className="hero-btn hero-btn-secondary gravity-target">
                <Mail size={18} /> Contact Me
              </a>
              {resumeLink && (
                <a
                  href={resumeLink}
                  download="Selvaganesh_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-btn hero-btn-glass gravity-target"
                >
                  <Download size={18} /> Download Resume
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* ─────── RIGHT COLUMN: Visual Composition ─────── */}
          <div className="hero-right">
            <motion.div
              className="hero-composition"
              style={{ x: layerSlow.x, y: layerSlow.y }}
            >
              {/* Neural Network Lines (SVG) */}
              {!recruiterMode && (
                <svg className="neural-lines" viewBox="0 0 520 520" preserveAspectRatio="xMidYMid meet">
                  <line x1="80" y1="30"  x2="260" y2="160" />
                  <line x1="440" y1="65"  x2="300" y2="180" />
                  <line x1="15" y1="210" x2="160" y2="260" />
                  <line x1="505" y1="160" x2="360" y2="240" />
                  <line x1="55" y1="390" x2="180" y2="320" />
                  <line x1="400" y1="470" x2="320" y2="350" />
                  <line x1="130" y1="470" x2="230" y2="360" />
                  {/* Node dots at intersections */}
                  <circle cx="260" cy="160" r="3" />
                  <circle cx="300" cy="180" r="2.5" />
                  <circle cx="160" cy="260" r="2" />
                  <circle cx="360" cy="240" r="2" />
                  <circle cx="180" cy="320" r="2.5" />
                  <circle cx="320" cy="350" r="3" />
                </svg>
              )}

              {/* Glowing Rings */}
              <motion.div
                className="hero-ring hero-ring--outer"
                style={{ x: layerSlow.x, y: layerSlow.y }}
              />
              <motion.div
                className="hero-ring hero-ring--inner"
                style={{ x: layerMed.x, y: layerMed.y }}
              />

              {/* Portrait — cycles through 4 images every 10s */}
              <motion.div
                className="portrait-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Dynamic Aura Glow behind the person */}
                <div
                  className="portrait-glow-backdrop"
                  style={{
                    background: `radial-gradient(ellipse 58% 58% at 50% 46%, ${activeImg.glowColor} 0%, rgba(59, 130, 246, 0.06) 55%, transparent 80%)`,
                  }}
                />

                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg.id}
                    src={activeImg.src}
                    alt={activeImg.alt}
                    className="portrait-img"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    style={{
                      transformOrigin: '50% 50%',
                      x: activeImg.x,
                      y: activeImg.y,
                    }}
                    initial={{
                      opacity: 0,
                      scale: activeImg.scale * 1.08,
                      filter: 'blur(10px) brightness(0.8)',
                    }}
                    animate={{
                      opacity: 1,
                      scale: activeImg.scale,
                      filter: 'blur(0px) brightness(1.03)',
                    }}
                    exit={{
                      opacity: 0,
                      scale: activeImg.scale * 0.94,
                      filter: 'blur(8px) brightness(0.8)',
                    }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                  />
                </AnimatePresence>
              </motion.div>

              {/* ── Portrait Pagination Indicators ── */}
              <div className="portrait-dots">
                {heroImages.map((img, idx) => (
                  <button
                    key={img.id}
                    className={`portrait-dot ${idx === currentImage ? 'portrait-dot--active' : ''}`}
                    onClick={() => setCurrentImage(idx)}
                    aria-label={`Show portrait ${idx + 1}`}
                  >
                    <span className="portrait-dot__inner" />
                  </button>
                ))}
              </div>

              {/* ── Floating Tech Icons ── */}
              {techIcons.map(({ Icon, label, delay, parallax, ...pos }, i) => {
                const iconParallax = createParallax(parallax);
                return (
                  <motion.div
                    key={label}
                    className="floating-icon"
                    style={{
                      ...pos,
                      x: iconParallax.x,
                      y: iconParallax.y,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.6 + delay,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    title={label}
                  >
                    {!recruiterMode ? (
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 3 + i * 0.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.3,
                        }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Icon />
                      </motion.div>
                    ) : (
                      <Icon />
                    )}
                  </motion.div>
                );
              })}

              {/* ── Glass Card: Code Snippet ── */}
              <motion.div
                className="glass-card glass-card--code"
                style={{
                  top: '2%',
                  right: '0%',
                  x: layerFast.x,
                  y: layerFast.y,
                }}
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.0 }}
              >
                {!recruiterMode ? (
                  <motion.div
                    animate={{ y: [0, -6, 0], rotate: [0, 1, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <span className="code-keyword">const</span>{' '}
                    <span className="code-const">app</span>{' = '}
                    <span className="code-function">express</span>{'()'}
                    <br />
                    <span className="code-keyword">await</span>{' '}
                    <span className="code-function">connectDB</span>{'()'}
                    <br />
                    <span className="code-comment">{'// deploy → AWS'}</span>
                    <br />
                    app.<span className="code-function">listen</span>{'('}
                    <span className="code-const">3000</span>{')'}
                  </motion.div>
                ) : (
                  <div>
                    <span className="code-keyword">const</span>{' '}
                    <span className="code-const">app</span>{' = '}
                    <span className="code-function">express</span>{'()'}
                    <br />
                    <span className="code-keyword">await</span>{' '}
                    <span className="code-function">connectDB</span>{'()'}
                    <br />
                    <span className="code-comment">{'// deploy → AWS'}</span>
                    <br />
                    app.<span className="code-function">listen</span>{'('}
                    <span className="code-const">3000</span>{')'}
                  </div>
                )}
              </motion.div>

              {/* ── Glass Card: Terminal ── */}
              <motion.div
                className="glass-card glass-card--terminal"
                style={{
                  bottom: '2%',
                  left: '-2%',
                  x: layerFast.x,
                  y: layerFast.y,
                }}
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.2 }}
              >
                {!recruiterMode ? (
                  <motion.div
                    animate={{ y: [0, -5, 0], rotate: [0, -1, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  >
                    <div className="terminal-header">
                      <span className="terminal-dot terminal-dot--red" />
                      <span className="terminal-dot terminal-dot--yellow" />
                      <span className="terminal-dot terminal-dot--green" />
                      <span className="terminal-title">Terminal</span>
                    </div>
                    <div className="terminal-line">
                      <span className="terminal-prompt">$ </span>
                      <span className="terminal-cmd">npm run build</span>
                    </div>
                    <div className="terminal-line terminal-output">✓ compiled successfully</div>
                    <div className="terminal-line">
                      <span className="terminal-prompt">$ </span>
                      <span className="terminal-cmd">docker push prod</span>
                    </div>
                    <div className="terminal-line terminal-output">✓ deployed to AWS</div>
                  </motion.div>
                ) : (
                  <div>
                    <div className="terminal-header">
                      <span className="terminal-dot terminal-dot--red" />
                      <span className="terminal-dot terminal-dot--yellow" />
                      <span className="terminal-dot terminal-dot--green" />
                      <span className="terminal-title">Terminal</span>
                    </div>
                    <div className="terminal-line">
                      <span className="terminal-prompt">$ </span>
                      <span className="terminal-cmd">npm run build</span>
                    </div>
                    <div className="terminal-line terminal-output">✓ compiled successfully</div>
                    <div className="terminal-line">
                      <span className="terminal-prompt">$ </span>
                      <span className="terminal-cmd">docker push prod</span>
                    </div>
                    <div className="terminal-line terminal-output">✓ deployed to AWS</div>
                  </div>
                )}
              </motion.div>

              {/* ── Glass Card: Stats Dashboard ── */}
              <motion.div
                className="glass-card glass-card--stats"
                style={{
                  bottom: '10%',
                  right: '0%',
                  x: layerMed.x,
                  y: layerMed.y,
                }}
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.4 }}
              >
                {!recruiterMode ? (
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  >
                    <div className="stats-title">Performance</div>
                    <div className="stats-row">
                      <span className="stats-label">API</span>
                      <div className="stats-bar"><div className="stats-bar-fill" style={{ width: '92%' }} /></div>
                    </div>
                    <div className="stats-row">
                      <span className="stats-label">UI</span>
                      <div className="stats-bar"><div className="stats-bar-fill" style={{ width: '88%' }} /></div>
                    </div>
                    <div className="stats-row">
                      <span className="stats-label">SEO</span>
                      <div className="stats-bar"><div className="stats-bar-fill" style={{ width: '95%' }} /></div>
                    </div>
                  </motion.div>
                ) : (
                  <div>
                    <div className="stats-title">Performance</div>
                    <div className="stats-row">
                      <span className="stats-label">API</span>
                      <div className="stats-bar"><div className="stats-bar-fill" style={{ width: '92%' }} /></div>
                    </div>
                    <div className="stats-row">
                      <span className="stats-label">UI</span>
                      <div className="stats-bar"><div className="stats-bar-fill" style={{ width: '88%' }} /></div>
                    </div>
                    <div className="stats-row">
                      <span className="stats-label">SEO</span>
                      <div className="stats-bar"><div className="stats-bar-fill" style={{ width: '95%' }} /></div>
                    </div>
                  </div>
                )}
              </motion.div>

            </motion.div>
          </div>

        </div>
      </section>
    </AnimatedSection>
  );
}
