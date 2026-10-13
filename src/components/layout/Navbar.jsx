import { useState, useEffect } from 'react';
import { Moon, Sun, Terminal, Accessibility, Settings2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { usePreference } from '../../context/PreferenceContext';
import { cn } from '../../utils/cn';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { recruiterMode, setRecruiterMode } = usePreference();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReplaySplash = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.dispatchEvent(new CustomEvent('replay-splash'));
  };

  return (
    <nav className={cn(
      "fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
      isScrolled 
        ? "top-4 w-[calc(100%-2rem)] max-w-5xl rounded-full bg-white/70 dark:bg-zinc-900/70 backdrop-blur-lg border border-gray-200/50 dark:border-zinc-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
        : "top-0 w-full max-w-[100vw] rounded-none bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 shadow-none"
    )}>
      <div className={cn(
        "max-w-6xl mx-auto px-6 flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
        isScrolled ? "h-14" : "h-16"
      )}>
        <button
          onClick={handleReplaySplash}
          className="font-bold text-xl tracking-tight hover:text-blue-500 transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Click to replay Terminal Boot Sequence"
        >
          <span>SG.</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        </button>
        
        <div className="flex items-center gap-3">
          <ul className="hidden md:flex gap-6 text-sm font-medium mr-3">
            <li><a href="#about" className="hover:text-blue-500 transition-colors">About</a></li>
            <li><a href="#experience" className="hover:text-blue-500 transition-colors">Experience</a></li>
            <li><a href="#projects" className="hover:text-blue-500 transition-colors">Projects</a></li>
            <li><a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a></li>
          </ul>

          <button 
            onClick={handleReplaySplash}
            className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 dark:hover:bg-cyan-950/40 border border-transparent hover:border-cyan-500/30 transition-all cursor-pointer"
            aria-label="Replay Coding Splash Screen"
            title="Replay Terminal Boot Intro"
          >
            <Terminal size={16} />
          </button>

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
