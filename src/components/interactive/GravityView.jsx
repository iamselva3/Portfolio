import { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { X } from 'lucide-react';

export default function GravityView({ onClose }) {
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  
  useEffect(() => {
    // Prevent scrolling
    document.body.style.overflow = 'hidden';

    // 1. Setup matter.js Engine and World
    const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint, Composite } = Matter;
    
    // Create engine
    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;
    
    // Create renderer
    const render = Render.create({
      element: containerRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: 'transparent',
        wireframes: false, 
      }
    });
    renderRef.current = render;
    
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // 2. Add static boundaries (floor, walls)
    const thickness = 60;
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    
    const floor = Bodies.rectangle(cw / 2, ch + thickness / 2, cw * 2, thickness, { isStatic: true });
    const wallLeft = Bodies.rectangle(-thickness / 2, ch / 2, thickness, ch * 2, { isStatic: true });
    const wallRight = Bodies.rectangle(cw + thickness / 2, ch / 2, thickness, ch * 2, { isStatic: true });
    
    World.add(world, [floor, wallLeft, wallRight]);

    // 3. Clone real DOM elements with 'gravity-target' into physics bodies
    const targets = Array.from(document.querySelectorAll('.gravity-target'));
    const boxes = [];
    
    targets.forEach(el => {
      // Hide real element but keep it in DOM
      el.style.opacity = '0';
      el.style.pointerEvents = 'none';

      const rect = el.getBoundingClientRect();
      const st = window.getComputedStyle(el);
      let isCircle = false;
      if (st.borderRadius) {
        const rad = parseInt(st.borderRadius);
        if (rad > rect.width * 0.4) isCircle = true;
      }
      
      const bgColor = st.backgroundColor !== 'rgba(0, 0, 0, 0)' ? st.backgroundColor : '#3b82f6';
      
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      
      let body;
      if (isCircle) {
        body = Bodies.circle(cx, cy, rect.width / 2, {
          restitution: 0.8,
          render: { fillStyle: bgColor }
        });
      } else {
        body = Bodies.rectangle(cx, cy, rect.width, rect.height, {
          restitution: 0.6,
          render: { fillStyle: bgColor }
        });
      }
      
      boxes.push(body);
    });
    
    World.add(world, boxes);

    // 4. Add Mouse constraint for drag/drop interaction
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    World.add(world, mouseConstraint);
    render.mouse = mouse;

    // Handle resize
    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: window.innerWidth, y: window.innerHeight }
      });
      Matter.Body.setPosition(floor, { x: window.innerWidth / 2, y: window.innerHeight + thickness / 2 });
    };
    window.addEventListener('resize', handleResize);

    // cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = '';
      
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(engine.world);
      Engine.clear(engine);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
      
      targets.forEach(el => {
        el.style.opacity = '1';
        el.style.pointerEvents = 'auto';
      });
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-white/30 dark:bg-zinc-950/30 backdrop-blur-[2px]">
      <div className="absolute inset-0 pointer-events-none">
        <div ref={containerRef} className="absolute inset-0 pointer-events-auto" />
      </div>
      
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-[110] flex items-center gap-2 px-4 py-2 bg-red-600 shadow-xl text-white rounded-full font-bold hover:bg-red-700 transition"
      >
        <X size={16} /> Reset Layout
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110] px-4 py-2 bg-black/80 text-white dark:bg-white/80 dark:text-black rounded-full font-medium text-sm pointer-events-none shadow-xl">
        Gravity Mode Active! Drag and throw elements.
      </div>
    </div>
  );
}
