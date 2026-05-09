import React, { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, ArrowRight, Coffee } from "lucide-react";
import { motion } from "framer-motion";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    className={cn("flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50", className)}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";

const DotMap = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const routes = [
    { start: { x: 100, y: 150, delay: 0 }, end: { x: 200, y: 80, delay: 2 }, color: "#d4af37" },
    { start: { x: 200, y: 80, delay: 2 }, end: { x: 260, y: 120, delay: 4 }, color: "#d4af37" },
    { start: { x: 50, y: 50, delay: 1 }, end: { x: 150, y: 180, delay: 3 }, color: "#d4af37" },
    { start: { x: 280, y: 60, delay: 0.5 }, end: { x: 180, y: 180, delay: 2.5 }, color: "#d4af37" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
      canvas.width = width;
      canvas.height = height;
    });
    ro.observe(canvas.parentElement);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dots = [];
    const gap = 12;
    for (let x = 0; x < dimensions.width; x += gap) {
      for (let y = 0; y < dimensions.height; y += gap) {
        const w = dimensions.width, h = dimensions.height;
        const inShape =
          ((x < w*0.25 && x > w*0.05) && (y < h*0.4 && y > h*0.1)) ||
          ((x < w*0.25 && x > w*0.15) && (y < h*0.8 && y > h*0.4)) ||
          ((x < w*0.45 && x > w*0.3) && (y < h*0.35 && y > h*0.15)) ||
          ((x < w*0.5 && x > w*0.35) && (y < h*0.65 && y > h*0.35)) ||
          ((x < w*0.7 && x > w*0.45) && (y < h*0.5 && y > h*0.1)) ||
          ((x < w*0.8 && x > w*0.65) && (y < h*0.8 && y > h*0.6));
        if (inShape && Math.random() > 0.3) dots.push({ x, y, opacity: Math.random() * 0.5 + 0.1 });
      }
    }
    let id; let startTime = Date.now();
    function animate() {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      dots.forEach(d => {
        ctx.beginPath(); ctx.arc(d.x, d.y, 1, 0, Math.PI*2);
        ctx.fillStyle = `rgba(212,175,55,${d.opacity})`; ctx.fill();
      });
      const t = (Date.now() - startTime) / 1000;
      routes.forEach(r => {
        const el = t - r.start.delay; if (el <= 0) return;
        const p = Math.min(el / 3, 1);
        const x = r.start.x + (r.end.x - r.start.x) * p;
        const y = r.start.y + (r.end.y - r.start.y) * p;
        ctx.beginPath(); ctx.moveTo(r.start.x, r.start.y); ctx.lineTo(x, y);
        ctx.strokeStyle = r.color; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI*2);
        ctx.fillStyle = "#f5deb3"; ctx.fill();
        ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI*2);
        ctx.fillStyle = "rgba(212,175,55,0.25)"; ctx.fill();
      });
      if (t > 15) startTime = Date.now();
      id = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(id);
  }, [dimensions]);

  return <div className="relative w-full h-full overflow-hidden"><canvas ref={canvasRef} className="absolute inset-0 w-full h-full" /></div>;
};

export const SignInCard = ({ isSignUp, setIsSignUp }) => {
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex w-full h-full items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl overflow-hidden rounded-2xl flex bg-[#090b13] text-white shadow-2xl border border-yellow-900/20"
      >
        <div className="hidden md:block w-1/2 h-[620px] relative overflow-hidden border-r border-[#1f2130]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f1120] to-[#151929]">
            <DotMap />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10">
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-6">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center shadow-lg shadow-yellow-600/40">
                  <Coffee className="text-white h-7 w-7" />
                </div>
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                className="text-3xl font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200"
                style={{ fontFamily: "'Dancing Script', cursive" }}>
                Aurum Coffee
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                className="text-sm text-center text-gray-400 max-w-xs leading-relaxed">
                Sign in to earn rewards, redeem free drinks, and unlock exclusive member perks.
              </motion.p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "'Dancing Script', cursive" }}>
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-gray-400 mb-6 text-sm">{isSignUp ? "Join the Aurum Rewards family." : "Sign in to your account"}</p>

            <button className="w-full flex items-center justify-center gap-2 bg-[#13151f] border border-[#2a2d3a] rounded-lg p-3 hover:bg-[#1a1d2b] transition-all duration-300 mb-5">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#2a2d3a]"></div></div>
              <div className="relative flex justify-center text-xs"><span className="px-2 bg-[#090b13] text-gray-500">or</span></div>
            </div>

            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              {isSignUp && (
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Full Name</label>
                  <Input type="text" placeholder="John Doe" className="bg-[#13151f] border-[#2a2d3a] placeholder:text-gray-600 text-gray-200 w-full" />
                </div>
              )}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Email <span className="text-yellow-500">*</span></label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="bg-[#13151f] border-[#2a2d3a] placeholder:text-gray-600 text-gray-200 w-full" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Password <span className="text-yellow-500">*</span></label>
                <div className="relative">
                  <Input type={showPwd ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="bg-[#13151f] border-[#2a2d3a] placeholder:text-gray-600 text-gray-200 w-full pr-10" />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-300">
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)} className="pt-1">
                <button type="submit" className={cn("w-full relative overflow-hidden bg-gradient-to-r from-yellow-600 to-yellow-800 hover:from-yellow-500 hover:to-yellow-700 text-white py-2.5 rounded-lg transition-all duration-300 font-semibold text-sm flex items-center justify-center gap-2", hovered ? "shadow-lg shadow-yellow-600/30" : "")}>
                  {isSignUp ? "Create Account" : "Sign In"} <ArrowRight size={16} />
                  {hovered && (
                    <motion.span initial={{ left: "-100%" }} animate={{ left: "100%" }} transition={{ duration: 1, ease: "easeInOut" }}
                      className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ filter: "blur(8px)" }} />
                  )}
                </button>
              </motion.div>
              <p className="text-center text-xs text-gray-500 mt-1">
                <a href="#" className="text-yellow-500 hover:text-yellow-400 transition-colors">Forgot password?</a>
              </p>
            </form>

            <p className="mt-5 text-center text-sm text-gray-500">
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <button onClick={() => setIsSignUp(!isSignUp)} className="font-semibold text-yellow-400 hover:text-yellow-300">
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
