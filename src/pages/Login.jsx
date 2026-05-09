import React, { useState, useEffect, useRef } from 'react';
import { SignInCard } from '../components/ui/travel-connect-signin';

/* ── Gold particles for background consistency ─── */
function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; const ctx = c.getContext('2d');
    if (!c) return;
    c.width = window.innerWidth; c.height = window.innerHeight;
    const pts = Array.from({length:40}, () => ({
      x: Math.random()*c.width, y: Math.random()*c.height,
      r: Math.random()*1.2+0.2, vx:(Math.random()-0.5)*0.2,
      vy:-Math.random()*0.3-0.1, o:Math.random()*0.4+0.1,
    }));
    let id;
    const draw = () => {
      ctx.clearRect(0,0,c.width,c.height);
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if (p.y<-5) { p.y=c.height; p.x=Math.random()*c.width; }
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(212,175,55,${p.o})`; ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    const rs = () => { c.width=window.innerWidth; c.height=window.innerHeight; };
    window.addEventListener('resize', rs);
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', rs); };
  }, []);
  return <canvas ref={ref} style={{ position:'fixed',top:0,left:0,pointerEvents:'none',zIndex:0, opacity: 0.5 }}/>;
}

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-[#080604] p-4 relative overflow-hidden">
      <Particles />
      {/* Decorative Gold Glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-yellow-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-900/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-5xl">
        <SignInCard isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
      </div>
    </div>
  );
}
