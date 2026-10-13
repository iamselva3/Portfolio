import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Zap, Shield, Cpu } from 'lucide-react';

const outerRingText = '• REACT 19 • NODE.JS • EXPRESS • MONGODB • AWS S3 • DOCKER • TAILWIND • THREE.JS • RESTful API • JWT AUTH '.repeat(3);
const middleRingText = "const deploy = async () => { await compile(); return { status: 200, runtime: 'READY' }; }; export default Selva; ".repeat(2);
const innerRingText = '01001101 01000101 01010010 01001110 0x7F 0xFF 0x0A 0x3C 01101100 01101111 01110110 01100001 • '.repeat(3);
const coreRingText = "• RUNTIME: ONLINE • PORT 5173 • TLS 1.3 • git commit -m 'Release v1.0' • ".repeat(4);

const radialTokens = [
  'REACT 19',
  'NODE.JS',
  'EXPRESS',
  'MONGODB',
  'AWS S3',
  'RESTful API',
  'JWT AUTH',
  'GEMINI AI',
  'TAILWIND',
  'DOCKER',
  'STATUS: 200',
  'async/await',
  'THREE.JS',
  'FULL STACK',
  'BUILD: OK',
  'deploy()',
];

export default function CodingSplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isWaveOut, setIsWaveOut] = useState(false);
  const [waveRadius, setWaveRadius] = useState(0);
  const canvasRef = useRef(null);

  const codeSnippets = [
    { text: '// Initializing Full Stack Developer Runtime', type: 'comment' },
    { text: 'const developer = { name: "Selvaganesh", role: "Full Stack MERN" };', type: 'code' },
    { text: '> [1/4] Mounting Core: React 19 • Vite • TailwindCSS', type: 'system' },
    { text: '> [2/4] Connecting Services: Node.js • Express • MongoDB', type: 'system' },
    { text: '> [3/4] Initializing Cloud & AI: AWS S3 • Gemini LLM • Razorpay', type: 'system' },
    { text: '> [4/4] Activating 3D Physics & Visual Interaction Engine...', type: 'system' },
    { text: '✓ STATUS 200: SYSTEM FULLY OPERATIONAL. LAUNCHING PORTFOLIO...', type: 'success' },
  ];

  // Matrix code rain animation on canvas (optimized for buttery 60fps)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const chars = '01{}[]<>/=+$*#~SG_MERN_REACT_NODE_MONGO_API_010101';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 8, 18, 0.2)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", "Courier New", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (Math.random() > 0.85) {
          ctx.fillStyle = '#67e8f9';
        } else if (Math.random() > 0.6) {
          ctx.fillStyle = '#38bdf8';
        } else {
          ctx.fillStyle = '#10b981';
        }

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Progression and lines typing sequence
  useEffect(() => {
    const totalDuration = 2800; // ms
    const intervalTime = 35;
    const step = 100 / (totalDuration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + step, 100);
        const lineIdx = Math.floor((next / 100) * codeSnippets.length);
        setCurrentLineIndex(Math.min(lineIdx, codeSnippets.length - 1));

        if (next >= 100) {
          clearInterval(timer);
          triggerWaveOut();
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const triggerWaveOut = () => {
    if (isWaveOut) return;
    setIsWaveOut(true);

    // Animate wave radius from 0 to 160% smoothly
    const startTime = performance.now();
    const duration = 1000; // ms

    const animateWave = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setWaveRadius(eased * 160);

      if (t < 1) {
        requestAnimationFrame(animateWave);
      } else {
        setTimeout(() => {
          onComplete?.();
        }, 50);
      }
    };

    requestAnimationFrame(animateWave);
  };

  const handleSkip = () => {
    triggerWaveOut();
  };

  return (
    <div
      className="fixed inset-0 z-[1000] overflow-hidden select-none bg-[#050811] text-white flex items-center justify-center font-mono"
      style={{
        maskImage: isWaveOut
          ? `radial-gradient(circle at 50% 50%, transparent ${waveRadius}%, black ${waveRadius + 12}%)`
          : 'none',
        WebkitMaskImage: isWaveOut
          ? `radial-gradient(circle at 50% 50%, transparent ${waveRadius}%, black ${waveRadius + 12}%)`
          : 'none',
      }}
    >
      {/* Matrix digital rain canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ${
          isWaveOut ? 'opacity-0' : 'opacity-60'
        }`}
      />

      {/* Cyber grid and radial vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.12)_0%,rgba(5,8,18,0.92)_75%)]" />

      {/* Ambient glowing energy orbs in background */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Center Wave Out visual shockwave: Pure Circular Rings of Coding Words + Exploding Tokens */}
      <AnimatePresence>
        {isWaveOut && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50 overflow-hidden">
            {/* Shockwave Core Flash */}
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 4.5, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-40 h-40 rounded-full bg-gradient-to-r from-cyan-400 via-white to-blue-500 blur-xl"
            />

            {/* Central Terminal Core Message Flash */}
            <motion.div
              initial={{ scale: 0.6, opacity: 1 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="absolute px-4 py-2 rounded-xl bg-cyan-950/90 border border-cyan-400 text-cyan-300 font-mono font-extrabold text-sm shadow-[0_0_25px_#22d3ee] z-10"
            >
              [STATUS 200: LAUNCHING RUNTIME]
            </motion.div>

            {/* Circular Ring 1 (Outer - Cyan, Rotating Clockwise, Expanding) */}
            <motion.div
              initial={{ scale: 0.1, opacity: 1, rotate: 0 }}
              animate={{ scale: 5.2, opacity: 0, rotate: 180 }}
              transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-[1000px] h-[1000px] flex items-center justify-center pointer-events-none will-change-transform"
            >
              <svg viewBox="0 0 1000 1000" className="w-full h-full overflow-visible">
                <defs>
                  <path id="code-circle-1" d="M 500,500 m -430,0 a 430,430 0 1,1 860,0 a 430,430 0 1,0 -860,0" fill="none" />
                </defs>
                <text className="font-mono text-[14px] font-bold fill-cyan-400 tracking-widest">
                  <textPath href="#code-circle-1" startOffset="0%">
                    {outerRingText}
                  </textPath>
                </text>
              </svg>
            </motion.div>

            {/* Circular Ring 2 (Middle - Emerald, Rotating Counter-Clockwise, Expanding) */}
            <motion.div
              initial={{ scale: 0.1, opacity: 0.95, rotate: 0 }}
              animate={{ scale: 5.4, opacity: 0, rotate: -220 }}
              transition={{ duration: 1.1, delay: 0.02, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-[1000px] h-[1000px] flex items-center justify-center pointer-events-none will-change-transform"
            >
              <svg viewBox="0 0 1000 1000" className="w-full h-full overflow-visible">
                <defs>
                  <path id="code-circle-2" d="M 500,500 m -310,0 a 310,310 0 1,1 620,0 a 310,310 0 1,0 -620,0" fill="none" />
                </defs>
                <text className="font-mono text-[12px] font-semibold fill-emerald-400 tracking-wider">
                  <textPath href="#code-circle-2" startOffset="0%">
                    {middleRingText}
                  </textPath>
                </text>
              </svg>
            </motion.div>

            {/* Circular Ring 3 (Inner - Sky Blue, Rotating Clockwise, Expanding) */}
            <motion.div
              initial={{ scale: 0.1, opacity: 0.9, rotate: 0 }}
              animate={{ scale: 5.6, opacity: 0, rotate: 360 }}
              transition={{ duration: 1.15, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-[1000px] h-[1000px] flex items-center justify-center pointer-events-none will-change-transform"
            >
              <svg viewBox="0 0 1000 1000" className="w-full h-full overflow-visible">
                <defs>
                  <path id="code-circle-3" d="M 500,500 m -200,0 a 200,200 0 1,1 400,0 a 200,200 0 1,0 -400,0" fill="none" />
                </defs>
                <text className="font-mono text-[11px] font-bold fill-sky-300 tracking-widest">
                  <textPath href="#code-circle-3" startOffset="0%">
                    {innerRingText}
                  </textPath>
                </text>
              </svg>
            </motion.div>

            {/* Circular Ring 4 (Core - Purple/Indigo, Rotating Counter-Clockwise, Expanding) */}
            <motion.div
              initial={{ scale: 0.1, opacity: 0.9, rotate: 0 }}
              animate={{ scale: 5.8, opacity: 0, rotate: -290 }}
              transition={{ duration: 1.18, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-[1000px] h-[1000px] flex items-center justify-center pointer-events-none will-change-transform"
            >
              <svg viewBox="0 0 1000 1000" className="w-full h-full overflow-visible">
                <defs>
                  <path id="code-circle-4" d="M 500,500 m -110,0 a 110,110 0 1,1 220,0 a 110,110 0 1,0 -220,0" fill="none" />
                </defs>
                <text className="font-mono text-[10px] font-bold fill-purple-300 tracking-wider">
                  <textPath href="#code-circle-4" startOffset="0%">
                    {coreRingText}
                  </textPath>
                </text>
              </svg>
            </motion.div>

            {/* Exploding Radial Code Tokens (Shooting Outward in 360 degrees) */}
            {radialTokens.map((token, idx) => {
              const angle = (idx * (360 / radialTokens.length)) * (Math.PI / 180);
              const targetDist = 780; // px
              const tx = Math.cos(angle) * targetDist;
              const ty = Math.sin(angle) * targetDist;

              return (
                <motion.div
                  key={idx}
                  initial={{ x: 0, y: 0, scale: 0.2, opacity: 1 }}
                  animate={{ x: tx, y: ty, scale: 1.25, opacity: 0 }}
                  transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.02 }}
                  className="absolute px-2.5 py-1 rounded-md bg-zinc-950/90 border border-cyan-400/70 text-cyan-300 text-xs font-mono font-bold whitespace-nowrap pointer-events-none will-change-transform"
                >
                  {token}
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Central Terminal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={isWaveOut ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: isWaveOut ? 0.35 : 0.5, ease: 'easeOut' }}
        className="relative z-20 w-[92vw] max-w-2xl rounded-2xl border border-cyan-500/30 bg-zinc-950/85 backdrop-blur-2xl shadow-[0_0_60px_rgba(6,182,212,0.2),0_25px_50px_-12px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-500/20 bg-zinc-900/60">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            <span className="ml-2 text-xs font-semibold text-cyan-400/90 tracking-wider flex items-center gap-1.5">
              <Terminal size={13} className="text-cyan-400" />
              SELVA-KERNEL // BOOT_SEQUENCE
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              LIVE
            </span>
            <button
              onClick={handleSkip}
              className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/40 transition-all flex items-center gap-1 cursor-pointer"
            >
              <Zap size={11} />
              Skip
            </button>
          </div>
        </div>

        {/* Code Content & Terminal Output */}
        <div className="p-5 sm:p-6 text-xs sm:text-sm space-y-2 min-h-[220px] flex flex-col justify-between">
          <div className="space-y-2.5">
            {codeSnippets.slice(0, currentLineIndex + 1).map((snippet, idx) => {
              let colorClass = 'text-gray-300';
              if (snippet.type === 'comment') colorClass = 'text-gray-500 italic';
              if (snippet.type === 'code') colorClass = 'text-cyan-300 font-semibold';
              if (snippet.type === 'system') colorClass = 'text-blue-400';
              if (snippet.type === 'success') colorClass = 'text-emerald-400 font-bold';

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`flex items-start gap-2 leading-relaxed ${colorClass}`}
                >
                  <span className="text-gray-600 select-none text-[11px] pt-0.5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 break-all sm:break-normal">{snippet.text}</span>
                </motion.div>
              );
            })}

            {/* Glowing typing cursor */}
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-cyan-400 ml-6 shadow-[0_0_8px_#22d3ee]"
            />
          </div>

          {/* Progress Section */}
          <div className="pt-4 mt-2 border-t border-cyan-500/15">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-gray-400 flex items-center gap-1.5">
                <Cpu size={13} className="text-cyan-400" />
                Compiling Portfolio Modules
              </span>
              <span className="text-cyan-400 font-bold tracking-wider">
                {Math.round(progress)}%
              </span>
            </div>

            {/* Glowing Cyber Progress Bar */}
            <div className="relative h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-cyan-500/20">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 rounded-full shadow-[0_0_12px_#22d3ee]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            <div className="flex items-center justify-between mt-3 text-[11px] text-gray-500">
              <span className="flex items-center gap-1">
                <Shield size={11} className="text-emerald-500" /> TLS 1.3 Verified
              </span>
              <span>Selvaganesh • Portfolio 2026</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
