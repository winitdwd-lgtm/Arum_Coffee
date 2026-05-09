import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Float } from '@react-three/drei';
import CoffeeScene from '../CoffeeScene';
import Footer from '../components/ui/footer';
import { MenuSection } from '../components/ui/menu-section';
import { useCartStore } from '../store/useCartStore';
import { Leaf, Sparkles, ChevronDown, MousePointer2 } from 'lucide-react';

/* ── Cinematic Background Particles ─── */
function FloatingBeans() {
  const [beans, setBeans] = useState([]);
  useEffect(() => {
    setBeans(Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10
    })));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
      {beans.map(bean => (
        <motion.div
          key={bean.id}
          initial={{ opacity: 0, y: '110vh', x: `${bean.x}vw` }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            y: '-10vh',
            rotate: [0, 360]
          }}
          transition={{ 
            duration: bean.duration,
            repeat: Infinity,
            delay: bean.delay,
            ease: "linear"
          }}
          className="absolute"
          style={{ width: bean.size, height: bean.size }}
        >
          <div className="w-full h-full bg-yellow-900/40 rounded-full blur-[2px]" />
        </motion.div>
      ))}
    </div>
  );
}

/* ── Scroll Progress Bar ─── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

/* ── Reveal Wrapper ─── */
function Reveal({ children, delay = 0, x = 0, y = 40 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Hero Overlay ─── */
function HeroOverlay() {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center pointer-events-none">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative"
        >
          <h1 className="font-cursive text-[8rem] md:text-[12rem] font-bold gradient-gold-text leading-none select-none drop-shadow-2xl">
            Aurum
          </h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 1, duration: 1.5 }}
            className="h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent absolute bottom-10"
          />
        </motion.div>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-gray-400 tracking-[1em] text-xs md:text-sm uppercase font-bold mt-4"
        >
          The liquid gold experience
        </motion.p>
      </div>

      <div className="absolute bottom-12 flex flex-col items-center gap-4 pointer-events-auto cursor-pointer group">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-yellow-600/50 text-[10px] font-black uppercase tracking-[0.4em] group-hover:text-yellow-500 transition-colors"
        >
          Begin Journey
        </motion.p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-yellow-600"
        >
          <ChevronDown size={24} />
        </motion.div>
      </div>
      
      {/* Interactive mouse hint */}
      <div className="absolute left-10 bottom-10 hidden lg:flex items-center gap-3 text-[10px] text-gray-600 font-bold tracking-widest uppercase">
        <MousePointer2 size={14} className="text-yellow-600" />
        <span>Interact with scene</span>
      </div>
    </div>
  );
}

/* ── Cinematic Section Content ─── */
function MainContent() {
  const addToCart = useCartStore(s => s.addToCart);

  return (
    <div className="relative z-10 bg-[#050505]">
      {/* Parallax Stats */}
      <section className="relative py-32 border-y border-white/5 overflow-hidden">
        <div className="hero-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
          {[
            { v: "6 AM", l: "Artisanal Dawn", d: 0 },
            { v: "16+", l: "Golden Blends", d: 0.1 },
            { v: "100%", l: "Estate Sourced", d: 0.2 },
            { v: "★ 4.9", l: "Connoisseur's Choice", d: 0.3 },
          ].map((s, i) => (
            <Reveal key={i} delay={s.d} className="text-center group">
              <div className="font-cursive text-6xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-500">{s.v}</div>
              <div className="text-yellow-600/60 text-[10px] font-black uppercase tracking-[0.3em]">{s.l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Menu Journey */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
        <MenuSection addToCart={addToCart} />
      </div>

      {/* Innovation Showcase */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="hero-glow top-0 right-0 opacity-30" />
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <Reveal x={-50} className="flex-1">
            <span className="text-yellow-600 text-xs font-black tracking-[0.5em] uppercase mb-6 block">Our Craft</span>
            <h2 className="font-cursive text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
              Science meets <br /> <span className="gradient-gold-text italic">Soul.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
              We don't just brew coffee. We engineer moments of liquid brilliance, using quantum roasting precision and Karnataka's most rare, single-origin beans.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {[
                { title: "Roasting", desc: "Small batch, high precision" },
                { title: "Sourcing", desc: "Fair trade estates only" }
              ].map((item, i) => (
                <div key={i} className="group cursor-default">
                  <div className="w-10 h-px bg-yellow-600 mb-4 group-hover:w-20 transition-all duration-500" />
                  <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
          
          <Reveal x={50} className="flex-1 relative">
            <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 glass-morphism aspect-[4/5] group">
              <img 
                src="https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=800&q=80" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                alt="Roastery"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-10 left-10 right-10">
                <Sparkles className="text-yellow-600 mb-4" />
                <p className="text-white font-cursive text-3xl">The Roastery Floor</p>
                <p className="text-gray-400 text-xs uppercase tracking-widest mt-2">Indiranagar, Bengaluru</p>
              </div>
            </div>
            {/* Floating decorative elements */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 w-40 h-40 border border-yellow-600/10 rounded-full flex items-center justify-center"
            >
              <div className="w-20 h-20 border border-yellow-600/20 rounded-full" />
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* Map Experience */}
      <section className="py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto rounded-[4rem] overflow-hidden border border-white/5 relative bg-[#0a0a0a] group shadow-2xl">
          <div className="flex flex-col lg:flex-row h-full min-h-[600px]">
            <div className="lg:w-1/3 p-12 md:p-20 flex flex-col justify-center relative z-10">
              <Reveal>
                <p className="text-yellow-600 text-[10px] font-black uppercase tracking-[0.5em] mb-6">Find the Gold</p>
                <h2 className="font-cursive text-5xl md:text-6xl font-bold text-white mb-8">Visit the <br /> Flagship.</h2>
                <div className="space-y-10">
                  <div className="group cursor-pointer">
                    <p className="text-gray-600 text-[9px] uppercase tracking-widest mb-2 font-bold group-hover:text-yellow-600 transition-colors">Location</p>
                    <p className="text-white text-lg font-medium leading-snug">100 Feet Road, Indiranagar <br /> Bengaluru, KA 560038</p>
                  </div>
                  <div className="group cursor-pointer">
                    <p className="text-gray-600 text-[9px] uppercase tracking-widest mb-2 font-bold group-hover:text-yellow-600 transition-colors">Operating Hours</p>
                    <p className="text-white text-lg font-medium leading-snug">6:00 AM — 11:00 PM <br /> <span className="text-yellow-600/50">Every Single Day</span></p>
                  </div>
                </div>
                <motion.a 
                  href="https://maps.google.com" target="_blank"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-12 inline-flex items-center gap-4 bg-yellow-600 hover:bg-yellow-500 text-black px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all"
                >
                  Get Directions
                </motion.a>
              </Reveal>
            </div>
            
            <div className="lg:w-2/3 relative h-[400px] lg:h-auto overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.001696423075!2d77.6389!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzgnMjAuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0 grayscale invert contrast-[1.2] brightness-[0.7]"
                allowFullScreen loading="lazy" title="Aurum Coffee"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-black/40 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative bg-[#050505]">
      <ScrollProgress />
      <FloatingBeans />
      
      {/* 3D Hero Environment */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0806] to-black" />
        <div className="hero-glow bottom-0 left-0" />
        <div className="hero-glow top-0 right-0" />
        
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <ScrollControls pages={1} damping={0.4}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <CoffeeScene />
            </Float>
            <Scroll html style={{ width: '100%' }}>
              <HeroOverlay />
            </Scroll>
          </ScrollControls>
        </Canvas>
      </section>

      <MainContent />
    </main>
  );
}
