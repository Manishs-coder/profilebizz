/**
 * Navigation constants used in App.tsx (header menus, footer links).
 * Kept separate from page components so pages can be lazy-loaded
 * without pulling in all their heavy data at startup.
 */

export const FEATURED_BRANDS = [
  { slug: 'amul',        name: 'Amul',         sector: 'Dairy · Cooperative',   founded: '1946', logo: '🧈' },
  { slug: 'parle',       name: 'Parle',         sector: 'FMCG · Biscuits',      founded: '1929', logo: '🍪' },
  { slug: 'haldiram',    name: 'Haldiram\'s',   sector: 'Food · Snacks',         founded: '1937', logo: '🍿' },
  { slug: 'tata',        name: 'Tata Group',    sector: 'Conglomerate',          founded: '1868', logo: '⚙️' },
  { slug: 'mahindra',    name: 'Mahindra',      sector: 'Auto · Conglomerate',   founded: '1945', logo: '🚗' },
  { slug: 'asian-paints',name: 'Asian Paints',  sector: 'Paints · Décor',        founded: '1942', logo: '🎨' },
  { slug: 'vedas-agro',  name: 'Vedas Agro',    sector: 'Agri-Processing',       founded: '2011', logo: '🌾' },
];

export const FEATURED_INDUSTRIES = [
  { slug: 'steel',        name: 'Steel',           icon: '🏗️', tag: 'Core Sector',      size: '₹2.5L Cr' },
  { slug: 'scrap',        name: 'Scrap Industry',  icon: '♻️', tag: 'Circular Economy',  size: '₹1.2L Cr' },
  { slug: 'agriculture',  name: 'Agriculture',     icon: '🌾', tag: 'Foundation',        size: '₹20L Cr' },
  { slug: 'fmcg',         name: 'FMCG',            icon: '🛒', tag: 'Consumer Goods',    size: '₹5.8L Cr' },
  { slug: 'solar',        name: 'Solar Energy',    icon: '☀️', tag: 'Clean Tech',        size: '₹1.8L Cr' },
  { slug: 'ev',           name: 'Electric Vehicles',icon: '⚡', tag: 'Future Mobility',   size: '₹50,000 Cr' },
  { slug: 'biofuel',      name: 'Biofuel',         icon: '🌿', tag: 'Green Energy',      size: '₹35,000 Cr' },
  { slug: 'real-estate',  name: 'Real Estate',     icon: '🏘️', tag: 'Infra',             size: '₹13L Cr' },
  { slug: 'healthcare',   name: 'Healthcare',      icon: '🏥', tag: 'Life Sciences',     size: '₹8.6L Cr' },
  { slug: 'it',           name: 'IT & Technology', icon: '💻', tag: 'Digital Economy',   size: '₹10.4L Cr' },
];

export const FEATURED_CITIES = [
  { slug: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat',     icon: '🏙️', tag: 'Textile & Trade Capital',   businesses: '4.2L+' },
  { slug: 'rajkot',    name: 'Rajkot',    state: 'Gujarat',     icon: '⚙️', tag: 'Engineering Hub',           businesses: '1.8L+' },
  { slug: 'vadodara',  name: 'Vadodara',  state: 'Gujarat',     icon: '🏭', tag: 'Chemical & Pharma Belt',    businesses: '2.1L+' },
  { slug: 'delhi',     name: 'Delhi NCR', state: 'Delhi',       icon: '🏛️', tag: 'India\'s Business Capital', businesses: '12L+' },
  { slug: 'surat',     name: 'Surat',     state: 'Gujarat',     icon: '💎', tag: 'Diamond & Textile City',    businesses: '3.5L+' },
  { slug: 'mumbai',    name: 'Mumbai',    state: 'Maharashtra', icon: '🌊', tag: 'Financial Capital of India', businesses: '15L+' },
];

export const SUCCESS_CATEGORIES = [
  { slug: 'business-growth', label: 'Business Growth',  icon: '📈', tag: 'Scale & Expansion',   color: '#002B49' },
  { slug: 'export-success',  label: 'Export Success',   icon: '🌍', tag: 'Made in India',        color: '#1a5c38' },
  { slug: 'startup-success', label: 'Startup Success',  icon: '🚀', tag: 'Zero to One',          color: '#5c1a1a' },
  { slug: 'women-success',   label: 'Women Success',    icon: '👩‍💼', tag: 'Trailblazers',         color: '#5c1a5c' },
  { slug: 'youth-success',   label: 'Youth Success',    icon: '⚡', tag: 'Gen Z & Millennials',  color: '#1a3d5c' },
  { slug: 'village-success', label: 'Village Success',  icon: '🌾', tag: 'Bharat Rising',        color: '#3d2b1a' },
];

export const IMPACT_CATEGORIES = [
  { slug: 'ngo',                 label: 'NGO',                 icon: '🤝', tag: 'Community Champions', color: '#1a3a5c' },
  { slug: 'education',           label: 'Education',           icon: '📚', tag: 'Learning for All',    color: '#1a5c2e' },
  { slug: 'healthcare',          label: 'Healthcare',          icon: '🏥', tag: 'Health Equity',       color: '#5c1a1a' },
  { slug: 'environment',         label: 'Environment',         icon: '🌱', tag: 'Healing the Planet',  color: '#1a4a1a' },
  { slug: 'village-development', label: 'Village Development', icon: '🏘️', tag: 'Bharat Rising',       color: '#3d2b0a' },
  { slug: 'csr',                 label: 'CSR',                 icon: '🏢', tag: 'Corporate Giving Back',color: '#2b0a3d' },
];

export const NEWS_CATEGORIES = [
  { slug: 'funding',        label: 'Funding',       icon: '💰', tag: 'Investments & Rounds',  color: '#0a2e1a' },
  { slug: 'expansion',      label: 'Expansion',     icon: '📡', tag: 'Growth & New Markets',  color: '#0a1e3d' },
  { slug: 'factory-launch', label: 'Factory Launch',icon: '🏭', tag: 'Manufacturing India',   color: '#2e1a0a' },
  { slug: 'new-products',   label: 'New Products',  icon: '🚀', tag: 'Launches & Innovations',color: '#1a0a2e' },
  { slug: 'acquisitions',   label: 'Acquisitions',  icon: '🤝', tag: 'Mergers & Deals',       color: '#2e0a0a' },
  { slug: 'awards',         label: 'Awards',        icon: '🏆', tag: 'Recognition & Rankings',color: '#2e2a0a' },
  { slug: 'govt-schemes',   label: 'Govt. Schemes', icon: '🏛️', tag: 'Policy & Benefits',     color: '#0a2a2e' },
];
