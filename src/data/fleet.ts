export interface Aircraft {
  id: string;
  name: string;
  manufacturer: string;
  category: "light" | "midsize" | "super-midsize" | "large" | "ultra-long-range";
  categoryLabel: string;
  tagline: string;
  description: string;
  passengers: number;
  passengersLabel: string;
  range: number; // nautical miles
  rangeLabel: string;
  cabinHeight: string;
  cabinWidth: string;
  baggageVolume: string;
  cruiseSpeed: string;
  engines: string;
  yearIntroduced: number;
  // Pricing (illustrative GBP)
  pricePerHour: number;
  illustrativeTrip: {
    route: string;
    price: number;
    duration: string;
  };
  // Images (Unsplash)
  imageExterior: string;
  imageInterior: string;
  imageGallery: string[];
  // Features
  amenities: string[];
  highlights: string[];
  // Journey type recommendation
  idealFor: string;
  travelType: string;
}

export const fleetData: Aircraft[] = [
  {
    id: "citation-cj3-plus",
    name: "Citation CJ3+",
    manufacturer: "Cessna",
    category: "light",
    categoryLabel: "Light Jet",
    tagline: "Agile, efficient and ready for your next meeting.",
    description:
      "The Citation CJ3+ combines impressive range with exceptional efficiency. Perfect for regional European hops, it delivers a quiet cabin, club seating, and all the essentials for a productive flight.",
    passengers: 6,
    passengersLabel: "6–7 guests",
    range: 2040,
    rangeLabel: "2,040 nm",
    cabinHeight: "1.45 m",
    cabinWidth: "1.48 m",
    baggageVolume: "59 cu ft",
    cruiseSpeed: "416 ktas",
    engines: "Williams FJ44-3B (×2)",
    yearIntroduced: 2014,
    pricePerHour: 3200,
    illustrativeTrip: {
      route: "London → Paris",
      price: 8500,
      duration: "1h 15m",
    },
    imageExterior:
      "/images/fleet/citation-cj3-plus/exterior.jpg",
    imageInterior:
      "/images/fleet/citation-cj3-plus/interior.jpg",
    imageGallery: [
      "/images/fleet/citation-cj3-plus/gallery-1.jpg",
      "/images/fleet/citation-cj3-plus/gallery-2.jpg",
      "/images/fleet/citation-cj3-plus/gallery-3.jpg",
    ],
    amenities: [
      "Club seating for 6",
      "Refreshment centre",
      "Baggage compartment",
      "Digital avionics",
      "Quiet cabin",
    ],
    highlights: [
      "Lowest operating cost in class",
      "Access to smaller regional airports",
      "2-hour pre-flight preparation",
    ],
    idealFor: "Short European hops, business meetings",
    travelType: "Regional travel",
  },
  {
    id: "phenom-300e",
    name: "Phenom 300E",
    manufacturer: "Embraer",
    category: "light",
    categoryLabel: "Light Jet",
    tagline: "The world's most delivered light jet, refined.",
    description:
      "The best-selling light jet in the world for a reason. The Phenom 300E offers a wide, flat-floor cabin, exceptional range for its class, and the kind of quiet that lets you arrive refreshed.",
    passengers: 8,
    passengersLabel: "6–8 guests",
    range: 2010,
    rangeLabel: "2,010 nm",
    cabinHeight: "1.52 m",
    cabinWidth: "1.55 m",
    baggageVolume: "84 cu ft",
    cruiseSpeed: "453 ktas",
    engines: "Pratt & Whitney PW535E1 (×2)",
    yearIntroduced: 2017,
    pricePerHour: 3500,
    illustrativeTrip: {
      route: "London → Geneva",
      price: 10500,
      duration: "1h 40m",
    },
    imageExterior:
      "/images/fleet/phenom-300e/exterior.jpg",
    imageInterior:
      "/images/fleet/phenom-300e/interior.jpg",
    imageGallery: [
      "/images/fleet/phenom-300e/gallery-1.jpg",
      "/images/fleet/phenom-300e/gallery-2.jpg",
      "/images/fleet/phenom-300e/gallery-3.jpg",
    ],
    amenities: [
      "Flat-floor cabin",
      "Refreshment centre",
      "Wi-Fi connectivity",
      "Leather seating",
      "Large windows",
    ],
    highlights: [
      "World's most delivered light jet",
      "Wider cabin than competitors",
      "Transcontinental capability",
    ],
    idealFor: "European business travel, weekend escapes",
    travelType: "Regional to continental",
  },
  {
    id: "learjet-75-liberty",
    name: "Learjet 75 Liberty",
    manufacturer: "Bombardier",
    category: "midsize",
    categoryLabel: "Midsize Jet",
    tagline: "Iconic performance. Thoughtfully refined.",
    description:
      "The Learjet 75 Liberty carries the legacy of aviation's most famous name into a modern era. A spacious cabin, stand-up headroom, and impressive range deliver a confident flying experience.",
    passengers: 8,
    passengersLabel: "7–8 guests",
    range: 2080,
    rangeLabel: "2,080 nm",
    cabinHeight: "1.52 m",
    cabinWidth: "1.55 m",
    baggageVolume: "45 cu ft",
    cruiseSpeed: "465 ktas",
    engines: "Honeywell TFE731-40BR (×2)",
    yearIntroduced: 2019,
    pricePerHour: 4200,
    illustrativeTrip: {
      route: "London → Nice",
      price: 14200,
      duration: "2h 00m",
    },
    imageExterior:
      "/images/fleet/learjet-75-liberty/exterior.jpg",
    imageInterior:
      "/images/fleet/learjet-75-liberty/interior.jpg",
    imageGallery: [
      "/images/fleet/learjet-75-liberty/gallery-1.jpg",
      "/images/fleet/learjet-75-liberty/gallery-2.jpg",
      "/images/fleet/learjet-75-liberty/gallery-3.jpg",
    ],
    amenities: [
      "Stand-up cabin",
      "Club seating",
      "Full refreshment service",
      "Entertainment system",
      "Enclosed lavatory",
    ],
    highlights: [
      "Iconic Learjet heritage",
      "Club-to-club seating configuration",
      "Dual-zone cabin",
    ],
    idealFor: "Mid-range European routes, small group travel",
    travelType: "Continental travel",
  },
  {
    id: "praetor-600",
    name: "Praetor 600",
    manufacturer: "Embraer",
    category: "super-midsize",
    categoryLabel: "Super-Midsize Jet",
    tagline: "More room to work, relax and travel together.",
    description:
      "The Praetor 600 sets a new standard in super-midsize aviation. A quiet cabin with generous living space, transcontinental range, and a refined onboard experience make every journey purposeful.",
    passengers: 9,
    passengersLabel: "8–9 guests",
    range: 4018,
    rangeLabel: "4,018 nm",
    cabinHeight: "1.83 m",
    cabinWidth: "2.1 m",
    baggageVolume: "114 cu ft",
    cruiseSpeed: "466 ktas",
    engines: "Honeywell HTF7500E (×2)",
    yearIntroduced: 2020,
    pricePerHour: 5800,
    illustrativeTrip: {
      route: "London → Nice",
      price: 20500,
      duration: "2h 00m",
    },
    imageExterior:
      "/images/fleet/praetor-600/exterior.jpg",
    imageInterior:
      "/images/fleet/praetor-600/interior.jpg",
    imageGallery: [
      "/images/fleet/praetor-600/gallery-1.jpg",
      "/images/fleet/praetor-600/gallery-2.jpg",
      "/images/fleet/praetor-600/gallery-3.jpg",
    ],
    amenities: [
      "Stand-up cabin (1.83m)",
      "Wi-Fi connectivity",
      "Refreshments included",
      "Spacious club seating",
      "Enclosed lavatory",
      "Power at every seat",
    ],
    highlights: [
      "Our most popular choice",
      "Transatlantic capable",
      "Quietest cabin in class",
    ],
    idealFor: "Transatlantic routes, group corporate travel",
    travelType: "Continental to transatlantic",
  },
  {
    id: "challenger-350",
    name: "Challenger 350",
    manufacturer: "Bombardier",
    category: "super-midsize",
    categoryLabel: "Super-Midsize Jet",
    tagline: "Space, range and a cabin built for real comfort.",
    description:
      "The Challenger 350 offers a wide-body experience in a super-midsize package. Industry-leading cabin width, a flat floor, and remarkable range make this the preferred choice for discerning travellers.",
    passengers: 10,
    passengersLabel: "8–10 guests",
    range: 3200,
    rangeLabel: "3,200 nm",
    cabinHeight: "1.83 m",
    cabinWidth: "2.41 m",
    baggageVolume: "106 cu ft",
    cruiseSpeed: "470 ktas",
    engines: "Honeywell HTF7350 (×2)",
    yearIntroduced: 2014,
    pricePerHour: 6200,
    illustrativeTrip: {
      route: "London → Dubai",
      price: 38000,
      duration: "6h 30m",
    },
    imageExterior:
      "/images/fleet/challenger-350/exterior.jpg",
    imageInterior:
      "/images/fleet/challenger-350/interior.jpg",
    imageGallery: [
      "/images/fleet/challenger-350/gallery-1.jpg",
      "/images/fleet/challenger-350/gallery-2.jpg",
      "/images/fleet/challenger-350/gallery-3.jpg",
    ],
    amenities: [
      "Wide-body cabin",
      "Flat-floor layout",
      "Full galley",
      "Advanced entertainment",
      "Enclosed lavatory",
      "Satellite Wi-Fi",
    ],
    highlights: [
      "Widest cabin in class",
      "Middle East & Africa range",
      "Ideal for small group travel",
    ],
    idealFor: "Middle East routes, extended business trips",
    travelType: "Long-range continental",
  },
  {
    id: "gulfstream-g550",
    name: "Gulfstream G550",
    manufacturer: "Gulfstream",
    category: "large",
    categoryLabel: "Large Jet",
    tagline: "Exceptional space for a world of possibility.",
    description:
      "The Gulfstream G550 defines long-range luxury. A full stand-up cabin, private sleeping area, and extraordinary range allow you to travel from London to Asia without compromise.",
    passengers: 16,
    passengersLabel: "14–16 guests",
    range: 6750,
    rangeLabel: "6,750 nm",
    cabinHeight: "1.88 m",
    cabinWidth: "2.24 m",
    baggageVolume: "226 cu ft",
    cruiseSpeed: "488 ktas",
    engines: "Rolls-Royce BR710 C4-11 (×2)",
    yearIntroduced: 2003,
    pricePerHour: 8500,
    illustrativeTrip: {
      route: "London → Hong Kong",
      price: 95000,
      duration: "12h 00m",
    },
    imageExterior:
      "/images/fleet/gulfstream-g550/exterior.jpg",
    imageInterior:
      "/images/fleet/gulfstream-g550/interior.jpg",
    imageGallery: [
      "/images/fleet/gulfstream-g550/gallery-1.jpg",
      "/images/fleet/gulfstream-g550/gallery-2.jpg",
      "/images/fleet/gulfstream-g550/gallery-3.jpg",
    ],
    amenities: [
      "Full stand-up cabin",
      "Private sleeping quarters",
      "Full galley & dining",
      "Satellite Wi-Fi & entertainment",
      "Private lavatory with shower",
      "Conference area",
    ],
    highlights: [
      "Nonstop London to Asia",
      "Multiple cabin zones",
      "Seat-to-bed conversion",
    ],
    idealFor: "Intercontinental travel, large group & family",
    travelType: "Intercontinental",
  },
  {
    id: "gulfstream-g650er",
    name: "Gulfstream G650ER",
    manufacturer: "Gulfstream",
    category: "ultra-long-range",
    categoryLabel: "Ultra-Long-Range Jet",
    tagline: "Exceptional space for a world without limits.",
    description:
      "The G650ER represents the pinnacle of private aviation. The longest-range business jet available, with a cabin that rivals the finest hotel suite — and a view that surpasses them all.",
    passengers: 18,
    passengersLabel: "12–18 guests",
    range: 7500,
    rangeLabel: "7,500 nm",
    cabinHeight: "1.96 m",
    cabinWidth: "2.49 m",
    baggageVolume: "195 cu ft",
    cruiseSpeed: "516 ktas",
    engines: "Rolls-Royce BR725 A1-12 (×2)",
    yearIntroduced: 2012,
    pricePerHour: 10500,
    illustrativeTrip: {
      route: "London → New York",
      price: 79000,
      duration: "7h 30m",
    },
    imageExterior:
      "/images/fleet/gulfstream-g650er/exterior.jpg",
    imageInterior:
      "/images/fleet/gulfstream-g650er/interior.jpg",
    imageGallery: [
      "/images/fleet/gulfstream-g650er/gallery-1.jpg",
      "/images/fleet/gulfstream-g650er/gallery-2.jpg",
      "/images/fleet/gulfstream-g650er/gallery-3.jpg",
    ],
    amenities: [
      "Largest windows in class",
      "Multiple cabin zones",
      "Private stateroom",
      "Full galley with chef",
      "Satellite Wi-Fi",
      "Entertainment suite",
      "Enclosed lavatory with shower",
    ],
    highlights: [
      "Longest range available",
      "Mach 0.925 cruise speed",
      "Award-winning cabin design",
    ],
    idealFor: "Global travel, ultimate luxury, VIP groups",
    travelType: "Global / Intercontinental",
  },
  {
    id: "global-7500",
    name: "Global 7500",
    manufacturer: "Bombardier",
    category: "ultra-long-range",
    categoryLabel: "Ultra-Long-Range Jet",
    tagline: "Four true living spaces. One remarkable journey.",
    description:
      "The Bombardier Global 7500 redefines what it means to travel. Four distinct living spaces — including a private stateroom and a dedicated crew rest area — make every journey a destination in itself.",
    passengers: 19,
    passengersLabel: "14–19 guests",
    range: 7700,
    rangeLabel: "7,700 nm",
    cabinHeight: "1.88 m",
    cabinWidth: "2.44 m",
    baggageVolume: "195 cu ft",
    cruiseSpeed: "516 ktas",
    engines: "GE Passport (×2)",
    yearIntroduced: 2018,
    pricePerHour: 12000,
    illustrativeTrip: {
      route: "London → Los Angeles",
      price: 120000,
      duration: "10h 30m",
    },
    imageExterior:
      "/images/fleet/global-7500/exterior.jpg",
    imageInterior:
      "/images/fleet/global-7500/interior.jpg",
    imageGallery: [
      "/images/fleet/global-7500/gallery-1.jpg",
      "/images/fleet/global-7500/gallery-2.jpg",
      "/images/fleet/global-7500/gallery-3.jpg",
    ],
    amenities: [
      "Four living spaces",
      "Private stateroom with full bed",
      "Dedicated galley suite",
      "Crew rest area",
      "Satellite Wi-Fi",
      "Full entertainment system",
      "Shower & dual lavatories",
    ],
    highlights: [
      "Longest production aircraft",
      "London to Los Angeles nonstop",
      "Four distinct zones",
    ],
    idealFor: "Ultra-long-haul, VIP transport, heads of state",
    travelType: "Global — any distance",
  },
];

export const fleetCategories = [
  { id: "all", label: "All aircraft" },
  { id: "light", label: "Light jet" },
  { id: "midsize", label: "Midsize jet" },
  { id: "super-midsize", label: "Super-midsize jet" },
  { id: "large", label: "Large jet" },
  { id: "ultra-long-range", label: "Ultra-long-range" },
] as const;
