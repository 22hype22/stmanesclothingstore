/* ==========================================================================
   St. Mane's Sporting Goods — placeholder catalog data (PREVIEW ONLY)
   Replace this file's contents with a real API/fetch later; the render
   helpers in main.js only depend on the STORE shape below.
   ========================================================================== */
window.STORE = (function () {

  /* Inline SVG icons keyed by category — used as product "photos" for now
     and as category tiles. Kept as raw <svg> strings for zero dependencies. */
  const ICONS = {
    baseball:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M5 6c3 3 3 9 0 12M19 6c-3 3-3 9 0 12"/></svg>',
    basketball:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3v18M5.5 5.5c4 3 9 3 13 0M5.5 18.5c4-3 9-3 13 0"/></svg>',
    football:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 20C2 14 4 4 12 4s10 10 8 16c-6 2-14 2-16 0Z"/><path d="M9 12h6M11 10v4M13 10v4"/></svg>',
    hockey:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 4v11c0 3 2 5 5 5h11"/><path d="M16 17h6M16 20h6"/></svg>',
    soccer:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="m12 7 3 2-1 4h-4l-1-4 3-2Z"/></svg>',
    golf:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M11 3v13M11 3l7 3-7 3"/><circle cx="13" cy="20" r="2"/></svg>',
    footwear:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M2 16c4 0 5-2 7-2l5 2c2 .6 8 .5 8 2v1H2v-3Z"/><path d="M9 14l-1-3 3 1"/></svg>',
    apparel:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M8 3 4 6l2 3 2-1v10h8V8l2 1 2-3-4-3-3 2-3-2Z"/></svg>',
    fitness:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 9v6M6 7v10M18 7v10M21 9v6M6 12h12"/></svg>',
    outdoor:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3 3 19h18L12 3Z"/><path d="m8 12 4 7 4-7"/></svg>'
  };

  /* Each category gets a tinted media background for its product cards. */
  const CAT_TINT = {
    baseball:  ['#e8eef7', '#13294b'],
    basketball:['#fdeee6', '#c8102e'],
    football:  ['#eef3ea', '#2f5233'],
    hockey:    ['#eaf1f6', '#13294b'],
    soccer:    ['#f0f6ee', '#2f5233'],
    golf:      ['#f3f0e3', '#7a6b2e'],
    footwear:  ['#f6ecec', '#c8102e'],
    apparel:   ['#eceff5', '#13294b'],
    fitness:   ['#efe9f3', '#4a2e5a'],
    outdoor:   ['#eaf2ee', '#2f5233']
  };

  /* Colorful gradient "photo" backdrops used behind product/collection art
     until real photography is dropped in. Energetic but kept on-brand. */
  /* Navy + dark-gray family — variety comes from light/dark, not extra hues,
     so it stays on-brand (white bg / navy primary / dark-gray secondary). */
  const GRADS = [
    'linear-gradient(135deg,#172d57,#2e4a86)', /* navy        */
    'linear-gradient(135deg,#2b313c,#4a515f)', /* dark gray   */
    'linear-gradient(135deg,#21406e,#5878a8)', /* steel navy  */
    'linear-gradient(135deg,#353b47,#565e6e)', /* slate gray  */
    'linear-gradient(135deg,#102040,#24467f)', /* deep navy   */
    'linear-gradient(135deg,#3a4150,#626b7c)', /* mid gray    */
    'linear-gradient(135deg,#1f3a6b,#3a5a9a)', /* royal navy  */
    'linear-gradient(135deg,#23262e,#3d4250)'  /* charcoal    */
  ];

  /* Partner brands for the marquee. Swap name for a real <svg>/<img> logo
     later by adding a `logo` field and rendering it in main.js. */
  const BRANDS = [
    { name: 'Carhartt' },
    { name: 'Champion' },
    { name: 'Eddie Bauer' },
    { name: 'Gildan' },
    { name: 'Nike' },
    { name: 'Richardson' },
    { name: 'The North Face' },
    { name: 'Tommy Bahama' },
    { name: 'TravisMathew' },
    { name: 'Bauer' },
    { name: 'AS Colour' }
  ];

  const CATEGORIES = [
    { key: 'baseball',   name: 'Baseball & Softball', count: 142 },
    { key: 'basketball', name: 'Basketball',          count: 86  },
    { key: 'football',   name: 'Football',            count: 73  },
    { key: 'hockey',     name: 'Hockey & Skating',    count: 64  },
    { key: 'soccer',     name: 'Soccer',              count: 58  },
    { key: 'golf',       name: 'Golf',                count: 91  },
    { key: 'footwear',   name: 'Footwear',            count: 120 },
    { key: 'apparel',    name: 'Team Apparel',        count: 210 }
  ];

  const P = [
    { id: 1,  name: 'Pro Series Outfield Glove 12.75"', cat: 'baseball',   catLabel: 'Baseball', price: 189.99, was: null,    cond: 'new',  rating: 4.8, reviews: 64 },
    { id: 2,  name: 'Maple Wood Bat — 33"',             cat: 'baseball',   catLabel: 'Baseball', price: 74.50,  was: 99.00,   cond: 'used', rating: 4.5, reviews: 21 },
    { id: 3,  name: 'Indoor/Outdoor Composite Ball',    cat: 'basketball', catLabel: 'Basketball', price: 39.99, was: null,    cond: 'new',  rating: 4.7, reviews: 113 },
    { id: 4,  name: 'Carbon Speed Hockey Stick',        cat: 'hockey',     catLabel: 'Hockey', price: 129.99, was: 169.99,  cond: 'sale', rating: 4.6, reviews: 38 },
    { id: 5,  name: 'Match Soccer Ball — Size 5',       cat: 'soccer',     catLabel: 'Soccer', price: 32.00,  was: null,    cond: 'new',  rating: 4.4, reviews: 52 },
    { id: 6,  name: 'Tour Cavity-Back Iron Set',        cat: 'golf',       catLabel: 'Golf', price: 549.00, was: null,    cond: 'new',  rating: 4.9, reviews: 27 },
    { id: 7,  name: 'Trail Runner GTX — Men\'s',        cat: 'footwear',   catLabel: 'Footwear', price: 119.95, was: 149.95,  cond: 'sale', rating: 4.6, reviews: 88 },
    { id: 8,  name: 'Home Team Jersey — Custom',        cat: 'apparel',    catLabel: 'Team Apparel', price: 44.99, was: null,    cond: 'new',  rating: 4.8, reviews: 140 },
    { id: 9,  name: 'Adjustable Dumbbell Pair 5–52 lb', cat: 'fitness',    catLabel: 'Fitness', price: 299.00, was: 359.00,  cond: 'sale', rating: 4.7, reviews: 45 },
    { id: 10, name: 'Composite Football — Official',    cat: 'football',   catLabel: 'Football', price: 54.99,  was: null,    cond: 'new',  rating: 4.5, reviews: 33 },
    { id: 11, name: 'Recurve Bow Starter Kit',          cat: 'outdoor',    catLabel: 'Outdoor', price: 159.00, was: null,    cond: 'new',  rating: 4.6, reviews: 19 },
    { id: 12, name: 'Goalie Catch Glove — Pre-Owned',   cat: 'hockey',     catLabel: 'Hockey', price: 89.00,  was: 140.00,  cond: 'used', rating: 4.3, reviews: 12 },
    { id: 13, name: 'Batting Helmet — Matte',           cat: 'baseball',   catLabel: 'Baseball', price: 49.99,  was: null,    cond: 'new',  rating: 4.7, reviews: 61 },
    { id: 14, name: 'Court Low Basketball Shoe',        cat: 'footwear',   catLabel: 'Footwear', price: 99.99,  was: null,    cond: 'new',  rating: 4.5, reviews: 74 },
    { id: 15, name: 'Performance 1/4-Zip Pullover',     cat: 'apparel',    catLabel: 'Team Apparel', price: 58.00, was: 72.00,   cond: 'sale', rating: 4.8, reviews: 96 },
    { id: 16, name: 'Stand Golf Bag — Lightweight',     cat: 'golf',       catLabel: 'Golf', price: 189.99, was: null,    cond: 'new',  rating: 4.6, reviews: 24 }
  ];

  const fmt = (n) => '$' + n.toFixed(2);

  return { ICONS, CAT_TINT, GRADS, BRANDS, CATEGORIES, products: P, fmt };
})();
