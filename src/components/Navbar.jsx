import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Coffee, Zap } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

function MagneticLink({ children, to, isHash = false, onClick }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.4;
    const y = (clientY - (top + height / 2)) * 0.4;
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className="relative px-4 py-2"
    >
      {children}
    </motion.div>
  );

  return isHash ? (
    <a href={to} onClick={onClick} className="block">{content}</a>
  ) : (
    <Link to={to} onClick={onClick} className="block">{content}</Link>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cart = useCartStore((state) => state.cart);
  const location = useLocation();
  const { scrollY } = useScroll();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    return scrollY.onChange((latest) => setIsScrolled(latest > 50));
  }, [scrollY]);

  const navLinks = [
    { name: 'Brew', path: '/', isHash: false },
    { name: 'Roastery', path: '/#visit', isHash: true },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-700 ${
        isScrolled ? 'py-4' : 'py-8'
      }`}
    >
      {/* Dynamic Background */}
      <div className={`absolute inset-0 transition-all duration-700 ${
        isScrolled ? 'bg-black/40 backdrop-blur-3xl border-b border-white/5 opacity-100' : 'opacity-0'
      }`} />

      <div className="max-w-7xl mx-auto px-8 md:px-12 flex items-center justify-between relative z-10">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-4 group">
          <motion.div 
            whileHover={{ rotate: 180, scale: 1.1 }}
            className="w-12 h-12 bg-yellow-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-yellow-600/30 transition-transform duration-500"
          >
            <Coffee size={24} className="text-black" />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-cursive text-3xl font-bold leading-none tracking-tight text-white group-hover:text-yellow-500 transition-colors">Aurum</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[8px] font-black uppercase tracking-[0.5em] text-gray-500">Fine Roastery</span>
              <div className="w-1 h-1 bg-yellow-600 rounded-full animate-pulse" />
            </div>
          </div>
        </Link>

        {/* Desktop Interactive Nav */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex items-center gap-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <MagneticLink to={link.path} isHash={link.isHash}>
                  <span className={`text-[11px] font-black uppercase tracking-[0.3em] transition-colors ${
                    location.pathname === link.path && !link.isHash ? 'text-yellow-500' : 'text-gray-400 hover:text-white'
                  }`}>
                    {link.name}
                  </span>
                  {location.pathname === link.path && !link.isHash && (
                    <motion.div layoutId="nav-underline" className="absolute bottom-0 left-4 right-4 h-0.5 bg-yellow-600 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                  )}
                </MagneticLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6">
            <Link to="/login" className="group relative p-3 text-gray-500 hover:text-white transition-all">
              <User size={20} className="group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-white/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300" />
            </Link>
            
            <Link to="/cart" className="relative flex items-center gap-4 bg-white/5 hover:bg-white/10 px-6 py-3 rounded-2xl transition-all border border-white/5 hover:border-yellow-600/30 group">
              <div className="relative">
                <ShoppingCart size={18} className="text-yellow-600 group-hover:scale-110 transition-transform" />
                {cartItemCount > 0 && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-3 -right-3 bg-yellow-600 text-black text-[9px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-black"
                  >
                    {cartItemCount}
                  </motion.div>
                )}
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Vault</span>
              <Zap size={12} className="text-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </div>

        {/* Mobile Innovation */}
        <button 
          className="md:hidden w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl text-white active:scale-90 transition-all border border-white/5"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Glass Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md md:hidden z-[-1]"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-[80%] h-screen bg-[#080604] border-l border-white/10 p-12 md:hidden flex flex-col justify-between"
            >
              <div className="space-y-12 mt-20">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block group"
                  >
                    <p className="text-[10px] text-yellow-600 font-black uppercase tracking-[0.5em] mb-2 opacity-50">0{navLinks.indexOf(link)+1}</p>
                    <span className="text-5xl font-cursive text-white group-hover:text-yellow-500 transition-colors">{link.name}</span>
                  </Link>
                ))}
              </div>
              
              <div className="space-y-6">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 text-gray-500 hover:text-white">
                  <User size={20} /> <span className="font-bold uppercase tracking-widest text-sm">Account</span>
                </Link>
                <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="w-full bg-yellow-600 text-black py-5 rounded-2xl font-black uppercase tracking-widest text-center block">
                  Check Vault ({cartItemCount})
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
