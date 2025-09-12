// COMPLETE Configuration with ALL Subcategories from Template

const BASE_URL = 'https://materialbuy.com';
const CDN_URL = 'https://materialbuy.com/';
const DEFAULT_IMAGE = `${BASE_URL}/logo.png`;

// Image URL generator with alt text
const createImageMeta = (imageName, altText, width = 1200, height = 630) => ({
  url: `${CDN_URL}/${imageName}`,
  alt: altText,
  width,
  height,
  type: 'image/jpeg'
});

// Slug generator
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

export const METADATA_CONFIG = {
  //  Homepage 
homepage: {
  title: "Buy Building Materials & Home Improvement Products Online | MaterialBuy",
  description: "MaterialBuy - India's trusted store for building materials, décor, hardware & tools. 10,000+ products, bulk deals & pan-India delivery. Shop online today!",
  keywords: "building materials online, home improvement, hardware store, tools online, décor materials, materialbuy india",
  slug: "",
  canonicalUrl: BASE_URL,
  
  image: {
    url: 'https://materialbuy.com/logo.png',
    alt: 'MaterialBuy - India\'s trusted building materials store online',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://materialbuy.com/logo.png',
    alt: 'Buy Building Materials Online - MaterialBuy India',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://materialbuy.com/logo.png',
    alt: 'MaterialBuy - Building Materials & Home Improvement',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  
  ogTitle: "Buy Building Materials & Home Improvement Products Online | MaterialBuy",
  ogDescription: "India's trusted store for building materials, decor, hardware & tools. 10,000+ products, bulk deals & nationwide delivery.",
  twitterTitle: "Buy Building Materials & Home Improvement Products Online | MaterialBuy",
  twitterDescription: "Shop 10,000+ building materials, decor, hardware & tools online. Bulk deals & pan-India delivery.",
  
  priority: "1.0",
  changefreq: "daily"
},

  //  Categories
  categories: {
   'building-material': {
    title: "Building Materials Online - Paints, Wall Putty, Chemicals & More | MaterialBuy",
    description: "Shop paints, wall putty, tile adhesives, waterproofing & construction chemicals online. Bulk deals & pan-India delivery for all building projects.",
    keywords: "building materials, paints online, wall putty, construction chemicals, tile adhesives, waterproofing, materialbuy",
    slug: "building-material",
    canonicalUrl: `${BASE_URL}/allproducts/building-material`,
    
    image: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/7bb4972f4cf4fbcaa5ad78990eb31d53',
      alt: 'Building Materials - Paints, Wall Putty & Construction Chemicals',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    ogImage: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/7bb4972f4cf4fbcaa5ad78990eb31d53',
      alt: 'Building Materials Online - Paints, Wall Putty, Chemicals & More',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    twitterImage: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/7bb4972f4cf4fbcaa5ad78990eb31d53',
      alt: 'Building Materials Online - Paints, Wall Putty & More | MaterialBuy',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    
    ogTitle: "Building Materials Online - Paints, Wall Putty, Chemicals & More",
    ogDescription: "Buy paints, adhesives, waterproofing & building materials at best prices. Pan-India delivery & bulk deals available.",
    twitterTitle: "Building Materials Online - Paints, Wall Putty & More | MaterialBuy",
    twitterDescription: "Shop paints, adhesives & construction chemicals online. Pan-India delivery.",
    
    priority: "0.9",
    changefreq: "weekly"
    },
    
    'home-decor': {
  title: "Home Décor Materials - Wallpapers, Lighting & Accessories | MaterialBuy",
  description: "Elevate interiors with wallpapers, decorative lighting & home accessories. Stylish designs, premium quality & pan-India delivery.",
  keywords: "home decor, wallpapers online, decorative lighting, home accessories, interior design, materialbuy",
  slug: "decor",
  canonicalUrl: `${BASE_URL}/allproducts/home-decor`,
  
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/2c2c860817c0e128e3a89c98ea43084e',
    alt: 'Home Decor Materials - Wallpapers, Lighting & Interior Accessories',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/2c2c860817c0e128e3a89c98ea43084e',
    alt: 'Home Decor - Wallpapers, Lighting & Accessories Online',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/2c2c860817c0e128e3a89c98ea43084e',
    alt: 'Home Decor - Wallpapers, Lighting & More | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  
  ogTitle: "Home Decor - Wallpapers, Lighting & Accessories Online",
  ogDescription: "Transform interiors with wallpapers, lighting & decor accessories. Stylish & affordable, delivered nationwide.",
  twitterTitle: "Home Decor - Wallpapers, Lighting & More | MaterialBuy",
  twitterDescription: "Shop wallpapers, lighting & decor accessories online. Pan-India delivery.",
  
  priority: "0.9",
  changefreq: "weekly"
},

    
'roofing': {
  title: "Roofing Materials - Shingles, Sheets & Tiles | MaterialBuy",
  description: "Shop durable roofing shingles, tiles, UPVC & FRP sheets. Weatherproof, long-lasting roofing materials delivered across India.",
  keywords: "roofing materials, roofing shingles, roof tiles, UPVC sheets, FRP sheets, roofing supplies, materialbuy",
  slug: "roofing",
  canonicalUrl: `${BASE_URL}/allproducts/roofing`,
  
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/f21f47f263807affa7a3f28452eaa0e6',
    alt: 'Roofing Materials - Shingles, Tiles & Weather-resistant Sheets',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/f21f47f263807affa7a3f28452eaa0e6',
    alt: 'Roofing Materials Online - Tiles, Shingles & Sheets',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/f21f47f263807affa7a3f28452eaa0e6',
    alt: 'Roofing Materials Online - Sheets, Tiles & Shingles',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  
  ogTitle: "Roofing Materials Online - Tiles, Shingles & Sheets",
  ogDescription: "Durable roofing sheets, shingles & tiles for homes & projects. Pan-India delivery.",
  twitterTitle: "Roofing Materials Online - Sheets, Tiles & Shingles",
  twitterDescription: "Buy roofing materials online - shingles, UPVC & FRP sheets. Pan-India delivery.",
  
  priority: "0.9",
  changefreq: "weekly"
},

    
 'flooring': {
  title: "Flooring Materials - Tiles, Wooden & Vinyl Flooring | MaterialBuy",
  description: "Shop stylish tiles, wooden flooring, vinyl & laminate flooring. Durable, elegant & delivered pan-India.",
  keywords: "flooring materials, floor tiles, wooden flooring, vinyl flooring, laminate flooring, ceramic tiles, materialbuy",
  slug: "flooring",
  canonicalUrl: `${BASE_URL}/allproducts/flooring`,
  
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/07160bd98bd85e2340dff8f0a45ddd27',
    alt: 'Flooring Materials - Tiles, Wooden & Vinyl Flooring Options',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/07160bd98bd85e2340dff8f0a45ddd27',
    alt: 'Flooring Materials Online - Tiles, Wooden & Vinyl',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/07160bd98bd85e2340dff8f0a45ddd27',
    alt: 'Flooring Materials - Tiles, Wooden & Vinyl Online',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  
  ogTitle: "Flooring Materials Online - Tiles, Wooden & Vinyl",
  ogDescription: "Premium flooring - tiles, vinyl & wooden options. Durable & elegant with nationwide delivery.",
  twitterTitle: "Flooring Materials - Tiles, Wooden & Vinyl Online",
  twitterDescription: "Shop tiles, vinyl & wooden flooring online. Durable & stylish.",
  
  priority: "0.9",
  changefreq: "weekly"
},

'lighting': {
    title: "Lighting Solutions - LED Lights, Fixtures & Accessories | MaterialBuy",
    description: "Explore a wide range of LED lights, fixtures & accessories for every space. Energy-efficient & stylish lighting solutions.",
    keywords: "lighting solutions, LED lights, light fixtures, home lighting, materialbuy",
    slug: "lighting",
    canonicalUrl: `${BASE_URL}/allproducts/lighting`,
    
    image: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/cb425b33944ae3db88bf78ebeb33567c',
      alt: 'Lighting Solutions - LED Lights, Fixtures & Accessories',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    ogImage: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/cb425b33944ae3db88bf78ebeb33567c',
      alt: 'Lighting Solutions Online - LED Lights, Fixtures & Accessories',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    twitterImage: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/cb425b33944ae3db88bf78ebeb33567c',
      alt: 'Lighting Solutions Online - LED Lights, Fixtures & More | MaterialBuy',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },

    ogTitle: "Lighting Solutions Online - LED Lights, Fixtures & Accessories",
    ogDescription: "Explore a wide range of LED lights, fixtures & accessories for every space. Energy-efficient & stylish lighting solutions.",
    twitterTitle: "Lighting Solutions Online - LED Lights, Fixtures & More | MaterialBuy",
    twitterDescription: "Shop LED lights, fixtures & accessories online. Energy-efficient & stylish.",
    
    priority: "0.9",
    changefreq: "weekly"
    },
    
    'sheet-panel': {
  title: "Sheets & Panels - Plywood, MDF & ACP Boards | MaterialBuy",
  description: "Discover high-quality plywood, MDF & ACP panels. Perfect for furniture, interiors & construction projects.",
  keywords: "plywood online, MDF boards, ACP panels, sheets panels, furniture materials, construction panels, materialbuy",
  slug: "sheet-panel",
  canonicalUrl: `${BASE_URL}/allproducts/sheet-panel`,
  
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/c0ed5f9fe726dc2363d8b91598e9f1e5',
    alt: 'Sheets & Panels - Plywood, MDF & ACP Building Materials',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/c0ed5f9fe726dc2363d8b91598e9f1e5',
    alt: 'Sheets & Panels - Plywood, MDF & ACP Online',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/c0ed5f9fe726dc2363d8b91598e9f1e5',
    alt: 'Sheets & Panels - Plywood, MDF & ACP | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  
  ogTitle: "Sheets & Panels - Plywood, MDF & ACP Online",
  ogDescription: "Shop plywood, MDF & ACP boards online. Strong, durable & versatile panels with fast delivery.",
  twitterTitle: "Sheets & Panels - Plywood, MDF & ACP | MaterialBuy",
  twitterDescription: "Browse plywood, MDF & ACP panels for furniture & construction.",
  
  priority: "0.9",
  changefreq: "weekly"
},

    
'kitchen': {
  title: "Kitchen Materials - Tiles, Sinks & Modular Fittings | MaterialBuy",
  description: "Build modern kitchens with stylish tiles, sinks, chimneys & modular accessories. Durable & affordable.",
  keywords: "kitchen materials, kitchen sinks, kitchen tiles, modular kitchen, kitchen fittings, materialbuy",
  slug: "kitchen",
  canonicalUrl: `${BASE_URL}/allproducts/kitchen`,
  
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/c2f1c5a9e155336f7dcf9610289e51ef',
    alt: 'Kitchen Materials - Sinks, Tiles & Modular Kitchen Fittings',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/c2f1c5a9e155336f7dcf9610289e51ef',
    alt: 'Kitchen Materials - Tiles, Sinks & Accessories Online',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/c2f1c5a9e155336f7dcf9610289e51ef',
    alt: 'Kitchen Materials - Tiles, Sinks & Fittings | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  
  ogTitle: "Kitchen Materials - Tiles, Sinks & Accessories Online",
  ogDescription: "Upgrade your kitchen with stylish sinks, tiles & modular fittings. Affordable & durable.",
  twitterTitle: "Kitchen Materials - Tiles, Sinks & Fittings | MaterialBuy",
  twitterDescription: "Shop kitchen sinks, tiles & modular fittings online. Stylish & affordable.",
  
  priority: "0.9",
  changefreq: "weekly"
},

    
   'bed-bath': {
  title: "Bed & Bath Materials - Faucets, Showers & Tiles | MaterialBuy",
  description: "Shop faucets, showers, sanitaryware, bathroom tiles & bedroom accessories. Stylish & durable.",
  keywords: "bathroom fittings, faucets online, showers, sanitaryware, bathroom tiles, bedroom accessories, materialbuy",
  slug: "bed-bath",
  canonicalUrl: `${BASE_URL}/allproducts/bed-bath`,

  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/7bb4972f4cf4fbcaa5ad78990eb31d53',
    alt: 'Bed & Bath Materials - Faucets, Showers & Bathroom Accessories',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/7bb4972f4cf4fbcaa5ad78990eb31d53',
    alt: 'Bed & Bath Materials - Faucets, Sanitaryware & Tiles',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/7bb4972f4cf4fbcaa5ad78990eb31d53',
    alt: 'Bed & Bath - Faucets, Showers & Tiles Online',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },

  ogTitle: "Bed & Bath Materials - Faucets, Sanitaryware & Tiles",
  ogDescription: "Buy faucets, showers, sanitaryware & bathroom tiles. Stylish & durable solutions with pan-India delivery.",
  twitterTitle: "Bed & Bath - Faucets, Showers & Tiles Online",
  twitterDescription: "Explore faucets, showers & bathroom tiles. Premium quality & affordable.",

  priority: "0.9",
  changefreq: "weekly"
},

    
   'hardware': {
  title: "Hardware Online - Hinges, Locks, Handles & Fasteners | MaterialBuy",
  description: "Buy premium hardware - hinges, locks, handles & fasteners. Reliable quality for homes & projects.",
  keywords: "hardware online, hinges, locks, handles, fasteners, door hardware, cabinet hardware, materialbuy",
  slug: "hardware",
  canonicalUrl: `${BASE_URL}/allproducts/hardware`,
  
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/c10fe3232f62b4eb1fbce7c8b5ad3547',
    alt: 'Hardware Materials - Hinges, Locks, Handles & Door Fittings',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/c10fe3232f62b4eb1fbce7c8b5ad3547',
    alt: 'Hardware Online - Locks, Hinges & Handles',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/c10fe3232f62b4eb1fbce7c8b5ad3547',
    alt: 'Hardware Online - Hinges, Locks & Fasteners | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  
  ogTitle: "Hardware Online - Locks, Hinges & Handles",
  ogDescription: "Shop hardware - hinges, locks, handles & fasteners. Strong, durable & reliable.",
  twitterTitle: "Hardware Online - Hinges, Locks & Fasteners | MaterialBuy",
  twitterDescription: "Find hinges, locks, handles & hardware online. Durable & affordable.",
  
  priority: "0.9",
  changefreq: "weekly"
},

    
   'tools-machineries': {
  title: "Tools & Machinery - Power & Hand Tools Online | MaterialBuy",
  description: "Shop branded power tools, hand tools & construction machinery online. Reliable, durable & delivered pan-India.",
  keywords: "power tools online, hand tools, construction tools, machinery, tools equipment, materialbuy",
  slug: "tools-machineries",
  canonicalUrl: `${BASE_URL}/allproducts/tools-machineries`,

  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/5675831ebe23fd73be6f3e8a10d81b4a',
    alt: 'Tools & Machinery - Power Tools & Professional Equipment',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/5675831ebe23fd73be6f3e8a10d81b4a',
    alt: 'Tools & Machinery - Power & Hand Tools Online',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/5675831ebe23fd73be6f3e8a10d81b4a',
    alt: 'Tools & Machinery - Power & Hand Tools | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },

  ogTitle: "Tools & Machinery - Power & Hand Tools Online",
  ogDescription: "Buy power tools, hand tools & construction machinery online. Durable & reliable with nationwide delivery.",
  twitterTitle: "Tools & Machinery - Power & Hand Tools | MaterialBuy",
  twitterDescription: "Shop branded power tools, hand tools & machinery online. Durable & affordable.",

  priority: "0.9",
  changefreq: "weekly"
}

},

  // 🔧 ALL SUBCATEGORIES 
  subcategories: {
  //  Building Material Subcategories
  'paints': {
    title: "Buy Paints Online | Materialbuy India",
    description: "Discover high-quality Paints at Materialbuy. Shop a wide range of Paints for your projects, ensuring durability and best prices.",
    keywords: "paints online, wall paints, interior paints, exterior paints, branded paints, materialbuy",
    slug: "paints",
    canonicalUrl: `${BASE_URL}/allproducts/building-material/paints`,
    image: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/44e704fcb0d1e49d8ff04c28dec57e2b',
      alt: 'Premium Paints - Interior & Exterior Wall Paints',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    ogImage: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/44e704fcb0d1e49d8ff04c28dec57e2b',
      alt: 'Buy Paints Online - Interior & Exterior Paints',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    twitterImage: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/44e704fcb0d1e49d8ff04c28dec57e2b',
      alt: 'Buy Paints Online - Interior & Exterior | MaterialBuy',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    ogTitle: "Buy Paints Online | Materialbuy India",
    ogDescription: "Discover high-quality Paints at Materialbuy. Shop a wide range of Paints for your projects, ensuring durability and best prices.",
    twitterTitle: "Buy Paints Online | Materialbuy India",
    twitterDescription: "Discover high-quality Paints at Materialbuy. Shop a wide range of Paints for your projects, ensuring durability and best prices.",
    priority: "0.8",
    changefreq: "weekly"
  },

  'wall-putty': {
    title: "Buy Wall Putty Online | Materialbuy India",
    description: "Discover high-quality Wall Putty at Materialbuy. Shop a wide range of Wall Putty for your projects, ensuring durability and best prices.",
    keywords: "wall putty online, wall putty, smooth finish, painting preparation, materialbuy",
    slug: "wall-putty",
    canonicalUrl: `${BASE_URL}/allproducts/building-material/wall-putty`,
    image: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/7684d816c3507fc4ff8bca08e4389489',
      alt: 'Wall Putty - Smooth Finish for Painting',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    ogImage: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/7684d816c3507fc4ff8bca08e4389489',
      alt: 'Wall Putty Online - Smooth Finish for Interiors & Exteriors',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    twitterImage: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/7684d816c3507fc4ff8bca08e4389489',
      alt: 'Wall Putty Online - Smooth Finish | MaterialBuy',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    ogTitle: "Buy Wall Putty Online | Materialbuy India",
    ogDescription: "Discover high-quality Wall Putty at Materialbuy. Shop a wide range of Wall Putty for your projects, ensuring durability and best prices.",
    twitterTitle: "Buy Wall Putty Online | Materialbuy India",
    twitterDescription: "Discover high-quality Wall Putty at Materialbuy. Shop a wide range of Wall Putty for your projects, ensuring durability and best prices.",
    priority: "0.8",
    changefreq: "weekly"
  },

  'construction-chemicals': {
    title: "Construction Chemicals - Adhesives, Sealants & Additives | MaterialBuy",
    description: "Shop construction chemicals like sealants, additives & waterproofing solutions. Trusted for durability & performance.",
    keywords: "construction chemicals, adhesives, sealants, additives, waterproofing solutions, materialbuy",
    slug: "construction-chemicals",
    canonicalUrl: `${BASE_URL}/allproducts/building-material/construction-chemicals`,
    image: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/b9b82c4534fde61dd71a7440ce85f494',
      alt: 'Construction Chemicals - Adhesives & Sealants',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    ogImage: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/b9b82c4534fde61dd71a7440ce85f494',
      alt: 'Construction Chemicals - Adhesives, Sealants & Additives',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    twitterImage: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/b9b82c4534fde61dd71a7440ce85f494',
      alt: 'Construction Chemicals - Adhesives, Sealants & Additives | MaterialBuy',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    ogTitle: "Construction Chemicals - Professional Grade Solutions",
    ogDescription: "Professional grade construction chemicals, sealants & additives for building projects.",
    twitterTitle: "Construction Chemicals - Adhesives, Sealants & Additives | MaterialBuy",
    twitterDescription: "Professional construction chemicals for durability & performance.",
    priority: "0.8",
    changefreq: "weekly"
  },

  // 'textiles-accessories': {
  //   title: "Textiles and Accessories Online - Walls & Floors | MaterialBuy",
  //   description: "Soft textiles and accessories - cushions, rugs, curtains, and throws to add comfort and elegance.",
  //   keywords: "textiles online, materialbuy",
  //   slug: "textiles-accessories",
  //   canonicalUrl: `${BASE_URL}/allproducts/home-decor/textiles-&-accessories`,
  //   image: {
  //     url: 'https://mbuy.blr1.digitaloceanspaces.com/c62a192c800836016b5187d1ba0bcc00',
  //     alt: 'Textiles and Accessories - Comfort and Elegance',
  //     width: 1200,
  //     height: 630,
  //     type: 'image/jpeg'
  //   },
  //   ogImage: {
  //     url: 'https://mbuy.blr1.digitaloceanspaces.com/c62a192c800836016b5187d1ba0bcc00',
  //     alt: 'Textiles and Accessories Online - Comfort and Elegance',
  //     width: 1200,
  //     height: 630,
  //     type: 'image/jpeg'
  //   },
  //   twitterImage: {
  //     url: 'https://mbuy.blr1.digitaloceanspaces.com/c62a192c800836016b5187d1ba0bcc00',
  //     alt: 'Textiles and Accessories Online - Comfort and Elegance | MaterialBuy',
  //     width: 1200,
  //     height: 630,
  //     type: 'image/jpeg'
  //   },
  //   ogTitle: "Textiles and Accessories - Comfort and Elegance",
  //   ogDescription: "Soft textiles and accessories - cushions, rugs, curtains, and throws to add comfort and elegance.",
  //   twitterTitle: "Textiles and Accessories Online - Comfort and Elegance | MaterialBuy",
  //   twitterDescription: "Soft textiles and accessories - cushions, rugs, curtains, and throws to add comfort and elegance.",
  //   priority: "0.8",
  //   changefreq: "weekly"
  // },

  'thermal-insulation': {
    title: "Buy Thermal Insulation Online | Materialbuy India",
    description: "Discover high-quality Thermal Insulation at Materialbuy. Shop a wide range of Thermal Insulation for your projects, ensuring durability and best prices.",
    keywords: "thermal insulation, insulation materials, energy efficiency, heat transfer, insulation sheets, materialbuy",
    slug: "thermal-insulation",
    canonicalUrl: `${BASE_URL}/allproducts/building-material/thermal-insulation`,
    image: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/d11f3b9da85031297c2bf48120540f14',
      alt: 'Thermal Insulation - Energy Efficient Materials',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    ogImage: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/d11f3b9da85031297c2bf48120540f14',
      alt: 'Thermal Insulation Materials - Energy Efficient Solutions',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    twitterImage: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/d11f3b9da85031297c2bf48120540f14',
      alt: 'Thermal Insulation Materials - Energy Efficient | MaterialBuy',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    ogTitle: "Buy Thermal Insulation Online | Materialbuy India",
    ogDescription: "Discover high-quality Thermal Insulation at Materialbuy. Shop a wide range of Thermal Insulation for your projects, ensuring durability and best prices.",
    twitterTitle: "Buy Thermal Insulation Online | Materialbuy India",
    twitterDescription: "Discover high-quality Thermal Insulation at Materialbuy. Shop a wide range of Thermal Insulation for your projects, ensuring durability and best prices.",
    priority: "0.8",
    changefreq: "weekly"
  },

  'sound-insulation': {
    title: "Buy Sound Insulation Online | Materialbuy India",
    description: "Discover high-quality Sound Insulation at Materialbuy. Shop a wide range of Sound Insulation for your projects, ensuring durability and best prices.",
    keywords: "sound insulation, acoustic insulation, soundproofing materials, noise reduction, materialbuy",
    slug: "sound-insulation",
    canonicalUrl: `${BASE_URL}/allproducts/building-material/sound-insulation`,
    image: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/dccfe7818efb5930151e5c439a8d554f',
      alt: 'Soundproofing Materials - Acoustic Insulation',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    ogImage: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/dccfe7818efb5930151e5c439a8d554f',
      alt: 'Soundproofing Materials - Acoustic Insulation Online',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    twitterImage: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/dccfe7818efb5930151e5c439a8d554f',
      alt: 'Soundproofing Materials - Acoustic Insulation | MaterialBuy',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    ogTitle: "Buy Sound Insulation Online | Materialbuy India",
    ogDescription: "Discover high-quality Sound Insulation at Materialbuy. Shop a wide range of Sound Insulation for your projects, ensuring durability and best prices.",
    twitterTitle: "Buy Sound Insulation Online | Materialbuy India",
    twitterDescription: "Discover high-quality Sound Insulation at Materialbuy. Shop a wide range of Sound Insulation for your projects, ensuring durability and best prices.",
    priority: "0.8",
    changefreq: "weekly"
  },

  'ready-mix-cement': {
    title: "Buy Ready-Mix Cement Online | Materialbuy India",
    description: "Discover high-quality Ready-Mix Cement at Materialbuy. Shop a wide range of Ready-Mix Cement for your projects, ensuring durability and best prices.",
    keywords: "ready-mix cement, quick cement, durable construction cement, materialbuy",
    slug: "ready-mix-cement",
    canonicalUrl: `${BASE_URL}/allproducts/building-material/ready-mix-cement`,
    image: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/ebb8bdffbd1258f21bf3fc02fb26338c',
      alt: 'ReadyMix Cement - Quick Solutions',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    ogImage: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/ebb8bdffbd1258f21bf3fc02fb26338c',
      alt: 'ReadyMix Cement Online - Easy Cement Solutions',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    twitterImage: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/ebb8bdffbd1258f21bf3fc02fb26338c',
      alt: 'ReadyMix Cement Online - Easy Solutions | MaterialBuy',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    ogTitle: "Buy Ready-Mix Cement Online | Materialbuy India",
    ogDescription: "Discover high-quality Ready-Mix Cement at Materialbuy. Shop a wide range of Ready-Mix Cement for your projects, ensuring durability and best prices.",
    twitterTitle: "Buy Ready-Mix Cement Online | Materialbuy India",
    twitterDescription: "Discover high-quality Ready-Mix Cement at Materialbuy. Shop a wide range of Ready-Mix Cement for your projects, ensuring durability and best prices.",
    priority: "0.8",
    changefreq: "weekly"
  },

  // 'plants-floral-arrangements-unique-accents': {
  //   title: "Plants, Floral Arrangements & Unique Accents | MaterialBuy",
  //   description: "Artificial plants, floral arrangements, and décor accents for fresh, vibrant interiors with lasting charm.",
  //   keywords: "artificial plants, floral arrangements, home décor, interior accents, materialbuy",
  //   slug: "plants-floral-arrangements-unique-accents",
  //   canonicalUrl: `${BASE_URL}/allproducts/home-decor/plants,-floral-arrangements-&-unique-accents`,
  //   image: {
  //     url: 'https://mbuy.blr1.digitaloceanspaces.com/831e5516d2a2cc36f934b959e68741c7',
  //     alt: 'Plants, Floral Arrangements & Unique Accents - Home Décor',
  //     width: 1200,
  //     height: 630,
  //     type: 'image/jpeg'
  //   },
  //   ogImage: {
  //     url: 'https://mbuy.blr1.digitaloceanspaces.com/831e5516d2a2cc36f934b959e68741c7',
  //     alt: 'Plants, Floral Arrangements & Unique Accents - Vibrant Interiors',
  //     width: 1200,
  //     height: 630,
  //     type: 'image/jpeg'
  //   },
  //   twitterImage: {
  //     url: 'https://mbuy.blr1.digitaloceanspaces.com/831e5516d2a2cc36f934b959e68741c7',
  //     alt: 'Plants, Floral Arrangements & Unique Accents - Vibrant Interiors | MaterialBuy',
  //     width: 1200,
  //     height: 630,
  //     type: 'image/jpeg'
  //   },
  //   ogTitle: "Plants, Floral Arrangements & Unique Accents - Home Décor",
  //   ogDescription: "Artificial plants, floral arrangements, and décor accents for fresh, vibrant interiors with lasting charm.",
  //   twitterTitle: "Plants, Floral Arrangements & Unique Accents - Vibrant Interiors | MaterialBuy",
  //   twitterDescription: "Artificial plants, floral arrangements, and décor accents for fresh, vibrant interiors with lasting charm.",
  //   priority: "0.8",
  //   changefreq: "weekly"
  // },

  // 'fragrance-collection': {
  //   title: "Fragrance Collection - Captivating Scents | MaterialBuy",
  //   description: "Premium scented candles, oils, and diffusers for soothing, inviting, and refreshing atmospheres.",
  //   keywords: "fragrance collection, home fragrances, scented candles, materialbuy",
  //   slug: "fragrance-collection",
  //   canonicalUrl: `${BASE_URL}/allproducts/home-decor/fragrance-collection`,
  //   image: {
  //     url: 'https://mbuy.blr1.digitaloceanspaces.com/a97eb374708ce834da31062acf832f11',
  //     alt: 'Fragrance Collection - Captivating Scents',
  //     width: 1200,
  //     height: 630,
  //     type: 'image/jpeg'
  //   },
  //   ogImage: {
  //     url: 'https://mbuy.blr1.digitaloceanspaces.com/a97eb374708ce834da31062acf832f11',
  //     alt: 'Fragrance Collection Online - Captivating Scents',
  //     width: 1200,
  //     height: 630,
  //     type: 'image/jpeg'
  //   },
  //   twitterImage: {
  //     url: 'https://mbuy.blr1.digitaloceanspaces.com/a97eb374708ce834da31062acf832f11',
  //     alt: 'Fragrance Collection Online - Captivating Scents | MaterialBuy',
  //     width: 1200,
  //     height: 630,
  //     type: 'image/jpeg'
  //   },
  //   ogTitle: "Fragrance Collection - Captivating Scents",
  //   ogDescription: "Premium scented candles, oils, and diffusers for soothing, inviting, and refreshing atmospheres.",
  //   twitterTitle: "Fragrance Collection Online - Captivating Scents | MaterialBuy",
  //   twitterDescription: "Premium scented candles, oils, and diffusers for soothing, inviting, and refreshing atmospheres.",
  //   priority: "0.8",
  //   changefreq: "weekly"
  // },

  //  Decor Subcategories
  // 'wallpapers': {
  //   title: "Wall-Decor - 3D, Textured & Designer | MaterialBuy",
  //   description: "Stylish wall décor - mirrors, frames, panels, and accents to transform plain walls into stunning focal points.",
  //   keywords: "wallpapers online, 3D wallpapers, textured wallpapers, designer wallpapers, wall decor, materialbuy",
  //   slug: "wallpapers",
  //   canonicalUrl: `${BASE_URL}/allproducts/home-decor/wall-decor`,
  //   image: {
  //     url: 'https://mbuy.blr1.digitaloceanspaces.com/11416bc9cfabc86ad931f1669bd9266b',
  //     alt: 'Premium Wallpapers - 3D, Textured & Designer',
  //     width: 1200,
  //     height: 630,
  //     type: 'image/jpeg'
  //   },
  //   ogImage: {
  //     url: 'https://mbuy.blr1.digitaloceanspaces.com/11416bc9cfabc86ad931f1669bd9266b',
  //     alt: 'Wallpapers Online - 3D, Textured & Designer',
  //     width: 1200,
  //     height: 630,
  //     type: 'image/jpeg'
  //   },
  //   twitterImage: {
  //     url: 'https://mbuy.blr1.digitaloceanspaces.com/11416bc9cfabc86ad931f1669bd9266b',
  //     alt: 'Wallpapers Online - 3D, Textured & Designer | MaterialBuy',
  //     width: 1200,
  //     height: 630,
  //     type: 'image/jpeg'
  //   },
  //   ogTitle: "Premium Wallpapers - 3D, Textured & Designer",
  //   ogDescription: "Stylish wall décor - mirrors, frames, panels, and accents to transform plain walls into stunning focal points.",
  //   twitterTitle: "Wallpapers Online - 3D, Textured & Designer | MaterialBuy",
  //   twitterDescription: "Stylish wall décor - mirrors, frames, panels, and accents to transform plain walls into stunning focal points.",
  //   priority: "0.8",
  //   changefreq: "weekly"
  // },

  // 'lighting-accessories': {
  //   title: "Decorative Lighting - Ceiling, Wall & Table Lamps | MaterialBuy",
  //   description: "Elegant decorative lighting including chandeliers, lamps, and pendants. Energy-efficient with timeless style.",
  //   keywords: "decorative lighting, ceiling lamps, wall lamps, table lamps, modern lighting, materialbuy",
  //   slug: "lighting-accessories",
  //   canonicalUrl: `${BASE_URL}/allproducts/home-decor/decorative-lighting`,
  //   image: {
  //     url: 'https://mbuy.blr1.digitaloceanspaces.com/a783cf26ba23d7302efebe72f138cb3b',
  //     alt: 'Decorative Lighting - Modern Lamps & Fixtures',
  //     width: 1200,
  //     height: 630,
  //     type: 'image/jpeg'
  //   },
  //   ogImage: {
  //     url: 'https://mbuy.blr1.digitaloceanspaces.com/a783cf26ba23d7302efebe72f138cb3b',
  //     alt: 'Decorative Lighting - Ceiling, Wall & Table Lamps',
  //     width: 1200,
  //     height: 630,
  //     type: 'image/jpeg'
  //   },
  //   twitterImage: {
  //     url: 'https://mbuy.blr1.digitaloceanspaces.com/a783cf26ba23d7302efebe72f138cb3b',
  //     alt: 'Decorative Lighting - Ceiling, Wall & Table Lamps | MaterialBuy',
  //     width: 1200,
  //     height: 630,
  //     type: 'image/jpeg'
  //   },
  //   ogTitle: "Decorative Lighting - Modern Solutions",
  //   ogDescription: "Elegant decorative lighting including chandeliers, lamps, and pendants. Energy-efficient with timeless style.",
  //   twitterTitle: "Decorative Lighting - Ceiling, Wall & Table Lamps | MaterialBuy",
  //   twitterDescription: "Elegant decorative lighting including chandeliers, lamps, and pendants. Energy-efficient with timeless style.",
  //   priority: "0.8",
  //   changefreq: "weekly"
  // },

  // 'functional-decor': {
  //   title: "Functional Decor - Stylish & Practical Accessories | MaterialBuy",
  //   description: "Space-saving furniture, organizers, and modern décor for stylish, practical living.",
  //   keywords: "functional decor, space-saving furniture, organizers, modern décor, materialbuy",
  //   slug: "functional-decor",
  //   canonicalUrl: `${BASE_URL}/allproducts/home-decor/functional-decor-solutions`,
  //   image: {
  //     url: 'https://mbuy.blr1.digitaloceanspaces.com/b0711c0237c69055925822a6ea0c52df',
  //     alt: 'Functional Decor - Stylish & Practical Accessories',
  //     width: 1200,
  //     height: 630,
  //     type: 'image/jpeg'
  //   },
  //   ogImage: {
  //     url: 'https://mbuy.blr1.digitaloceanspaces.com/b0711c0237c69055925822a6ea0c52df',
  //     alt: 'Functional Decor - Stylish & Practical Accessories',
  //     width: 1200,
  //     height: 630,
  //     type: 'image/jpeg'
  //   },
  //   twitterImage: {
  //     url: 'https://mbuy.blr1.digitaloceanspaces.com/b0711c0237c69055925822a6ea0c52df',
  //     alt: 'Functional Decor - Stylish & Practical Accessories | MaterialBuy',
  //     width: 1200,
  //     height: 630,
  //     type: 'image/jpeg'
  //   },
  //   ogTitle: "Functional Decor - Modern Solutions",
  //   ogDescription: "Space-saving furniture, organizers, and modern décor for stylish, practical living.",
  //   twitterTitle: "Functional Decor - Stylish & Practical Accessories | MaterialBuy",
  //   twitterDescription: "Space-saving furniture, organizers, and modern décor for stylish, practical living.",
  //   priority: "0.8",
  //   changefreq: "weekly"
  // },

  // 'thematic-pieces': {
  //   title: "Thematic Pieces - Unique Decor Accents | MaterialBuy",
  //   description: "Unique thematic decor - sculptures, artifacts, and seasonal accents to personalize interiors.",
  //   keywords: "thematic decor, sculptures, artifacts, seasonal accents, materialbuy",
  //   slug: "thematic-pieces",
  //   canonicalUrl: `${BASE_URL}/allproducts/home-decor/specialized-thematic-pieces`,
  //   image: {
  //     url: 'https://mbuy.blr1.digitaloceanspaces.com/ceca3a7e76a1fd2d25f96db070057a87',
  //     alt: 'Thematic Pieces - Unique Decor Accents',
  //     width: 1200,
  //     height: 630,
  //     type: 'image/jpeg'
  //   },
  //   ogImage: {
  //     url: 'https://mbuy.blr1.digitaloceanspaces.com/ceca3a7e76a1fd2d25f96db070057a87',
  //     alt: 'Thematic Pieces - Unique Decor Accents',
  //     width: 1200,
  //     height: 630,
  //     type: 'image/jpeg'
  //   },
  //   twitterImage: {
  //     url: 'https://mbuy.blr1.digitaloceanspaces.com/ceca3a7e76a1fd2d25f96db070057a87',
  //     alt: 'Thematic Pieces - Unique Decor Accents | MaterialBuy',
  //     width: 1200,
  //     height: 630,
  //     type: 'image/jpeg'
  //   },
  //   ogTitle: "Thematic Pieces - Unique Decor Accents",
  //   ogDescription: "Unique thematic decor - sculptures, artifacts, and seasonal accents to personalize interiors.",
  //   twitterTitle: "Thematic Pieces - Unique Decor Accents | MaterialBuy",
  //   twitterDescription: "Unique thematic decor - sculptures, artifacts, and seasonal accents to personalize interiors.",
  //   priority: "0.8",
  //   changefreq: "weekly"
  // },

  //  Roofing Subcategories
  'stone-coated-roof-tiles': {
    title: "Buy Stone-Coated Roofing Tiles Online | Materialbuy India",
    description: "Discover high-quality Stone-Coated Roofing Tiles at Materialbuy. Shop a wide range of Stone-Coated Roofing Tiles for your projects, ensuring durability and best prices.",
    keywords: "stone coated roof tiles, roof tiles, stone coated tiles, durable roofing, materialbuy",
    slug: "stone-coated-roof-tiles",
    canonicalUrl: `${BASE_URL}/allproducts/roofing/stone-coated-roof-tiles`,
    image: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/b83337d5c8223a84aff0939b3a1b07dd',
      alt: 'Stone Coated Roof Tiles - Stylish & Durable',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    ogImage: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/b83337d5c8223a84aff0939b3a1b07dd',
      alt: 'Stone Coated Roof Tiles Online - Stylish & Durable',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    twitterImage: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/b83337d5c8223a84aff0939b3a1b07dd',
      alt: 'Stone Coated Roof Tiles Online - Stylish & Durable | MaterialBuy',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    ogTitle: "Buy Stone-Coated Roofing Tiles Online | Materialbuy India",
    ogDescription: "Discover high-quality Stone-Coated Roofing Tiles at Materialbuy. Shop a wide range of Stone-Coated Roofing Tiles for your projects, ensuring durability and best prices.",
    twitterTitle: "Buy Stone-Coated Roofing Tiles Online | Materialbuy India",
    twitterDescription: "Discover high-quality Stone-Coated Roofing Tiles at Materialbuy. Shop a wide range of Stone-Coated Roofing Tiles for your projects, ensuring durability and best prices.",
    priority: "0.8",
    changefreq: "weekly"
  },

  'asphalt-roofing-shingles': {
    title: "Buy Asphalt Shingles Online | Materialbuy India",
    description: "Discover high-quality Asphalt Shingles at Materialbuy. Shop a wide range of Asphalt Shingles for your projects, ensuring durability and best prices.",
    keywords: "asphalt roofing shingles, shingles online, roof shingles, durable roofing, aesthetic roofing, materialbuy",
    slug: "asphalt-roofing-shingles",
    canonicalUrl: `${BASE_URL}/allproducts/roofing/asphalt-roofing-shingles`,
    image: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/1f2e9db8ea659321322eb841e9f3b536',
      alt: 'Asphalt Roofing Shingles - Durable & Aesthetic',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    ogImage: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/1f2e9db8ea659321322eb841e9f3b536',
      alt: 'Asphalt Roofing Shingles Online - Durable & Aesthetic Roofing',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    twitterImage: {
      url: 'https://mbuy.blr1.digitaloceanspaces.com/1f2e9db8ea659321322eb841e9f3b536',
      alt: 'Asphalt Roofing Shingles Online - Durable & Aesthetic Roofing | MaterialBuy',
      width: 1200,
      height: 630,
      type: 'image/jpeg'
    },
    ogTitle: "Buy Asphalt Shingles Online | Materialbuy India",
    ogDescription: "Discover high-quality Asphalt Shingles at Materialbuy. Shop a wide range of Asphalt Shingles for your projects, ensuring durability and best prices.",
    twitterTitle: "Buy Asphalt Shingles Online | Materialbuy India",
    twitterDescription: "Discover high-quality Asphalt Shingles at Materialbuy. Shop a wide range of Asphalt Shingles for your projects, ensuring durability and best prices.",
    priority: "0.8",
    changefreq: "weekly"
  },


    //  Flooring Subcategories
  'floor-tiles': {
  title: "Buy Floor Tiles Online | Materialbuy India",
  description: "Discover high-quality Floor Tiles at Materialbuy. Shop a wide range of Floor Tiles for your projects, ensuring durability and best prices.",
  keywords: "floor tiles, wall tiles, ceramic tiles, vitrified tiles, porcelain tiles, materialbuy",
  slug: "floor-tiles",
  canonicalUrl: `${BASE_URL}/allproducts/flooring/floor-tiles`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/49dc1a3c8fba26669781a60d01063075',
    alt: 'Premium Tiles - Ceramic, Vitrified & Porcelain',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/49dc1a3c8fba26669781a60d01063075',
    alt: 'Floor & Wall Tiles Online - Ceramic, Vitrified, Porcelain',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/49dc1a3c8fba26669781a60d01063075',
    alt: 'Floor & Wall Tiles Online - Ceramic, Vitrified, Porcelain | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Floor Tiles Online | Materialbuy India",
  ogDescription: "Discover high-quality Floor Tiles at Materialbuy. Shop a wide range of Floor Tiles for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Floor Tiles Online | Materialbuy India",
  twitterDescription: "Discover high-quality Floor Tiles at Materialbuy. Shop a wide range of Floor Tiles for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},
    
'wooden-flooring': {
  title: "Buy Premium Wooden Flooring Online | Materialbuy India",
  description: "Discover high-quality Premium Wooden Flooring at Materialbuy. Shop a wide range of Premium Wooden Flooring for your projects, ensuring durability and best prices.",
  keywords: "wooden flooring, laminate flooring, solid wood flooring, wood flooring, materialbuy",
  slug: "wooden-flooring",
  canonicalUrl: `${BASE_URL}/allproducts/flooring/wooden-flooring`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/783d1715d97cf780cad1eb60dae75c04',
    alt: 'Wooden Flooring - Laminate & Solid Wood',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/783d1715d97cf780cad1eb60dae75c04',
    alt: 'Wooden Flooring Online - Laminate & Solid Wood',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/783d1715d97cf780cad1eb60dae75c04',
    alt: 'Wooden Flooring Online - Laminate & Solid Wood | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Premium Wooden Flooring Online | Materialbuy India",
  ogDescription: "Discover high-quality Premium Wooden Flooring at Materialbuy. Shop a wide range of Premium Wooden Flooring for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Premium Wooden Flooring Online | Materialbuy India",
  twitterDescription: "Discover high-quality Premium Wooden Flooring at Materialbuy. Shop a wide range of Premium Wooden Flooring for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},

  'hardwood-flooring': {
  title: "Buy Hardwood Flooring Online | Materialbuy India",
  description: "Discover high-quality Hardwood Flooring at Materialbuy. Shop a wide range of Hardwood Flooring for your projects, ensuring durability and best prices.",
  keywords: "hardwood flooring, solid wood flooring, engineered wood flooring, materialbuy",
  slug: "hardwood-flooring",
  canonicalUrl: `${BASE_URL}/allproducts/flooring/hardwood-flooring`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/d0d9345f31ae7de4e16dc14d40f1deb2',
    alt: 'Hardwood Flooring - Solid & Engineered Wood',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/d0d9345f31ae7de4e16dc14d40f1deb2',
    alt: 'Hardwood Flooring Online - Solid & Engineered Wood',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/d0d9345f31ae7de4e16dc14d40f1deb2',
    alt: 'Hardwood Flooring Online - Solid & Engineered Wood | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Hardwood Flooring Online | Materialbuy India",
  ogDescription: "Discover high-quality Hardwood Flooring at Materialbuy. Shop a wide range of Hardwood Flooring for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Hardwood Flooring Online | Materialbuy India",
  twitterDescription: "Discover high-quality Hardwood Flooring at Materialbuy. Shop a wide range of Hardwood Flooring for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},
     
 'vinyl-flooring': {
  title: "Buy Vinyl Flooring Online | Materialbuy India",
  description: "Discover high-quality Vinyl Flooring at Materialbuy. Shop a wide range of Vinyl Flooring for your projects, ensuring durability and best prices.",
  keywords: "vinyl flooring, vinyl sheets, vinyl planks, waterproof flooring, affordable flooring, materialbuy",
  slug: "vinyl-flooring",
  canonicalUrl: `${BASE_URL}/allproducts/flooring/vinyl-flooring`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/705ecbc889947d302cc81e9015eb4998',
    alt: 'Vinyl Flooring - Sheets & Planks',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/705ecbc889947d302cc81e9015eb4998',
    alt: 'Vinyl Flooring Sheets & Planks Online',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/705ecbc889947d302cc81e9015eb4998',
    alt: 'Vinyl Flooring Sheets & Planks Online | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Vinyl Flooring Online | Materialbuy India",
  ogDescription: "Discover high-quality Vinyl Flooring at Materialbuy. Shop a wide range of Vinyl Flooring for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Vinyl Flooring Online | Materialbuy India",
  twitterDescription: "Discover high-quality Vinyl Flooring at Materialbuy. Shop a wide range of Vinyl Flooring for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},
    
'laminate-flooring': {
  title: "Buy Laminate Flooring Online | Materialbuy India",
  description: "Discover high-quality Laminate Flooring at Materialbuy. Shop a wide range of Laminate Flooring for your projects, ensuring durability and best prices.",
  keywords: "laminate flooring, laminate floors, durable flooring, stylish flooring, modern flooring, materialbuy",
  slug: "laminate-flooring",
  canonicalUrl: `${BASE_URL}/allproducts/flooring/laminate-flooring`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/dbbd89a09cb876eb72b1522ad7b9bccd',
    alt: 'Laminate Flooring - Durable & Stylish',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/dbbd89a09cb876eb72b1522ad7b9bccd',
    alt: 'Laminate Flooring Online - Durable & Stylish',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/dbbd89a09cb876eb72b1522ad7b9bccd',
    alt: 'Laminate Flooring Online - Durable & Stylish | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Laminate Flooring Online | Materialbuy India",
  ogDescription: "Discover high-quality Laminate Flooring at Materialbuy. Shop a wide range of Laminate Flooring for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Laminate Flooring Online | Materialbuy India",
  twitterDescription: "Discover high-quality Laminate Flooring at Materialbuy. Shop a wide range of Laminate Flooring for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},

    'bedroom-tiles': {
  title: "Buy Bedroom Tiles Online | Materialbuy India",
  description: "Discover high-quality Bedroom Tiles at Materialbuy. Shop a wide range of Bedroom Tiles for your projects, ensuring durability and best prices.",
  keywords: "bedroom tiles, stylish tiles, durable tiles, cozy bedroom, materialbuy",
  slug: "bedroom-tiles",
  canonicalUrl: `${BASE_URL}/allproducts/flooring/bedroom-tiles`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/f81bb7cbd2edf57a07f1aab8d4b50fed',
    alt: 'Bedroom Tiles - Stylish & Durable',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/f81bb7cbd2edf57a07f1aab8d4b50fed',
    alt: 'Bedroom Tiles - Stylish & Durable | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/f81bb7cbd2edf57a07f1aab8d4b50fed',
    alt: 'Bedroom Tiles - Stylish & Durable | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Bedroom Tiles Online | Materialbuy India",
  ogDescription: "Discover high-quality Bedroom Tiles at Materialbuy. Shop a wide range of Bedroom Tiles for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Bedroom Tiles Online | Materialbuy India",
  twitterDescription: "Discover high-quality Bedroom Tiles at Materialbuy. Shop a wide range of Bedroom Tiles for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},

'living-room-tiles': {
  title: "Buy Living Room Tiles Online | Materialbuy India",
  description: "Discover high-quality Living Room Tiles at Materialbuy. Shop a wide range of Living Room Tiles for your projects, ensuring durability and best prices.",
  keywords: "living room tiles, stylish tiles, durable tiles, cozy living room, materialbuy",
  slug: "living-room-tiles",
  canonicalUrl: `${BASE_URL}/allproducts/flooring/living-room-tiles`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/4400e3950e1f45e2bc55744718c2f3bc',
    alt: 'Living Room Tiles - Stylish & Durable',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/4400e3950e1f45e2bc55744718c2f3bc',
    alt: 'Living Room Tiles - Stylish & Durable | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/4400e3950e1f45e2bc55744718c2f3bc',
    alt: 'Living Room Tiles - Stylish & Durable | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Living Room Tiles Online | Materialbuy India",
  ogDescription: "Discover high-quality Living Room Tiles at Materialbuy. Shop a wide range of Living Room Tiles for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Living Room Tiles Online | Materialbuy India",
  twitterDescription: "Discover high-quality Living Room Tiles at Materialbuy. Shop a wide range of Living Room Tiles for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},

'kitchen-tiles': {
  title: "Buy Kitchen Tiles Online | Materialbuy India",
  description: "Discover high-quality Kitchen Tiles at Materialbuy. Shop a wide range of Kitchen Tiles for your projects, ensuring durability and best prices.",
  keywords: "kitchen tiles, kitchen wall tiles, kitchen floor tiles, stain resistant tiles, easy clean tiles, materialbuy",
  slug: "kitchen-tiles",
  canonicalUrl: `${BASE_URL}/allproducts/flooring/kitchen-tiles`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/cfd5a14f9dcdb316a54e18c06783100e',
    alt: 'Kitchen Tiles - Wall & Floor Solutions',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/cfd5a14f9dcdb316a54e18c06783100e',
    alt: 'Kitchen Wall & Floor Tiles Online',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/cfd5a14f9dcdb316a54e18c06783100e',
    alt: 'Kitchen Wall & Floor Tiles Online | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Kitchen Tiles Online | Materialbuy India",
  ogDescription: "Discover high-quality Kitchen Tiles at Materialbuy. Shop a wide range of Kitchen Tiles for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Kitchen Tiles Online | Materialbuy India",
  twitterDescription: "Discover high-quality Kitchen Tiles at Materialbuy. Shop a wide range of Kitchen Tiles for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},


   'parking-tiles': {
  title: "Buy Parking Tiles Online | Materialbuy India",
  description: "Discover high-quality Parking Tiles at Materialbuy. Shop a wide range of Parking Tiles for your projects, ensuring durability and best prices.",
  keywords: "parking tiles, outdoor tiles, heavy-duty tiles, materialbuy",
  slug: "parking-tiles",
  canonicalUrl: `${BASE_URL}/allproducts/flooring/parking-tiles`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/ebc71616f9d99596c98a5ab96825c401',
    alt: 'Parking Tiles - Durable & Stylish',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/ebc71616f9d99596c98a5ab96825c401',
    alt: 'Parking Tiles - Durable & Stylish',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/ebc71616f9d99596c98a5ab96825c401',
    alt: 'Parking Tiles - Durable & Stylish | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Parking Tiles Online | Materialbuy India",
  ogDescription: "Discover high-quality Parking Tiles at Materialbuy. Shop a wide range of Parking Tiles for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Parking Tiles Online | Materialbuy India",
  twitterDescription: "Discover high-quality Parking Tiles at Materialbuy. Shop a wide range of Parking Tiles for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},

'deck-flooring': {
  title: "Buy Decking Flooring Online | Materialbuy India",
  description: "Discover high-quality Decking Flooring at Materialbuy. Shop a wide range of Decking Flooring for your projects, ensuring durability and best prices.",
  keywords: "decking flooring, outdoor tiles, materialbuy",
  slug: "deck-flooring",
  canonicalUrl: `${BASE_URL}/allproducts/flooring/deck-flooring`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/9b0e917b603ce7c9869729c56d1d9c23',
    alt: 'Decking Flooring - Durable & Stylish',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/9b0e917b603ce7c9869729c56d1d9c23',
    alt: 'Decking Flooring - Durable & Stylish',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/9b0e917b603ce7c9869729c56d1d9c23',
    alt: 'Decking Flooring - Durable & Stylish | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Decking Flooring Online | Materialbuy India",
  ogDescription: "Discover high-quality Decking Flooring at Materialbuy. Shop a wide range of Decking Flooring for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Decking Flooring Online | Materialbuy India",
  twitterDescription: "Discover high-quality Decking Flooring at Materialbuy. Shop a wide range of Decking Flooring for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},

'fibre-cement-board': {
  title: "Buy Fiber Cement Boards Online | Materialbuy India",
  description: "Discover high-quality Fiber Cement Boards at Materialbuy. Shop a wide range of Fiber Cement Boards for your projects, ensuring durability and best prices.",
  keywords: "fibre cement boards, cladding, partitions, ceilings, facades, materialbuy",
  slug: "fibre-cement-board",
  canonicalUrl: `${BASE_URL}/allproducts/sheet-panel/fibre-cement`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/183a241a92389c113f4a2984c0eb882e',
    alt: 'Premium Fibre Cement Boards - Durable & Versatile',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/183a241a92389c113f4a2984c0eb882e',
    alt: 'Fibre Cement Boards - Durable & Versatile | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/183a241a92389c113f4a2984c0eb882e',
    alt: 'Fibre Cement Boards - Durable & Versatile | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Fiber Cement Boards Online | Materialbuy India",
  ogDescription: "Discover high-quality Fiber Cement Boards at Materialbuy. Shop a wide range of Fiber Cement Boards for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Fiber Cement Boards Online | Materialbuy India",
  twitterDescription: "Discover high-quality Fiber Cement Boards at Materialbuy. Shop a wide range of Fiber Cement Boards for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},


'mdf-board': {
  title: "Buy MDF Board Online | Materialbuy India",
  description: "Discover high-quality MDF Board at Materialbuy. Shop a wide range of MDF Board for your projects, ensuring durability and best prices.",
  keywords: "MDF boards, MDF panels, medium density fiberboard, furniture boards, interior panels, materialbuy",
  slug: "mdf-board",
  canonicalUrl: `${BASE_URL}/allproducts/sheet-panel/mdf-board`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/e301a841295c767956a1ffdbbc388cdf',
    alt: 'High-quality MDF board panels for furniture and interior projects',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/e301a841295c767956a1ffdbbc388cdf',
    alt: 'High-quality MDF board panels for furniture and interior projects',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/e301a841295c767956a1ffdbbc388cdf',
    alt: 'High-quality MDF board panels for furniture and interior projects',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy MDF Board Online | Materialbuy India",
  ogDescription: "Discover high-quality MDF Board at Materialbuy. Shop a wide range of MDF Board for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy MDF Board Online | Materialbuy India",
  twitterDescription: "Discover high-quality MDF Board at Materialbuy. Shop a wide range of MDF Board for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},

'wall-partition-panel': {
  title: "Buy Partition Wall Panels Online | Materialbuy India",
  description: "Discover high-quality Partition Wall Panels at Materialbuy. Shop a wide range of Partition Wall Panels for your projects, ensuring durability and best pric",
  keywords: "partition wall panels, interior partitions, decorative panels, materialbuy",
  slug: "wall-partition-panel",
  canonicalUrl: `${BASE_URL}/allproducts/sheet-panel/wall-partition-panel`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/72e9fea37249af408d8a76d62275789e',
    alt: 'Buy Partition Wall Panels Online | Materialbuy India',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/72e9fea37249af408d8a76d62275789e',
    alt: 'Buy Partition Wall Panels Online | Materialbuy India',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/72e9fea37249af408d8a76d62275789e',
    alt: 'Buy Partition Wall Panels Online | Materialbuy India',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Partition Wall Panels Online | Materialbuy India",
  ogDescription: "Discover high-quality Partition Wall Panels at Materialbuy. Shop a wide range of Partition Wall Panels for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Partition Wall Panels Online | Materialbuy India",
  twitterDescription: "Discover high-quality Partition Wall Panels at Materialbuy. Shop a wide range of Partition Wall Panels for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},

'gypsum-board': {
  title: "Buy Gypsum Boards Online | Materialbuy India",
  description: "Discover high-quality Gypsum Boards at Materialbuy. Shop a wide range of Gypsum Boards for your projects, ensuring durability and best prices.",
  keywords: "gypsum boards, drywall, interior walls, fire-resistant, lightweight, materialbuy",
  slug: "gypsum-board",
  canonicalUrl: `${BASE_URL}/allproducts/sheet-panel/gypsum-board`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/9de03e436bf5251b2150d3a8a3c93677',
    alt: 'Buy Gypsum Boards Online | Materialbuy India',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/9de03e436bf5251b2150d3a8a3c93677',
    alt: 'Buy Gypsum Boards Online | Materialbuy India',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/9de03e436bf5251b2150d3a8a3c93677',
    alt: 'Buy Gypsum Boards Online | Materialbuy India',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Gypsum Boards Online | Materialbuy India",
  ogDescription: "Discover high-quality Gypsum Boards at Materialbuy. Shop a wide range of Gypsum Boards for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Gypsum Boards Online | Materialbuy India",
  twitterDescription: "Discover high-quality Gypsum Boards at Materialbuy. Shop a wide range of Gypsum Boards for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},

'ply-board': {
  title: "Buy Ply Boards Online | Materialbuy India",
  description: "Discover high-quality Ply Boards at Materialbuy. Shop a wide range of Ply Boards for your projects, ensuring durability and best prices.",
  keywords: "plywood boards, furniture grade plywood, interior plywood, lightweight, materialbuy",
  slug: "ply-board",
  canonicalUrl: `${BASE_URL}/allproducts/sheet-panel/ply-board`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/5d51a1b07d6c09eacad237e62f6225f1',
    alt: 'Buy Plywood Boards Online | Materialbuy India',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/5d51a1b07d6c09eacad237e62f6225f1',
    alt: 'Buy Plywood Boards Online | Materialbuy India',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/5d51a1b07d6c09eacad237e62f6225f1',
    alt: 'Buy Plywood Boards Online | Materialbuy India',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Plywood Boards Online | Materialbuy India",
  ogDescription: "Discover high-quality Ply Boards at Materialbuy. Shop a wide range of Ply Boards for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Plywood Boards Online | Materialbuy India",
  twitterDescription: "Discover high-quality Ply Boards at Materialbuy. Shop a wide range of Ply Boards for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},

'acp-sheet': {
  title: "Buy ACP Sheets Online | Materialbuy India",
  description: "Discover high-quality ACP Sheets at Materialbuy. Shop a wide range of ACP Sheets for your projects, ensuring durability and best prices.",
  keywords: "ACP sheets, aluminium composite panels, exterior panels, interior panels, lightweight panels, materialbuy",
  slug: "acp-sheet",
  canonicalUrl: `${BASE_URL}/allproducts/sheet-panel/acp-sheet`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/f22c72fc07b7183c8e9656c4962ea41d',
    alt: 'Buy ACP Sheets Online | Materialbuy India',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/f22c72fc07b7183c8e9656c4962ea41d',
    alt: 'Buy ACP Sheets Online | Materialbuy India',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/f22c72fc07b7183c8e9656c4962ea41d',
    alt: 'Buy ACP Sheets Online | Materialbuy India',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy ACP Sheets Online | Materialbuy India",
  ogDescription: "Discover high-quality ACP Sheets at Materialbuy. Shop a wide range of ACP Sheets for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy ACP Sheets Online | Materialbuy India",
  twitterDescription: "Discover high-quality ACP Sheets at Materialbuy. Shop a wide range of ACP Sheets for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},


    //  Kitchen Subcategories
   'cabinet-hardware': {
  title: "Buy Cabinet Hardware Online | Materialbuy India",
  description: "Discover high-quality Cabinet Hardware at Materialbuy. Shop a wide range of Cabinet Hardware for your projects, ensuring durability and best prices.",
  keywords: "kitchen cabinet hardware, handles, knobs, hinges, premium hardware, materialbuy",
  slug: "cabinet-hardware",
  canonicalUrl: `${BASE_URL}/allproducts/kitchen/cabinet-hardware`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/a51fad16637a8d4386afa526d3e9591a',
    alt: 'Premium Kitchen Cabinet Hardware - Handles, Knobs & Hinges',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/a51fad16637a8d4386afa526d3e9591a',
    alt: 'Premium Kitchen Cabinet Hardware - Handles, Knobs & Hinges',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/a51fad16637a8d4386afa526d3e9591a',
    alt: 'Premium Kitchen Cabinet Hardware - Handles, Knobs & Hinges | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Cabinet Hardware Online | Materialbuy India",
  ogDescription: "Discover high-quality Cabinet Hardware at Materialbuy. Shop a wide range of Cabinet Hardware for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Cabinet Hardware Online | Materialbuy India",
  twitterDescription: "Discover high-quality Cabinet Hardware at Materialbuy. Shop a wide range of Cabinet Hardware for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},

'range-hood': {
  title: "Buy Range Hoods Online | Materialbuy India",
  description: "Discover high-quality Range Hoods at Materialbuy. Shop a wide range of Range Hoods for your projects, ensuring durability and best prices.",
  keywords: "range hoods, kitchen ventilation, stylish range hoods, efficient range hoods, materialbuy",
  slug: "range-hood",
  canonicalUrl: `${BASE_URL}/allproducts/kitchen/range-hood`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/56988f452f3d9cf32d6236cc6e7d88d1',
    alt: 'Stylish & Efficient Range Hoods - Kitchen Ventilation',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/56988f452f3d9cf32d6236cc6e7d88d1',
    alt: 'Range Hoods Online - Stylish & Efficient',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/56988f452f3d9cf32d6236cc6e7d88d1',
    alt: 'Range Hoods Online - Stylish & Efficient | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Range Hoods Online | Materialbuy India",
  ogDescription: "Discover high-quality Range Hoods at Materialbuy. Shop a wide range of Range Hoods for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Range Hoods Online | Materialbuy India",
  twitterDescription: "Discover high-quality Range Hoods at Materialbuy. Shop a wide range of Range Hoods for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},

'countertops': {
  title: "Buy Countertops Online | Materialbuy India",
  description: "Discover high-quality Countertops at Materialbuy. Shop a wide range of Countertops for your projects, ensuring durability and best prices.",
  keywords: "countertops, kitchen countertops, durable countertops, stylish countertops, materialbuy",
  slug: "countertops",
  canonicalUrl: `${BASE_URL}/allproducts/kitchen/countertops`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/087e07b359b5ccc82e498ff6719f354f',
    alt: 'Stylish & Durable Countertops - Kitchen Surfaces',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/087e07b359b5ccc82e498ff6719f354f',
    alt: 'Countertops Online - Stylish & Durable',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/087e07b359b5ccc82e498ff6719f354f',
    alt: 'Countertops Online - Stylish & Durable | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Countertops Online | Materialbuy India",
  ogDescription: "Discover high-quality Countertops at Materialbuy. Shop a wide range of Countertops for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Countertops Online | Materialbuy India",
  twitterDescription: "Discover high-quality Countertops at Materialbuy. Shop a wide range of Countertops for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},

'cabinet-finishes': {
  title: "Buy Cabinet Finishes Online | Materialbuy India",
  description: "Discover high-quality Cabinet Finishes at Materialbuy. Shop a wide range of Cabinet Finishes for your projects, ensuring durability and best prices.",
  keywords: "cabinet finishes, kitchen cabinet finishes, durable cabinet finishes, stylish cabinet finishes, materialbuy",
  slug: "cabinet-finishes",
  canonicalUrl: `${BASE_URL}/allproducts/kitchen/cabinet-finishes`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/95c629a45d5ac81c0debc28ab2b42865',
    alt: 'Stylish & Durable Cabinet Finishes - Kitchen Surfaces',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/95c629a45d5ac81c0debc28ab2b42865',
    alt: 'Cabinet Finishes Online - Elegant & Durable',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/95c629a45d5ac81c0debc28ab2b42865',
    alt: 'Cabinet Finishes Online - Elegant & Durable | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Cabinet Finishes Online | Materialbuy India",
  ogDescription: "Discover high-quality Cabinet Finishes at Materialbuy. Shop a wide range of Cabinet Finishes for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Cabinet Finishes Online | Materialbuy India",
  twitterDescription: "Discover high-quality Cabinet Finishes at Materialbuy. Shop a wide range of Cabinet Finishes for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},


    //  Bed & Bath Subcategories
   'bathroom-faucets': {
  title: "Buy Bathroom Faucets Online | Materialbuy India",
  description: "Discover high-quality Bathroom Faucets at Materialbuy. Shop a wide range of Bathroom Faucets for your projects, ensuring durability and best prices.",
  keywords: "faucets online, bathroom faucets, kitchen faucets, modern faucets, durable faucets, materialbuy",
  slug: "bathroom-faucets",
  canonicalUrl: `${BASE_URL}/allproducts/bed-bath/bathroom-faucets`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/0b85ddd44a9eb39fc2b5ac7302327496',
    alt: 'Premium Faucets - Modern Bathroom & Kitchen',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/0b85ddd44a9eb39fc2b5ac7302327496',
    alt: 'Faucets Online - Modern & Durable Bathroom Fittings',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/0b85ddd44a9eb39fc2b5ac7302327496',
    alt: 'Faucets Online - Modern & Durable | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Bathroom Faucets Online | Materialbuy India",
  ogDescription: "Discover high-quality Bathroom Faucets at Materialbuy. Shop a wide range of Bathroom Faucets for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Bathroom Faucets Online | Materialbuy India",
  twitterDescription: "Discover high-quality Bathroom Faucets at Materialbuy. Shop a wide range of Bathroom Faucets for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},

'bathroom-sinks': {
  title: "Buy Bathroom Sinks Online | Materialbuy India",
  description: "Discover high-quality Bathroom Sinks at Materialbuy. Shop a wide range of Bathroom Sinks for your projects, ensuring durability and best prices.",
  keywords: "sinks online, bathroom sinks, kitchen sinks, modern sinks, durable sinks, materialbuy",
  slug: "bathroom-sinks",
  canonicalUrl: `${BASE_URL}/allproducts/bed-bath/bathroom-sinks`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/524d2ecca30cbba74db12ec8b88df99b',
    alt: 'Premium Sinks - Modern Bathroom & Kitchen',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/524d2ecca30cbba74db12ec8b88df99b',
    alt: 'Sinks Online - Modern & Durable Bathroom Fittings',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/524d2ecca30cbba74db12ec8b88df99b',
    alt: 'Sinks Online - Modern & Durable | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Bathroom Sinks Online | Materialbuy India",
  ogDescription: "Discover high-quality Bathroom Sinks at Materialbuy. Shop a wide range of Bathroom Sinks for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Bathroom Sinks Online | Materialbuy India",
  twitterDescription: "Discover high-quality Bathroom Sinks at Materialbuy. Shop a wide range of Bathroom Sinks for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},

'shower-faucets': {
  title: "Buy Shower Faucets Online | Materialbuy India",
  description: "Discover high-quality Shower Faucets at Materialbuy. Shop a wide range of Shower Faucets for your projects, ensuring durability and best prices.",
  keywords: "showers online, rain showers, hand showers, overhead showers, modern showers, bathroom showers, materialbuy",
  slug: "shower-faucets",
  canonicalUrl: `${BASE_URL}/allproducts/bed-bath/shower-faucets`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/5916c740b38aedd3dcb9935e722fd82d',
    alt: 'Modern Showers - Rain, Hand & Overhead',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/5916c740b38aedd3dcb9935e722fd82d',
    alt: 'Showers Online - Rain, Hand & Overhead Showers',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/5916c740b38aedd3dcb9935e722fd82d',
    alt: 'Showers Online - Rain, Hand & Overhead Showers | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Shower Faucets Online | Materialbuy India",
  ogDescription: "Discover high-quality Shower Faucets at Materialbuy. Shop a wide range of Shower Faucets for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Shower Faucets Online | Materialbuy India",
  twitterDescription: "Discover high-quality Shower Faucets at Materialbuy. Shop a wide range of Shower Faucets for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},

'toilets': {
  title: "Buy Toilets Online | Materialbuy India",
  description: "Discover high-quality Toilets at Materialbuy. Shop a wide range of Toilets for your projects, ensuring durability and best prices.",
  keywords: "toilets online, modern toilets, hygienic toilets, water efficient toilets, stylish toilets, bathroom fittings, materialbuy",
  slug: "toilets",
  canonicalUrl: `${BASE_URL}/allproducts/bed-bath/toilets`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/2ef1e9d74815e0870c92cc7021daa616',
    alt: 'Premium Toilets - Modern & Hygienic',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/2ef1e9d74815e0870c92cc7021daa616',
    alt: 'Toilets Online - Modern & Hygienic Bathroom Fittings',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/2ef1e9d74815e0870c92cc7021daa616',
    alt: 'Toilets Online - Modern & Hygienic | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Toilets Online | Materialbuy India",
  ogDescription: "Discover high-quality Toilets at Materialbuy. Shop a wide range of Toilets for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Toilets Online | Materialbuy India",
  twitterDescription: "Discover high-quality Toilets at Materialbuy. Shop a wide range of Toilets for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},

'bathtubs': {
  title: "Buy Bathtubs Online | Materialbuy India",
  description: "Discover high-quality Bathtubs at Materialbuy. Shop a wide range of Bathtubs for your projects, ensuring durability and best prices.",
  keywords: "bathtubs online, modern bathtubs, stylish bathtubs, durable bathtubs, elegant bathtubs, bathroom fittings, materialbuy",
  slug: "bathtubs",
  canonicalUrl: `${BASE_URL}/allproducts/bed-bath/bathtubs`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/b99dbe2ba8e3688e8601079260fc699f',
    alt: 'Premium Bathtubs - Modern & Stylish',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/b99dbe2ba8e3688e8601079260fc699f',
    alt: 'Bathtubs Online - Modern & Stylish Bathroom Fittings',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/b99dbe2ba8e3688e8601079260fc699f',
    alt: 'Bathtubs Online - Modern & Stylish | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Bathtubs Online | Materialbuy India",
  ogDescription: "Discover high-quality Bathtubs at Materialbuy. Shop a wide range of Bathtubs for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Bathtubs Online | Materialbuy India",
  twitterDescription: "Discover high-quality Bathtubs at Materialbuy. Shop a wide range of Bathtubs for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},
    
   'bathroom-tiles': {
  title: "Buy Bathroom Tiles Online | Materialbuy India",
  description: "Discover high-quality Bathroom Tiles at Materialbuy. Shop a wide range of Bathroom Tiles for your projects, ensuring durability and best prices.",
  keywords: "bathroom tiles, bathroom wall tiles, bathroom floor tiles, waterproof tiles, stylish bathroom tiles, materialbuy",
  slug: "bathroom-tiles",
  canonicalUrl: `${BASE_URL}/allproducts/flooring/bathroom-tiles`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/abcf9517a614a5436a089cab4a373547',
    alt: 'Bathroom Tiles Online - Wall & Floor Solutions',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/abcf9517a614a5436a089cab4a373547',
    alt: 'Bathroom Tiles Online - Wall & Floor Tiles',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/abcf9517a614a5436a089cab4a373547',
    alt: 'Bathroom Tiles Online - Wall & Floor Tiles | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Bathroom Tiles Online | Materialbuy India",
  ogDescription: "Discover high-quality Bathroom Tiles at Materialbuy. Shop a wide range of Bathroom Tiles for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Bathroom Tiles Online | Materialbuy India",
  twitterDescription: "Discover high-quality Bathroom Tiles at Materialbuy. Shop a wide range of Bathroom Tiles for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},

'door-knobs': {
  title: "Buy Door Knobs Online | Materialbuy India",
  description: "Discover high-quality Door Knobs at Materialbuy. Shop a wide range of Door Knobs for your projects, ensuring durability and best prices.",
  keywords: "door knobs, modern door knobs, classic door knobs, durable door knobs, materialbuy",
  slug: "door-knobs",
  canonicalUrl: `${BASE_URL}/allproducts/hardware/door-knobs`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/e6b5322bd34d3945a8a38805d07ef469',
    alt: 'Premium Door Knobs - Durable & Elegant',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/e6b5322bd34d3945a8a38805d07ef469',
    alt: 'Door Knobs Online - Durable & Elegant',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/e6b5322bd34d3945a8a38805d07ef469',
    alt: 'Door Knobs Online - Durable & Elegant | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Door Knobs Online | Materialbuy India",
  ogDescription: "Discover high-quality Door Knobs at Materialbuy. Shop a wide range of Door Knobs for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Door Knobs Online | Materialbuy India",
  twitterDescription: "Discover high-quality Door Knobs at Materialbuy. Shop a wide range of Door Knobs for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},

'door-levers': {
  title: "Buy Door Levers Online | Materialbuy India",
  description: "Discover high-quality Door Levers at Materialbuy. Shop a wide range of Door Levers for your projects, ensuring durability and best prices.",
  keywords: "door levers, door knobs, door handles, stylish handles, door hardware, materialbuy",
  slug: "door-levers",
  canonicalUrl: `${BASE_URL}/allproducts/hardware/door-levers`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/d1bbdae097573313524ab96f765d25e6',
    alt: 'Door Levers - Stylish Handles',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/d1bbdae097573313524ab96f765d25e6',
    alt: 'Door Levers Online - Stylish Handles',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/d1bbdae097573313524ab96f765d25e6',
    alt: 'Door Levers Online - Stylish Handles | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Door Levers Online | Materialbuy India",
  ogDescription: "Discover high-quality Door Levers at Materialbuy. Shop a wide range of Door Levers for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Door Levers Online | Materialbuy India",
  twitterDescription: "Discover high-quality Door Levers at Materialbuy. Shop a wide range of Door Levers for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},

    
   'handle-sets': {
  title: "Buy Handle Sets Online | Materialbuy India",
  description: "Discover high-quality Handle Sets at Materialbuy. Shop a wide range of Handle Sets for your projects, ensuring durability and best prices.",
  keywords: "handle sets, door handles, cabinet handles, wardrobe handles, modern handles, materialbuy",
  slug: "handle-sets",
  canonicalUrl: `${BASE_URL}/allproducts/hardware/handle-sets`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/6ee28d0bebd8772594d27a1b082d2dad',
    alt: 'Handle Sets - Modern Door & Cabinet Handles',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/6ee28d0bebd8772594d27a1b082d2dad',
    alt: 'Handle Sets Online - Modern Door & Cabinet Handles',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/6ee28d0bebd8772594d27a1b082d2dad',
    alt: 'Handle Sets Online - Modern Door & Cabinet Handles | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Handle Sets Online | Materialbuy India",
  ogDescription: "Discover high-quality Handle Sets at Materialbuy. Shop a wide range of Handle Sets for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Handle Sets Online | Materialbuy India",
  twitterDescription: "Discover high-quality Handle Sets at Materialbuy. Shop a wide range of Handle Sets for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},

'cabinet-hardware': {
  title: "Buy Cabinet Hardware Online | Materialbuy India",
  description: "Discover high-quality Cabinet Hardware at Materialbuy. Shop a wide range of Cabinet Hardware for your projects, ensuring durability and best prices.",
  keywords: "cabinet hardware, cabinet hinges, cabinet knobs, cabinet handles, affordable hardware, materialbuy",
  slug: "cabinet-hardware",
  canonicalUrl: `${BASE_URL}/allproducts/hardware/cabinet-hardware`,
  image: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/dd7da50c26638d65463bc3b2ceb91b06',
    alt: 'Cabinet Hardware - Hinges, Knobs & Handles',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/dd7da50c26638d65463bc3b2ceb91b06',
    alt: 'Cabinet Hardware Online - Hinges, Knobs & Handles',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  twitterImage: {
    url: 'https://mbuy.blr1.digitaloceanspaces.com/dd7da50c26638d65463bc3b2ceb91b06',
    alt: 'Cabinet Hardware Online - Hinges, Knobs & Handles | MaterialBuy',
    width: 1200,
    height: 630,
    type: 'image/jpeg'
  },
  ogTitle: "Buy Cabinet Hardware Online | Materialbuy India",
  ogDescription: "Discover high-quality Cabinet Hardware at Materialbuy. Shop a wide range of Cabinet Hardware for your projects, ensuring durability and best prices.",
  twitterTitle: "Buy Cabinet Hardware Online | Materialbuy India",
  twitterDescription: "Discover high-quality Cabinet Hardware at Materialbuy. Shop a wide range of Cabinet Hardware for your projects, ensuring durability and best prices.",
  priority: "0.8",
  changefreq: "weekly"
},

    
    // 'hinges': {
    //   title: "Hinges Online - Durable & Rust-Free Hinges | MaterialBuy",
    //   description: "Buy durable hinges for cabinets, wardrobes & doors. Rust-free & long-lasting.",
    //   keywords: "hinges online, cabinet hinges, door hinges, wardrobe hinges, rust-free hinges, durable hinges, materialbuy",
    //   slug: "hinges",
    //   canonicalUrl: `${BASE_URL}/allproducts/hardware/hinges`,
    //   image: createImageMeta('og-hinges.jpg', 'Premium Hinges - Durable & Rust-Free'),
    //   ogImage: createImageMeta('og-hinges.jpg', 'Hinges Online - Durable & Rust-Free Hinges'),
    //   twitterImage: createImageMeta('og-hinges.jpg', 'Hinges Online - Durable & Rust-Free Hinges | MaterialBuy'),
    //   ogTitle: "Premium Hinges - Durable & Reliable",
    //   ogDescription: "High-quality hinges for cabinets, wardrobes & doors. Rust-resistant & long-lasting performance.",
    //   twitterTitle: "Hinges Online - Durable & Rust-Free Hinges | MaterialBuy",
    //   twitterDescription: "Buy durable hinges for cabinets, wardrobes & doors.",
    //   priority: "0.8",
    //   changefreq: "weekly"
    // },

    //  Tools & Machineries Subcategories
    // 'power-tools': {
    //   title: "Power Tools Online - Drills, Saws & More | MaterialBuy",
    //   description: "Buy branded power tools - drills, saws & grinders. Durable, efficient & reliable.",
    //   keywords: "power tools online, electric drills, power saws, grinders, branded tools, professional tools, materialbuy",
    //   slug: "power-tools",
    //   canonicalUrl: `${BASE_URL}/allproducts/tools-machineries/power-tools`,
    //   image: createImageMeta('og-power-tools.jpg', 'Branded Power Tools - Drills, Saws & More'),
    //   ogImage: createImageMeta('og-power-tools.jpg', 'Power Tools Online - Drills, Saws & More'),
    //   twitterImage: createImageMeta('og-power-tools.jpg', 'Power Tools Online - Drills, Saws & More | MaterialBuy'),
    //   ogTitle: "Branded Power Tools - Professional Quality",
    //   ogDescription: "Professional power tools including drills, saws & grinders from trusted brands.",
    //   twitterTitle: "Power Tools Online - Drills, Saws & More | MaterialBuy",
    //   twitterDescription: "Buy branded power tools - drills, saws & grinders.",
    //   priority: "0.8",
    //   changefreq: "weekly"
    // },
    
    // 'hand-tools': {
    //   title: "Hand Tools Online - Spanners, Screwdrivers & More | MaterialBuy",
    //   description: "Affordable hand tools for DIY & professional use. Strong, durable & long-lasting.",
    //   keywords: "hand tools online, spanners, screwdrivers, hand tools set, DIY tools, manual tools, materialbuy",
    //   slug: "hand-tools",
    //   canonicalUrl: `${BASE_URL}/allproducts/tools-machineries/hand-tools`,
    //   image: createImageMeta('og-hand-tools.jpg', 'Hand Tools - Spanners, Screwdrivers & More'),
    //   ogImage: createImageMeta('og-hand-tools.jpg', 'Hand Tools Online - Spanners, Screwdrivers & More'),
    //   twitterImage: createImageMeta('og-hand-tools.jpg', 'Hand Tools Online - Spanners, Screwdrivers & More | MaterialBuy'),
    //   ogTitle: "Hand Tools - Professional & DIY",
    //   ogDescription: "Quality hand tools for professional & DIY use. Durable spanners, screwdrivers & more.",
    //   twitterTitle: "Hand Tools Online - Spanners, Screwdrivers & More | MaterialBuy",
    //   twitterDescription: "Affordable hand tools for DIY & professional use.",
    //   priority: "0.8",
    //   changefreq: "weekly"
    // },
    
    // 'construction-tools': {
    //   title: "Construction Tools Online - Mixers, Cutters & More | MaterialBuy",
    //   description: "Shop construction tools for efficient site work. Durable & reliable.",
    //   keywords: "construction tools, concrete mixers, tile cutters, construction equipment, site tools, materialbuy",
    //   slug: "construction-tools",
    //   canonicalUrl: `${BASE_URL}/allproducts/tools-machineries/construction-tools`,
    //   image: createImageMeta('og-construction-tools.jpg', 'Construction Tools - Mixers, Cutters & Equipment'),
    //   ogImage: createImageMeta('og-construction-tools.jpg', 'Construction Tools Online - Mixers, Cutters & More'),
    //   twitterImage: createImageMeta('og-construction-tools.jpg', 'Construction Tools Online - Mixers, Cutters & More | MaterialBuy'),
    //   ogTitle: "Construction Tools - Heavy Duty Equipment",
    //   ogDescription: "Professional construction tools & equipment for efficient site work. Durable & reliable.",
    //   twitterTitle: "Construction Tools Online - Mixers, Cutters & More | MaterialBuy",
    //   twitterDescription: "Shop construction tools for efficient site work.",
    //   priority: "0.8",
    //   changefreq: "weekly"
    // },
    
    // 'cladding-materials': {
    //   title: "Cladding Materials Online - Exterior & Interior Panels | MaterialBuy",
    //   description: "Explore wall cladding materials for interiors & exteriors. Durable, stylish & weather resistant.",
    //   keywords: "cladding materials, wall cladding, exterior cladding, interior cladding, cladding panels, materialbuy",
    //   slug: "cladding-materials",
    //   canonicalUrl: `${BASE_URL}/allproducts/tools-machineries/cladding-materials`,
    //   image: createImageMeta('og-cladding-materials.jpg', 'Cladding Materials - Exterior & Interior Panels'),
    //   ogImage: createImageMeta('og-cladding-materials.jpg', 'Cladding Materials Online - Exterior & Interior Panels'),
    //   twitterImage: createImageMeta('og-cladding-materials.jpg', 'Cladding Materials Online - Exterior & Interior Panels | MaterialBuy'),
    //   ogTitle: "Cladding Materials - Stylish & Weather Resistant",
    //   ogDescription: "Premium cladding materials for exterior & interior walls. Weather-resistant & stylish panels.",
    //   twitterTitle: "Cladding Materials Online - Exterior & Interior Panels | MaterialBuy",
    //   twitterDescription: "Explore wall cladding materials for interiors & exteriors.",
    //   priority: "0.8",
    //   changefreq: "weekly"
    // }
  }
};

// Helper functions with complete metadata generation
export const getCategoryMetadata = (categorySlug) => {
  try {
    if (!categorySlug || typeof categorySlug !== 'string') {
      console.warn('Invalid category slug provided:', categorySlug);
      return getDefaultMetadata('category', categorySlug);
    }

    const metadata = METADATA_CONFIG.categories[categorySlug.toLowerCase()];
    
    if (metadata) {
      return {
        ...metadata,
        lastModified: new Date().toISOString(),
        breadcrumbs: [
          { name: 'Home', url: BASE_URL },
          { name: 'All Products', url: `${BASE_URL}/allproducts` },
          { name: metadata.title.split('|')[0].trim(), url: metadata.canonicalUrl }
        ]
      };
    }
    
    return getDefaultMetadata('category', categorySlug);
  } catch (error) {
    console.error('Error getting category metadata:', error);
    return getDefaultMetadata('category', categorySlug);
  }
};

export const getSubcategoryMetadata = (subcategorySlug, categorySlug = '') => {
  try {
    if (!subcategorySlug || typeof subcategorySlug !== 'string') {
      console.warn('Invalid subcategory slug provided:', subcategorySlug);
      return getDefaultMetadata('subcategory', subcategorySlug, categorySlug);
    }

    const metadata = METADATA_CONFIG.subcategories[subcategorySlug.toLowerCase()];
    
    if (metadata) {
      const categoryMeta = categorySlug ? getCategoryMetadata(categorySlug) : null;
      
      return {
        ...metadata,
        lastModified: new Date().toISOString(),
        breadcrumbs: [
          { name: 'Home', url: BASE_URL },
          ...(categoryMeta ? [{ name: categoryMeta.title.split('|')[0].trim(), url: categoryMeta.canonicalUrl }] : []),
          { name: metadata.title.split('|')[0].trim(), url: metadata.canonicalUrl }
        ]
      };
    }
    
    return getDefaultMetadata('subcategory', subcategorySlug, categorySlug);
  } catch (error) {
    console.error('Error getting subcategory metadata:', error);
    return getDefaultMetadata('subcategory', subcategorySlug, categorySlug);
  }
};

// Fallback metadata generator
const getDefaultMetadata = (type, slug, parentSlug = '') => {
  if (!slug) return METADATA_CONFIG.homepage;

  const cleanTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  
  const defaults = {
    category: {
      title: `${cleanTitle} Online | MaterialBuy - Building Materials Store`,
      description: `Shop ${cleanTitle.toLowerCase()} online at MaterialBuy. Quality building materials with pan-India delivery & competitive prices.`,
      keywords: `${slug.replace(/-/g, ', ')}, materialbuy, building materials, online shopping india`,
      canonicalUrl: `${BASE_URL}/allproducts/${slug}`,
      priority: "0.8"
    },
    subcategory: {
      title: `${cleanTitle} Online | MaterialBuy - Quality Building Materials`,
      description: `Buy ${cleanTitle.toLowerCase()} online at MaterialBuy. Premium quality products with fast delivery across India.`,
      keywords: `${slug.replace(/-/g, ', ')}, materialbuy, building materials, ${parentSlug?.replace(/-/g, ', ') || ''}`,
      canonicalUrl: parentSlug 
        ? `${BASE_URL}/allproducts/${parentSlug}/${slug}`
        : `${BASE_URL}/allproducts/category/${slug}`,
      priority: "0.7"
    }
  };

  const base = defaults[type] || defaults.category;
  
  return {
    ...base,
    ogTitle: base.title.replace(' | MaterialBuy', ''),
    ogDescription: base.description,
    ogImage: createImageMeta('og-default.jpg', `${cleanTitle} - MaterialBuy`),
    twitterTitle: base.title,
    twitterDescription: base.description.substring(0, 160),
    image: createImageMeta('default-category.jpg', `${cleanTitle} - Building Materials Online`),
    twitterImage: createImageMeta('twitter-default.jpg', `Buy ${cleanTitle} Online`),
    changefreq: "weekly",
    lastModified: new Date().toISOString()
  };
};

// Advanced metadata utilities
export const generateStructuredData = (pageType, metadata, additionalData = {}) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": pageType === 'homepage' ? "Organization" : "CollectionPage",
    "name": metadata.title.split('|')[0].trim(),
    "description": metadata.description,
    "url": metadata.canonicalUrl,
    "image": metadata.image.url,
    "lastModified": metadata.lastModified || new Date().toISOString(),
    "inLanguage": "en-IN"
  };

  if (pageType === 'homepage') {
    return {
      ...baseSchema,
      "legalName": "MaterialBuy Private Limited",
      "logo": metadata.image.url,
      "foundingDate": "2020",
      "sameAs": [
        "https://facebook.com/materialbuy",
        "https://twitter.com/materialbuy",
        "https://instagram.com/materialbuy",
        "https://linkedin.com/company/materialbuy"
      ],
      "contactPoint": [{
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "availableLanguage": ["English", "Hindi"],
        "areaServed": "IN",
        "hoursAvailable": "Mo-Su 09:00-18:00"
      }],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN",
        "addressRegion": "India"
      }
    };
  }

  return {
    ...baseSchema,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": metadata.breadcrumbs?.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
      })) || []
    },
    "provider": {
      "@type": "Organization",
      "name": "MaterialBuy",
      "url": BASE_URL,
      "logo": DEFAULT_IMAGE
    },
    ...additionalData
  };
};

// SEO utilities
export const generateSEOTags = (metadata) => ({
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  googlebot: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  bingbot: "index, follow",
  author: "MaterialBuy",
  publisher: "MaterialBuy Private Limited",
  copyright: `© ${new Date().getFullYear()} MaterialBuy Private Limited. All rights reserved.`,
  language: "en-IN",
  geoRegion: "IN",
  geoCountry: "India",
  themeColor: "#1f2937",
  msapplicationTileColor: "#1f2937",
  appleMobileWebAppTitle: "MaterialBuy",
  applicationName: "MaterialBuy"
});

// Validation function
export const validateMetadata = (metadata) => {
  const errors = [];
  
  if (!metadata.title || metadata.title.length > 60) {
    errors.push('Title should be between 1-60 characters');
  }
  
  if (!metadata.description || metadata.description.length > 160) {
    errors.push('Description should be between 1-160 characters');
  }
  
  if (!metadata.canonicalUrl || !metadata.canonicalUrl.startsWith('https://')) {
    errors.push('Canonical URL should be a valid HTTPS URL');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Export configuration
export const METADATA_VERSION = '2.0.0';
export const LAST_UPDATED = new Date().toISOString();

export default {
  METADATA_CONFIG,
  getCategoryMetadata,
  getSubcategoryMetadata,
  generateStructuredData,
  generateSEOTags,
  validateMetadata,
  generateSlug
};
