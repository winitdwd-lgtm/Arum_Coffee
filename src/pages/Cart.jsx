import React, { useState, useEffect, useRef } from 'react';
import { useCartStore } from '../store/useCartStore';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Minus, Plus, Trash2, ArrowLeft, Coffee, MapPin, ShoppingBag, CreditCard, Sparkles, ArrowRight, Zap, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/ui/footer';

/* ── Cinematic Background Particles ─── */
function FloatingBeans() {
  const [beans, setBeans] = useState([]);
  useEffect(() => {
    setBeans(Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 15 + 5,
      delay: Math.random() * 5,
      duration: Math.random() * 12 + 8
    })));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
      {beans.map(bean => (
        <motion.div
          key={bean.id}
          initial={{ opacity: 0, y: '110vh', x: `${bean.x}vw` }}
          animate={{ opacity: [0, 1, 1, 0], y: '-10vh', rotate: [0, 360] }}
          transition={{ duration: bean.duration, repeat: Infinity, delay: bean.delay, ease: "linear" }}
          className="absolute bg-yellow-900/40 rounded-full blur-[1px]"
          style={{ width: bean.size, height: bean.size }}
        />
      ))}
    </div>
  );
}

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCartStore();
  const subtotal = getCartTotal();
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + taxes;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-12 bg-[#050505] relative overflow-hidden">
      <FloatingBeans />
      
      {/* Cinematic Ambient Glows */}
      <div className="fixed -top-20 -right-20 w-[60%] h-[60%] bg-yellow-600/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="fixed -bottom-20 -left-20 w-[50%] h-[50%] bg-yellow-900/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Journey */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
        >
          <div className="flex items-center gap-8">
            <Link to="/" className="group relative w-16 h-16 bg-white/[0.03] hover:bg-yellow-600/10 rounded-[1.5rem] transition-all border border-white/5 hover:border-yellow-600/30 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-600/0 via-yellow-600/0 to-yellow-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <ArrowLeft size={24} className="text-white group-hover:-translate-x-1 transition-transform relative z-10" />
            </Link>
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-6xl md:text-8xl font-bold text-white font-cursive gradient-gold-text leading-none"
              >
                The Vault
              </motion.h1>
              <p className="text-gray-500 text-[10px] font-black tracking-[0.6em] uppercase mt-4">Your Curated Collection of Gold</p>
            </div>
          </div>
          
          <Reveal delay={0.4} y={20}>
            <div className="flex items-center gap-5 bg-white/[0.02] border border-white/5 px-8 py-4 rounded-[2rem] backdrop-blur-3xl shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-600/30">
                <Gift size={20} className="text-black" />
              </div>
              <div>
                <p className="text-yellow-600 text-[9px] font-black uppercase tracking-widest leading-none mb-1">Rewards Status</p>
                <p className="text-white text-xs font-bold uppercase tracking-tighter">Gold Level Active</p>
              </div>
            </div>
          </Reveal>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column: Innovative Item List */}
          <div className="w-full lg:w-[60%] space-y-10">
            <AnimatePresence mode="popLayout">
              {cart.length === 0 ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="rounded-[4rem] p-24 text-center border border-white/5 bg-white/[0.01] backdrop-blur-3xl flex flex-col items-center justify-center min-h-[600px] shadow-2xl relative overflow-hidden"
                >
                  <motion.div 
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-40 h-40 bg-gradient-to-br from-yellow-600/20 to-yellow-900/10 rounded-full flex items-center justify-center mb-12 border border-yellow-600/10 shadow-2xl"
                  >
                    <Coffee size={64} className="text-yellow-600" />
                  </motion.div>
                  
                  <h2 className="text-5xl font-bold text-white mb-6 font-cursive tracking-tight">The Roastery Awaits...</h2>
                  <p className="text-gray-500 mb-14 max-w-sm mx-auto leading-relaxed text-sm tracking-widest uppercase font-medium">
                    Your personal vault is empty. <br /> Discover your first drop of gold.
                  </p>
                  
                  <Link to="/" className="group relative bg-yellow-600 hover:bg-yellow-500 text-black font-black py-6 px-16 rounded-2xl shadow-2xl shadow-yellow-600/30 transition-all active:scale-95 flex items-center gap-4 uppercase tracking-[0.4em] text-[10px]">
                    Explore Menu
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-8">
                  {cart.map((item, idx) => (
                    <motion.div 
                      key={item.cartItemId}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.8 }}
                      layout
                      exit={{ opacity: 0, x: 100, filter: 'blur(20px)' }}
                      className="group relative rounded-[3rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-yellow-600/20 transition-all p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden shadow-2xl"
                    >
                      <div className="flex items-center gap-10 w-full md:w-auto">
                        <div className="relative w-32 h-32 rounded-[2rem] overflow-hidden shrink-0 border border-white/10 shadow-2xl group-hover:scale-105 transition-transform duration-700">
                          <img 
                            src={
                              item.category === 'Hot Coffee' ? 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&q=80' :
                              item.category === 'Cold Coffee' ? 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&q=80' :
                              'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&q=80'
                            } 
                            alt={item.name}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                          />
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <h4 className="text-3xl font-bold text-white group-hover:text-yellow-500 transition-colors font-cursive">{item.name}</h4>
                          </div>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="text-[9px] font-black text-yellow-600 bg-yellow-600/10 px-3 py-1 rounded-lg uppercase tracking-widest border border-yellow-600/20">
                              {item.selectedSize?.name ?? 'Standard'}
                            </span>
                            <span className="text-gray-500 text-[9px] font-bold uppercase tracking-[0.3em]">{item.category}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between w-full md:w-auto gap-12">
                        <div className="flex items-center gap-6 bg-black/60 rounded-[1.5rem] border border-white/5 p-3 px-6 shadow-inner">
                          <button 
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-gray-500 hover:text-white transition-all"
                          >
                            <Minus size={18} />
                          </button>
                          <span className="w-4 text-center font-black text-white text-2xl">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-yellow-600 text-black hover:bg-yellow-500 transition-all shadow-xl shadow-yellow-600/20"
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                        
                        <div className="text-right min-w-[120px]">
                          <p className="text-3xl font-black text-white">₹{item.priceVal * item.quantity}</p>
                          <p className="text-[9px] text-gray-600 font-bold uppercase tracking-tighter mt-1">Fine Brew Pricing</p>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="p-5 text-gray-700 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                        >
                          <Trash2 size={24} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Premium Summary */}
          <div className="w-full lg:w-[40%]">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-[4rem] border border-white/10 bg-white/[0.03] p-12 lg:p-16 sticky top-32 shadow-2xl backdrop-blur-3xl overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                <Coffee size={120} className="text-yellow-600" />
              </div>

              <h3 className="text-4xl font-bold text-white mb-12 font-cursive gradient-gold-text">Summary</h3>
              
              <div className="space-y-10 mb-14">
                <div className="flex justify-between items-center group/line">
                  <span className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px] group-hover/line:text-white transition-colors">Subtotal</span>
                  <span className="text-white font-black text-xl tracking-tight">₹{subtotal}</span>
                </div>
                <div className="flex justify-between items-center group/line">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px] group-hover/line:text-white transition-colors">Brewing Fees</span>
                    <Sparkles size={12} className="text-yellow-600" />
                  </div>
                  <span className="text-white font-black text-xl tracking-tight">₹{taxes}</span>
                </div>
                
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full" />
                
                <div className="flex justify-between items-end pt-4">
                  <div>
                    <span className="text-gray-500 font-black uppercase tracking-[0.3em] text-[10px] block mb-2">Total Selection</span>
                    <span className="text-2xl font-bold text-white opacity-20 line-through">₹{total + 120}</span>
                  </div>
                  <div className="text-right">
                    <motion.span 
                      key={total}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-6xl font-black text-yellow-500 block leading-none tracking-tighter"
                    >
                      ₹{total}
                    </motion.span>
                    <p className="text-[9px] text-gray-600 font-black tracking-[0.5em] uppercase mt-4">Inclusive of all gold</p>
                  </div>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(212,175,55,0.2)" }}
                whileTap={{ scale: 0.97 }}
                disabled={cart.length === 0}
                className="w-full bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-900 disabled:text-gray-800 disabled:cursor-not-allowed text-black font-black py-7 rounded-[2rem] transition-all flex items-center justify-center gap-5 uppercase tracking-[0.4em] text-[11px] shadow-2xl shadow-yellow-600/20"
              >
                Unlock Payment
                <CreditCard size={20} />
              </motion.button>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="mt-12 p-6 bg-white/[0.02] rounded-[2rem] border border-white/5 flex items-center gap-5 group/reward"
              >
                <div className="w-14 h-14 rounded-2xl bg-yellow-600/10 flex items-center justify-center group-hover/reward:bg-yellow-600/20 transition-colors">
                  <Zap size={24} className="text-yellow-600 animate-pulse" />
                </div>
                <div>
                  <p className="text-white text-xs font-black uppercase tracking-widest">Earn 250 Points</p>
                  <p className="text-gray-600 text-[9px] uppercase tracking-tighter mt-1">Exclusive for Aurum vault holders</p>
                </div>
              </motion.div>
              </motion.div>
          </div>
        </div>
      </div>
      
      <div className="mt-40">
        <Footer />
      </div>
    </div>
  );
}

function Reveal({ children, delay = 0, y = 40 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
