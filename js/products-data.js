/* ============================================================
   Aquatel Technologies - Editable Configuration & Data
   ------------------------------------------------------------
   EDIT THIS FILE to change products, pricing, contact details,
   and the demo water-quality numbers. Everything is plain data
   so no build step is required.
   ============================================================ */

/* ----- Site / contact config (PLACEHOLDERS - replace before launch) ----- */
const AQUATEL_CONFIG = {
  brand: "Aquatel Technologies",
  tagline: "Pure Water. Refined by Science.",
  // Placeholder contact details - replace with real values.
  phoneDisplay: "Contact number placeholder",
  whatsappNumber: "27000000000",        // intl format, no +, no spaces (placeholder ZA number)
  email: "hello@aquatel-placeholder.co.za",
  address: "Delivery areas to be confirmed",
  hours: "Mon - Sat, business hours (to be confirmed)",
  currency: "R",                          // South African Rand
  social: {
    facebook: "#", instagram: "#", linkedin: "#", x: "#"
  }
};

/* ----- Product catalogue (pricing intentionally TBC) ----- */
const aquatelProducts = [
  {
    id: "water-330ml",
    name: "330ml Purified Water",
    type: "Bottled Water",
    sizeLitres: 0.33,
    customerTypes: ["Home", "Office", "Gym", "Event"],
    description: "Single-serve reverse osmosis purified water - perfect for events, lunchboxes, and on-the-go hydration.",
    useCase: "Best for events & single servings",
    image: "assets/images/bottle-330ml.png",
    price: "Pricing TBC"
  },
  {
    id: "water-500ml",
    name: "500ml Purified Water",
    type: "Bottled Water",
    sizeLitres: 0.5,
    customerTypes: ["Home", "Office", "Gym", "Event"],
    description: "Compact reverse osmosis purified drinking water for daily hydration, events, and resale packs.",
    useCase: "Best for events, gyms & on-the-go",
    image: "assets/images/bottle-500ml.png",
    price: "Pricing TBC"
  },
  {
    id: "water-750ml",
    name: "750ml Purified Water",
    type: "Bottled Water",
    sizeLitres: 0.75,
    customerTypes: ["Home", "Office", "Gym"],
    description: "A generous single-bottle size for desks, gym bags, and daily hydration with fewer refills.",
    useCase: "Best for desk & gym hydration",
    image: "assets/images/bottle-750ml.png",
    price: "Pricing TBC"
  },
  {
    id: "water-1-5l",
    name: "1.5L Purified Water",
    type: "Bottled Water",
    sizeLitres: 1.5,
    customerTypes: ["Home", "Office", "Gym"],
    description: "Larger bottled option for daily use, family hydration, and workplace refreshment.",
    useCase: "Best for daily home & desk use",
    image: "assets/images/bottle-1-5l.png",
    price: "Pricing TBC"
  },
  {
    id: "water-5l",
    name: "5L Purified Water",
    type: "Bottled Water",
    sizeLitres: 5,
    customerTypes: ["Home", "Office", "Business"],
    description: "Convenient family and small-office purified water supply.",
    useCase: "Best for families & small offices",
    image: "assets/images/bottle-5l.png",
    price: "Pricing TBC"
  },
  {
    id: "refill-10l",
    name: "10L Refill",
    type: "Refill",
    sizeLitres: 10,
    customerTypes: ["Home", "Office", "Business"],
    description: "Reverse osmosis purified refill option for reusable containers.",
    useCase: "Best for reusable container refills",
    price: "Pricing TBC"
  },
  {
    id: "refill-20l",
    name: "20L Refill",
    type: "Refill",
    sizeLitres: 20,
    customerTypes: ["Home", "Office", "Gym", "Business"],
    description: "Bulk refill option ideal for offices, gyms, and higher-consumption households.",
    useCase: "Best for offices, gyms & busy homes",
    price: "Pricing TBC"
  },
  {
    id: "bulk-office",
    name: "Bulk Office Supply",
    type: "Bulk Supply",
    sizeLitres: 100,
    customerTypes: ["Office", "Business"],
    description: "Scheduled purified water supply for offices and commercial customers.",
    useCase: "Best for scheduled commercial supply",
    price: "Custom Quote"
  }
];

/* ----- Water quality DEMO data (illustrative only, not lab results) ----- */
const waterQualityDemo = {
  labels: ["TDS", "Taste", "Clarity", "Odour", "Filtration", "Consistency"],
  tapWater: [65, 45, 55, 40, 35, 50],
  aquatelWater: [95, 92, 96, 94, 98, 93]
};

/* ----- Subscription plans ----- */
const aquatelPlans = [
  {
    id: "home-starter",
    name: "Home Starter",
    tag: "Households",
    forWho: "Couples & small families",
    weekly: { litres: "40 - 60L", freq: "1 delivery / week", price: "Pricing TBC" },
    monthly: { litres: "160 - 240L", freq: "4 deliveries / month", price: "Pricing TBC" },
    features: [
      "5L & 10L purified water",
      "Choice of delivery or refill",
      "Flexible weekly schedule",
      "Pause or skip anytime"
    ],
    featured: false
  },
  {
    id: "office-flow",
    name: "Office Flow",
    tag: "Most popular",
    forWho: "Offices, gyms & studios",
    weekly: { litres: "100 - 200L", freq: "2 deliveries / week", price: "Pricing TBC" },
    monthly: { litres: "400 - 800L", freq: "8 deliveries / month", price: "Pricing TBC" },
    features: [
      "20L refills & dispenser support",
      "Priority scheduled delivery",
      "Dedicated account contact",
      "Consolidated monthly invoice"
    ],
    featured: true
  },
  {
    id: "bulk-supply",
    name: "Bulk Supply",
    tag: "Commercial",
    forWho: "Businesses & events",
    weekly: { litres: "300L+", freq: "Custom schedule", price: "Custom Quote" },
    monthly: { litres: "1200L+", freq: "Custom schedule", price: "Custom Quote" },
    features: [
      "High-volume scheduled supply",
      "Bulk refill cost savings",
      "Event & seasonal scaling",
      "Custom logistics planning"
    ],
    featured: false
  }
];

/* Expose on window so the other modules can read them.
   (top-level `const` is NOT attached to window automatically) */
window.AQUATEL_CONFIG = AQUATEL_CONFIG;
window.aquatelProducts = aquatelProducts;
window.waterQualityDemo = waterQualityDemo;
window.aquatelPlans = aquatelPlans;
