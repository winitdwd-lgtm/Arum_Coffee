import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  
  // Outer ring with softer lag
  const sx = useSpring(x, { stiffness: 80, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 80, damping: 20, mass: 0.5 });

  const [big, setBig] = useState(false);
  const [active, setActive] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const mv = e => { 
      x.set(e.clientX); 
      y.set(e.clientY); 
      if(!active) setActive(true); 

      // Occasional sparkle trail
      if (Math.random() > 0.85) {
        setSparkles(prev => [...prev.slice(-10), { id: Date.now(), x: e.clientX, y: e.clientY }]);
      }
    };
    
    const ov = e => { 
      const target = e.target.closest('button, a, input, [data-hover], .menu-card-premium');
      if (target) setBig(true);
    };
    const ou = () => setBig(false);

    window.addEventListener('mousemove', mv);
    window.addEventListener('mouseover', ov);
    window.addEventListener('mouseout', ou);
    
    return () => {
      window.removeEventListener('mousemove', mv);
      window.removeEventListener('mouseover', ov);
      window.removeEventListener('mouseout', ou);
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      {/* Sparkle Trail */}
      <AnimatePresence>
        {sparkles.map(s => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0, y: 10 }}
            exit={{ opacity: 0 }}
            className="fixed pointer-events-none z-[99998] w-1 h-1 bg-yellow-500 rounded-full"
            style={{ left: s.x, top: s.y }}
          />
        ))}
      </AnimatePresence>

      {/* Main Ring */}
      <motion.div 
        style={{ left: sx, top: sy }} 
        className={`cursor-ring flex items-center justify-center ${big ? 'grow' : ''}`}
      >
        <AnimatePresence>
          {big && (
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="text-[8px] font-black text-yellow-600 uppercase tracking-tighter"
            >
              Explore
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Center Dot */}
      <motion.div 
        style={{ left: x, top: y }} 
        className="cursor-dot" 
      >
        <div className="absolute inset-0 bg-yellow-400 blur-[2px] opacity-50" />
      </motion.div>
    </>
  );
}
