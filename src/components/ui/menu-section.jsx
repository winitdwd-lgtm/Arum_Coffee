import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Crown, ShoppingCart, Search, Info, Plus, Sparkles, Coffee } from 'lucide-react';

const IMGS = {
  'Hot Coffee':       'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80',
  'Cold Coffee':      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80',
  'Frappuccino':      'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80',
  'Tea & Refreshers': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
  'Bakes & Breakfast':'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80',
  'Quick Bites':      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80',
  'Specials':         'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80',
  'Merchandise':      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80',
};

function MenuCard({ item, addToCart, index }) {
  const [size, setSize] = useState(item.sizes?.[0] ?? null);
  const [added, setAdded] = useState(false);
  const cardRef = useRef(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), { stiffness: 150, damping: 20 });

  function onMouseMove(e) {
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const handleAdd = () => {
    addToCart(item, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const img = IMGS[item.category] || IMGS['Hot Coffee'];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.8 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="menu-card-premium relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-white/[0.02] border border-white/5 flex flex-col group cursor-default"
    >
      <div className="absolute inset-0 z-0">
        <motion.img 
          src={img} 
          className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
          alt={item.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
      </div>

      <div className="relative z-10 flex flex-col h-full p-8 justify-end" style={{ transform: "translateZ(50px)" }}>
        <div className="flex items-center gap-3 mb-3">
          {item.isBestseller && (
            <motion.span 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-yellow-600 text-black text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-xl shadow-yellow-600/20"
            >
              Legendary
            </motion.span>
          )}
          <span className="text-white/40 text-[8px] font-bold uppercase tracking-[0.3em]">{item.category}</span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-2 font-cursive leading-tight group-hover:text-yellow-500 transition-colors line-clamp-2">
          {item.name}
        </h3>
        
        <p className="text-gray-400 text-[11px] leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 line-clamp-2">
          {item.desc}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-white tracking-tighter">₹{size?.price ?? item.price}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
              added ? 'bg-green-600 text-white' : 'bg-yellow-600 hover:bg-yellow-500 text-black'
            }`}
          >
            {added ? <span className="text-xs font-black">✓</span> : <Plus size={20} />}
          </motion.button>
        </div>
      </div>

      {item.sizes && (
        <div className="absolute top-6 right-6 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transform: "translateZ(30px)" }}>
          {item.sizes.map(s => (
            <button
              key={s.name}
              onClick={(e) => { e.stopPropagation(); setSize(s); }}
              className={`w-8 h-8 rounded-lg text-[9px] font-black border transition-all flex items-center justify-center ${
                size?.name === s.name ? 'bg-white text-black border-white' : 'bg-black/40 text-white border-white/20'
              }`}
            >
              {s.name[0]}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

const MENU_ITEMS = [
  /* ── HOT COFFEE ── */
  { id:1,  name:'Bengaluru Filter Kaapi',  desc:'Traditional South Indian drip, frothed to perfection with local estate beans.', price:'120', category:'Hot Coffee', isVeg:true, isBestseller:true, sizes:[{name:'Short',price:'120'},{name:'Tall',price:'150'}] },
  { id:2,  name:'Vanilla Bean Latte',      desc:'Espresso, steamed milk & real Madagascar vanilla pods.', price:'220', category:'Hot Coffee', isVeg:true, isBestseller:false, sizes:[{name:'Tall',price:'220'},{name:'Grande',price:'250'},{name:'Venti',price:'280'}] },
  { id:3,  name:'Caramel Macchiato',       desc:'Freshly steamed milk with vanilla-flavored syrup marked with espresso and topped with a caramel drizzle.', price:'280', category:'Hot Coffee', isVeg:true, isBestseller:true, sizes:[{name:'Tall',price:'280'},{name:'Grande',price:'310'},{name:'Venti',price:'340'}] },
  { id:4,  name:'Caffè Americano',         desc:'Espresso shots topped with hot water create a light layer of crema.', price:'180', category:'Hot Coffee', isVeg:true, isBestseller:false, sizes:[{name:'Short',price:'180'},{name:'Tall',price:'210'},{name:'Grande',price:'240'}] },
  { id:5,  name:'Flat White',              desc:'Smooth ristretto shots of espresso with steamed whole milk.', price:'260', category:'Hot Coffee', isVeg:true, isBestseller:false, sizes:[{name:'Short',price:'260'},{name:'Tall',price:'290'}] },
  { id:6,  name:'White Chocolate Mocha',   desc:'Espresso, white chocolate sauce and steamed milk finished with sweetened whipped cream.', price:'310', category:'Hot Coffee', isVeg:true, isBestseller:false, sizes:[{name:'Tall',price:'310'},{name:'Grande',price:'340'},{name:'Venti',price:'370'}] },

  /* ── COLD COFFEE ── */
  { id:7,  name:'Quantum Cold Brew',       desc:'18-hour hyper-caffeinated precision drip brew.', price:'250', category:'Cold Coffee', isVeg:true, isBestseller:true, sizes:[{name:'Tall',price:'250'},{name:'Grande',price:'280'}] },
  { id:8,  name:'Nitro Cold Brew',         desc:'Cold brew infused with nitrogen for a naturally sweet flavor and cascading crema.', price:'320', category:'Cold Coffee', isVeg:true, isBestseller:true, sizes:[{name:'Tall',price:'320'},{name:'Grande',price:'350'}] },
  { id:9,  name:'Iced Caramel Macchiato',  desc:'Chilled milk with vanilla syrup, marked with espresso and caramel drizzle.', price:'290', category:'Cold Coffee', isVeg:true, isBestseller:false, sizes:[{name:'Tall',price:'290'},{name:'Grande',price:'320'},{name:'Venti',price:'350'}] },
  { id:10, name:'Iced Shaken Espresso',    desc:'Espresso shaken with ice and a touch of sweetness.', price:'240', category:'Cold Coffee', isVeg:true, isBestseller:false, sizes:[{name:'Tall',price:'240'},{name:'Grande',price:'270'}] },

  /* ── FRAPPUCCINO ── */
  { id:11, name:'Java Chip Frappuccino',   desc:'Mocha sauce and Frappuccino chips blended with coffee, milk and ice.', price:'340', category:'Frappuccino', isVeg:true, isBestseller:true, sizes:[{name:'Tall',price:'340'},{name:'Grande',price:'380'},{name:'Venti',price:'410'}] },
  { id:12, name:'Caramel Frappuccino',     desc:'Caramel syrup blended with coffee, milk and ice, topped with whipped cream.', price:'320', category:'Frappuccino', isVeg:true, isBestseller:true, sizes:[{name:'Tall',price:'320'},{name:'Grande',price:'360'},{name:'Venti',price:'390'}] },
  { id:13, name:'Strawberry Crème Frappe', desc:'Strawberry sauce, milk and ice blended together and finished with whipped cream.', price:'310', category:'Frappuccino', isVeg:true, isBestseller:false, sizes:[{name:'Tall',price:'310'},{name:'Grande',price:'350'}] },
  { id:14, name:'Vanilla Bean Frappe',     desc:'Vanilla bean, milk and ice blended together and topped with whipped cream.', price:'290', category:'Frappuccino', isVeg:true, isBestseller:false, sizes:[{name:'Tall',price:'290'},{name:'Grande',price:'330'}] },

  /* ── TEA & REFRESHERS ── */
  { id:15, name:'Matcha Tea Latte',        desc:'Smooth and creamy matcha sweetened and served with steamed milk.', price:'260', category:'Tea & Refreshers', isVeg:true, isBestseller:true, sizes:[{name:'Tall',price:'260'},{name:'Grande',price:'290'}] },
  { id:16, name:'Iced Peach Green Tea',    desc:'Green tea blended with peach-flavored juice and shaken with ice.', price:'220', category:'Tea & Refreshers', isVeg:true, isBestseller:false, sizes:[{name:'Tall',price:'220'},{name:'Grande',price:'250'}] },
  { id:17, name:'Mango Dragonfruit Refresher', desc:'Sweet mango and dragonfruit flavors shaken with ice and real fruit pieces.', price:'280', category:'Tea & Refreshers', isVeg:true, isBestseller:true, sizes:[{name:'Tall',price:'280'},{name:'Grande',price:'310'}] },
  { id:18, name:'Strawberry Açaí Refresher', desc:'Sweet strawberry flavors accented by passion fruit and açaí notes.', price:'280', category:'Tea & Refreshers', isVeg:true, isBestseller:true, sizes:[{name:'Tall',price:'280'},{name:'Grande',price:'310'}] },

  /* ── BAKES & BREAKFAST ── */
  { id:19, name:'Butter Croissant',        desc:'Classic flaky, golden croissant baked fresh.', price:'180', category:'Bakes & Breakfast', isVeg:true, isBestseller:true },
  { id:20, name:'Chocolate Croissant',     desc:'Two batons of semi-sweet chocolate wrapped in a flaky croissant.', price:'210', category:'Bakes & Breakfast', isVeg:true, isBestseller:false },
  { id:21, name:'Bacon & Gouda Sandwich',  desc:'Sizzling applewood-smoked bacon, melted Gouda and a frittata on an artisan roll.', price:'320', category:'Bakes & Breakfast', isVeg:false, isBestseller:true },
  { id:22, name:'Spinach & Feta Wrap',     desc:'Egg whites, spinach, feta cheese and sun-dried tomato cream cheese in a whole-wheat wrap.', price:'280', category:'Bakes & Breakfast', isVeg:true, isBestseller:false },
  { id:23, name:'Blueberry Muffin',        desc:'Bursting with fresh blueberries and topped with a sugar-fresco crunch.', price:'160', category:'Bakes & Breakfast', isVeg:true, isBestseller:false },
  { id:24, name:'Banana Nut Loaf',         desc:'Moist banana bread with crunchy walnuts.', price:'150', category:'Bakes & Breakfast', isVeg:true, isBestseller:false },

  /* ── QUICK BITES ── */
  { id:25, name:'Tomato & Mozzarella Panini', desc:'Roasted tomatoes, mozzarella, spinach and basil pesto on toasted focaccia.', price:'290', category:'Quick Bites', isVeg:true, isBestseller:true },
  { id:26, name:'Turkey & Pesto Panini',   desc:'Roasted turkey, provolone cheese and basil pesto on sourdough.', price:'340', category:'Quick Bites', isVeg:false, isBestseller:false },
  { id:27, name:'Tandoori Paneer Sandwich',desc:'Spicy paneer with bell peppers in a toasted ciabatta.', price:'260', category:'Quick Bites', isVeg:true, isBestseller:true },
  { id:28, name:'Smoked Chicken Baguette', desc:'Smoked chicken breast with Swiss cheese and honey mustard.', price:'310', category:'Quick Bites', isVeg:false, isBestseller:false },

  /* ── SPECIALS ── */
  { id:29, name:'Classic Affogato',        desc:'Two shots of espresso poured over a scoop of vanilla bean ice cream.', price:'250', category:'Specials', isVeg:true, isBestseller:false },
  { id:30, name:'Pumpkin Spice Latte',    desc:'Our signature espresso and steamed milk with the celebrated flavor of pumpkin, cinnamon and nutmeg.', price:'340', category:'Specials', isVeg:true, isBestseller:true, sizes:[{name:'Tall',price:'340'},{name:'Grande',price:'370'},{name:'Venti',price:'400'}] },

  /* ── MERCHANDISE ── */
  { id:31, name:'Ceramic Aurum Mug',       desc:'Hand-crafted minimalist 12oz mug with gold signature logo.', price:'850', category:'Merchandise', isVeg:null, isBestseller:true },
  { id:32, name:'Stainless Steel Tumbler', desc:'Double-walled insulation keeps drinks hot or cold for hours.', price:'1850', category:'Merchandise', isVeg:null, isBestseller:false },
  { id:33, name:'Pike Place Whole Bean',   desc:'Well-rounded roast with subtle notes of cocoa and toasted nuts. 250g.', price:'750', category:'Merchandise', isVeg:null, isBestseller:true },
];

const CATS = ['All','Hot Coffee','Cold Coffee','Frappuccino','Tea & Refreshers','Bakes & Breakfast','Quick Bites','Specials','Merchandise'];

export function MenuSection({ addToCart }) {
  const [activeCat, setActiveCat] = useState('All');
  const [brewing, setBrewing] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = MENU_ITEMS.filter(i => {
    const mc = activeCat === 'All' || i.category === activeCat;
    const ms = !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.desc.toLowerCase().includes(search.toLowerCase());
    return mc && ms;
  });

  const changeCat = cat => {
    if (cat === activeCat) return;
    setBrewing(true);
    setTimeout(() => { setActiveCat(cat); setBrewing(false); }, 500);
  };

  return (
    <section id="menu" className="w-full py-32 px-4 md:px-8 xl:px-16 relative">
      <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
        <Coffee size={200} className="text-yellow-600" />
      </div>

      <div className="text-center mb-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 mb-6 bg-yellow-600/10 border border-yellow-600/20 px-6 py-2 rounded-full"
        >
          <Sparkles size={14} className="text-yellow-600" />
          <span className="text-yellow-600 text-[10px] font-black uppercase tracking-[0.4em]">Curated Selection</span>
        </motion.div>
        <h2 className="font-cursive text-7xl md:text-[9rem] font-bold gradient-gold-text mb-6 leading-none">The Menu</h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed uppercase tracking-widest font-bold">Inspired by the world's finest roasteries.</p>
      </div>

      <div className="relative max-w-2xl mx-auto mb-16 z-20 group">
        <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-yellow-600 transition-colors pointer-events-none"/>
        <input 
          type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="What are you craving today?"
          className="w-full bg-white/[0.03] border border-white/10 rounded-[2rem] pl-16 pr-8 py-6 text-white placeholder-gray-600 text-lg focus:outline-none focus:border-yellow-600/40 focus:bg-white/[0.05] transition-all backdrop-blur-xl shadow-2xl"
        />
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-10 mb-10 justify-start lg:justify-center relative z-10">
        {CATS.map(cat => (
          <motion.button 
            key={cat} onClick={() => changeCat(cat)} 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`whitespace-nowrap px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
              activeCat===cat ? 'bg-yellow-600 border-yellow-600 text-black shadow-2xl shadow-yellow-600/40' : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {brewing ? (
          <motion.div key="brew" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0}}
            className="flex flex-col items-center justify-center py-40 gap-6">
            <div className="w-16 h-16 border-[3px] border-yellow-600 border-t-transparent rounded-full animate-spin shadow-2xl shadow-yellow-600/20"/>
            <p className="text-yellow-600 text-[10px] font-black tracking-[0.5em] uppercase animate-pulse">Brewing Brilliance…</p>
          </motion.div>
        ) : (
          <motion.div 
            key={activeCat+search}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
          >
            {filtered.map((item, i) => <MenuCard key={item.id} item={item} addToCart={addToCart} index={i} />)}
            {filtered.length === 0 && (
              <div className="col-span-full py-40 text-center">
                <Coffee size={60} className="mx-auto text-gray-800 mb-6" />
                <p className="text-gray-600 text-lg font-cursive">No matches for your craving.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
