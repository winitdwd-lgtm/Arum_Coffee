import { GitFork, Globe, Link2, Mail, MapPin, Phone, Share2, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

const SOCIAL = [
  { icon: Link2,   label: 'LinkedIn',  href: 'https://in.linkedin.com/in/vineet-dharwad-3a8a50389', color: '#0a66c2' },
  { icon: GitFork, label: 'GitHub',    href: 'https://github.com/winitdwd-lgtm',                    color: '#f0f6ff' },
  { icon: Share2,  label: 'Twitter',   href: 'https://twitter.com',                                  color: '#1d9bf0' },
  { icon: Globe,   label: 'Instagram', href: 'https://instagram.com',                                color: '#e1306c' },
];

const MENU_LINKS = [
  { label: 'Hot Coffee',       href: '#menu' },
  { label: 'Cold Coffee',      href: '#menu' },
  { label: 'Frappuccino',      href: '#menu' },
  { label: 'Bakes & Desserts', href: '#menu' },
  { label: 'Quick Bites',      href: '#menu' },
  { label: 'Specials',         href: '#menu' },
];

const QUICK_LINKS = [
  { label: 'Our Menu',       href: '#menu'  },
  { label: 'Visit Us',       href: '#visit' },
  { label: 'Sign In',        href: '/login' },
  { label: 'Cart',           href: '/cart'  },
  { label: 'FAQs',           href: '#'      },
  { label: 'Live Chat',      href: '#', ping: true },
];

const CONTACT = [
  { icon: Mail,    text: 'winit.dwd@gmail.com',          href: 'mailto:winit.dwd@gmail.com'    },
  { icon: Phone,   text: '+91 80 4123 5678',             href: 'tel:+918041235678'              },
  { icon: MapPin,  text: '100 Feet Rd, Indiranagar\nBengaluru, KA 560038', href: '#visit'      },
];

export default function Footer() {
  return (
    <footer className="relative z-50 w-full" style={{ background: 'linear-gradient(180deg, #080604 0%, #050403 100%)' }}>

      {/* ── NEWSLETTER BAND ── */}
      <div className="relative border-t border-white/8 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #d4af37, transparent)' }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #d4af37, transparent)' }} />

        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">

            {/* Text */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }} className="max-w-md">
              <p className="text-yellow-600 text-xs tracking-[0.3em] uppercase mb-3">Stay in the loop</p>
              <h3 className="font-cursive text-3xl md:text-4xl font-bold text-white mb-2">
                Brew updates, right to your inbox.
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Exclusive deals, new seasonal drinks, and loyalty rewards — delivered fresh.
              </p>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1, ease: [0.16,1,0.3,1] }}
              className="w-full md:w-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input type="email" placeholder="your@email.com"
                  className="flex-1 sm:w-64 bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-600/60 text-sm transition-all" />
                <motion.button whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }}
                  className="bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded-xl px-8 py-3.5 text-sm transition-all shadow-lg shadow-yellow-600/30 shrink-0">
                  Subscribe
                </motion.button>
              </div>
              <p className="text-gray-600 text-xs mt-2 text-center sm:text-left">No spam. Unsubscribe anytime.</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 h-10 w-10 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-600/20 shrink-0">
                <Coffee className="text-black h-5 w-5" />
              </div>
              <span className="font-cursive text-2xl font-bold text-white">Aurum Coffee</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-7">
              Liquid gold, brewed daily. A premium craft coffee experience rooted in passion and local provenance — right in the heart of Bengaluru.
            </p>
            <div className="flex gap-3">
              {SOCIAL.map(({ icon: Icon, label, href, color }) => (
                <motion.a key={label} href={href} target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.9 }}
                  title={label}
                  className="group w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-500 transition-all hover:border-yellow-600/40 hover:bg-yellow-600/10 hover:text-yellow-400">
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Menu column */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <h4 className="font-cursive text-lg font-bold text-white mb-6">Menu</h4>
            <ul className="space-y-3">
              {MENU_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href}
                    className="hover-underline text-gray-500 hover:text-yellow-400 text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-yellow-600/30 group-hover:bg-yellow-500 transition-colors" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick links */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h4 className="font-cursive text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ label, href, ping }) => (
                <li key={label}>
                  <a href={href} className="text-gray-500 hover:text-yellow-400 text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-yellow-600/30 group-hover:bg-yellow-500 transition-colors" />
                    {label}
                    {ping && (
                      <span className="relative flex h-2 w-2 ml-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-500" />
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
            <h4 className="font-cursive text-lg font-bold text-white mb-6">Contact Us</h4>
            <ul className="space-y-5">
              {CONTACT.map(({ icon: Icon, text, href }) => (
                <li key={text}>
                  <a href={href}
                    className="flex items-start gap-3 text-gray-500 hover:text-yellow-400 transition-colors group">
                    <div className="mt-0.5 w-8 h-8 rounded-lg bg-yellow-600/10 border border-yellow-600/20 flex items-center justify-center shrink-0 group-hover:bg-yellow-600/20 transition-colors">
                      <Icon size={14} className="text-yellow-600" />
                    </div>
                    <span className="text-sm whitespace-pre-line leading-relaxed">{text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-600 text-xs">&copy; {new Date().getFullYear()} Aurum Coffee. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(t => (
              <a key={t} href="#" className="text-gray-600 hover:text-yellow-500 text-xs transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </div>

      {/* ── BUILT BY ── */}
      <div className="border-t border-white/5 py-4 text-center">
        <p className="text-gray-600 text-xs tracking-wider">
          Crafted with ☕ & ❤️ by{' '}
          <a href="https://in.linkedin.com/in/vineet-dharwad-3a8a50389" target="_blank" rel="noreferrer"
            className="text-yellow-600 hover:text-yellow-400 font-semibold transition-colors">
            Vineet D.
          </a>
        </p>
      </div>
    </footer>
  );
}
