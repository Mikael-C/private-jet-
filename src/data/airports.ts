export interface FBOInfo {
  name: string;
  phone: string;
  email: string;
  handler?: string;
  frequency?: string;
  address?: string;
}

export interface Airport {
  id: string;
  name: string;
  city: string;
  country: string;
  iata: string;
  icao: string;
  type: "fbo" | "dedicated" | "airstrip" | "altiport" | "international";
  typeLabel: string;
  popular?: boolean;
  region: "europe" | "north-america" | "middle-east" | "asia-pacific" | "caribbean" | "africa" | "latin-america";
  keywords?: string[];
  fbo?: FBOInfo;
}

export const airportsData: Airport[] = [
  // --- UNITED KINGDOM & IRELAND ---
  {
    id: "london-farnborough",
    name: "Farnborough Airport",
    city: "London",
    country: "United Kingdom",
    iata: "FAB",
    icao: "EGLF",
    type: "dedicated",
    typeLabel: "Dedicated Private Jet Airport",
    popular: true,
    region: "europe",
    keywords: ["farnborough", "london", "dedicated", "hampshire", "uk", "england"]
  },
  {
    id: "london-biggin-hill",
    name: "London Biggin Hill Airport",
    city: "London",
    country: "United Kingdom",
    iata: "BQH",
    icao: "EGKB",
    type: "dedicated",
    typeLabel: "Dedicated Business Airport",
    popular: true,
    region: "europe",
    keywords: ["biggin", "hill", "london", "kent"]
  },
  {
    id: "london-luton",
    name: "London Luton Airport (Signature / Harrods FBO)",
    city: "London",
    country: "United Kingdom",
    iata: "LTN",
    icao: "EGGW",
    type: "fbo",
    typeLabel: "Executive FBO Hub",
    popular: true,
    region: "europe",
    keywords: ["luton", "harrods", "signature", "bedfordshire"]
  },
  {
    id: "london-stansted",
    name: "London Stansted Airport (Harrods / Fayair)",
    city: "London",
    country: "United Kingdom",
    iata: "STN",
    icao: "EGSS",
    type: "fbo",
    typeLabel: "Private Aviation Terminal",
    popular: false,
    region: "europe",
    keywords: ["stansted", "harrods", "essex"]
  },
  {
    id: "london-oxford",
    name: "London Oxford Airport",
    city: "Oxford / London",
    country: "United Kingdom",
    iata: "OXF",
    icao: "EGTK",
    type: "dedicated",
    typeLabel: "Executive Aviation Terminal",
    popular: false,
    region: "europe",
    keywords: ["oxford", "kidlington", "cotswolds"]
  },
  {
    id: "london-city",
    name: "London City Jet Centre",
    city: "London",
    country: "United Kingdom",
    iata: "LCY",
    icao: "EGLC",
    type: "fbo",
    typeLabel: "City Private Jet Centre",
    popular: true,
    region: "europe",
    keywords: ["city", "docklands", "canary wharf", "london"]
  },
  {
    id: "london-heathrow",
    name: "London Heathrow VIP Windsor Suite",
    city: "London",
    country: "United Kingdom",
    iata: "LHR",
    icao: "EGLL",
    type: "fbo",
    typeLabel: "VIP Terminal & Head of State",
    popular: false,
    region: "europe",
    keywords: ["heathrow", "windsor", "vip"]
  },
  {
    id: "london-gatwick",
    name: "London Gatwick Signature Terminal",
    city: "London",
    country: "United Kingdom",
    iata: "LGW",
    icao: "EGKK",
    type: "fbo",
    typeLabel: "Signature Flight Support",
    popular: false,
    region: "europe",
    keywords: ["gatwick", "surrey", "sussex"]
  },
  {
    id: "london-northolt",
    name: "RAF Northolt",
    city: "London",
    country: "United Kingdom",
    iata: "NHT",
    icao: "EGWU",
    type: "dedicated",
    typeLabel: "VIP & Diplomatic Aerodrome",
    popular: false,
    region: "europe",
    keywords: ["northolt", "raf", "west london"]
  },
  {
    id: "manchester",
    name: "Manchester Airport (Signature Aviation)",
    city: "Manchester",
    country: "United Kingdom",
    iata: "MAN",
    icao: "EGCC",
    type: "fbo",
    typeLabel: "Private Executive Terminal",
    popular: false,
    region: "europe",
    keywords: ["manchester", "north west"]
  },
  {
    id: "birmingham",
    name: "Birmingham Airport (XLR Executive)",
    city: "Birmingham",
    country: "United Kingdom",
    iata: "BHX",
    icao: "EGBB",
    type: "fbo",
    typeLabel: "Executive Jet Terminal",
    popular: false,
    region: "europe",
    keywords: ["birmingham", "midlands"]
  },
  {
    id: "edinburgh",
    name: "Edinburgh Airport (Signature Flight Support)",
    city: "Edinburgh",
    country: "United Kingdom",
    iata: "EDI",
    icao: "EGPH",
    type: "fbo",
    typeLabel: "Scotland Executive Terminal",
    popular: true,
    region: "europe",
    keywords: ["edinburgh", "scotland"]
  },
  {
    id: "glasgow",
    name: "Glasgow Airport (Signature Aviation)",
    city: "Glasgow",
    country: "United Kingdom",
    iata: "GLA",
    icao: "EGPF",
    type: "fbo",
    typeLabel: "Executive FBO",
    popular: false,
    region: "europe",
    keywords: ["glasgow", "scotland"]
  },
  {
    id: "dublin",
    name: "Dublin Airport (Platinum Services VIP)",
    city: "Dublin",
    country: "Ireland",
    iata: "DUB",
    icao: "EIDW",
    type: "fbo",
    typeLabel: "Platinum VIP Terminal",
    popular: true,
    region: "europe",
    keywords: ["dublin", "ireland", "platinum"]
  },
  {
    id: "jersey",
    name: "Jersey Airport",
    city: "Saint Peter",
    country: "Jersey",
    iata: "JER",
    icao: "EGJJ",
    type: "fbo",
    typeLabel: "Channel Islands Executive",
    popular: false,
    region: "europe",
    keywords: ["jersey", "channel islands"]
  },
  {
    id: "guernsey",
    name: "Guernsey Airport",
    city: "Forest",
    country: "Guernsey",
    iata: "GCI",
    icao: "EGJB",
    type: "fbo",
    typeLabel: "Channel Islands Executive",
    popular: false,
    region: "europe",
    keywords: ["guernsey", "channel islands"]
  },
  {
    id: "gibraltar",
    name: "Gibraltar International Airport",
    city: "Gibraltar",
    country: "Gibraltar",
    iata: "GIB",
    icao: "LXGB",
    type: "fbo",
    typeLabel: "Executive Aviation Terminal",
    popular: false,
    region: "europe",
    keywords: ["gibraltar", "the rock"]
  },

  // --- FRANCE & MONACO ---
  {
    id: "paris-le-bourget",
    name: "Paris Le Bourget Airport",
    city: "Paris",
    country: "France",
    iata: "LBG",
    icao: "LFPB",
    type: "dedicated",
    typeLabel: "Europe's #1 Dedicated Business Airport",
    popular: true,
    region: "europe",
    keywords: ["paris", "le bourget", "bourget", "france"]
  },
  {
    id: "paris-cdg",
    name: "Paris Charles de Gaulle (Salon 200)",
    city: "Paris",
    country: "France",
    iata: "CDG",
    icao: "LFPG",
    type: "fbo",
    typeLabel: "VIP Presidential Terminal",
    popular: false,
    region: "europe",
    keywords: ["paris", "charles de gaulle", "roissy"]
  },
  {
    id: "nice-cote-dazur",
    name: "Nice Côte d'Azur Private Aviation Terminal",
    city: "Nice / Monaco",
    country: "France",
    iata: "NCE",
    icao: "LFMN",
    type: "fbo",
    typeLabel: "Riviera & Monaco VIP Gateway",
    popular: true,
    region: "europe",
    keywords: ["nice", "monaco", "cote d'azur", "french riviera", "cannes", "monte carlo"]
  },
  {
    id: "cannes-mandelieu",
    name: "Cannes Mandelieu Airport",
    city: "Cannes",
    country: "France",
    iata: "CEQ",
    icao: "LFMD",
    type: "dedicated",
    typeLabel: "Dedicated Business Aviation",
    popular: true,
    region: "europe",
    keywords: ["cannes", "mandelieu", "film festival", "riviera"]
  },
  {
    id: "saint-tropez",
    name: "La Môle - Saint-Tropez Airport",
    city: "Saint-Tropez",
    country: "France",
    iata: "LTT",
    icao: "LFTZ",
    type: "airstrip",
    typeLabel: "Luxury Riviera Executive Airstrip",
    popular: true,
    region: "europe",
    keywords: ["st tropez", "saint tropez", "la mole", "ramatuelle"]
  },
  {
    id: "courchevel-altiport",
    name: "Courchevel Altiport",
    city: "Courchevel",
    country: "France",
    iata: "CVF",
    icao: "LFLJ",
    type: "altiport",
    typeLabel: "High-Altitude Alpine Altiport",
    popular: true,
    region: "europe",
    keywords: ["courchevel", "altiport", "alps", "ski", "les trois vallees"]
  },
  {
    id: "chambery",
    name: "Chambéry Savoie Mont Blanc",
    city: "Chambéry",
    country: "France",
    iata: "CMF",
    icao: "LFLB",
    type: "fbo",
    typeLabel: "Alpine Ski Gateway",
    popular: false,
    region: "europe",
    keywords: ["chambery", "alps", "ski", "val d'isere"]
  },
  {
    id: "lyon-bron",
    name: "Lyon-Bron Airport",
    city: "Lyon",
    country: "France",
    iata: "LYN",
    icao: "LFLY",
    type: "dedicated",
    typeLabel: "Dedicated Business Aviation",
    popular: false,
    region: "europe",
    keywords: ["lyon", "bron", "rhone"]
  },
  {
    id: "bordeaux",
    name: "Bordeaux-Mérignac Executive",
    city: "Bordeaux",
    country: "France",
    iata: "BOD",
    icao: "LFBD",
    type: "fbo",
    typeLabel: "Executive Aviation Terminal",
    popular: false,
    region: "europe",
    keywords: ["bordeaux", "wine", "merignac"]
  },
  {
    id: "biarritz",
    name: "Biarritz Pays Basque Airport",
    city: "Biarritz",
    country: "France",
    iata: "BIQ",
    icao: "LFBZ",
    type: "fbo",
    typeLabel: "Basque Coast Executive",
    popular: false,
    region: "europe",
    keywords: ["biarritz", "basque"]
  },

  // --- SWITZERLAND & AUSTRIA ---
  {
    id: "geneva-cointrin",
    name: "Geneva Cointrin Executive Terminal",
    city: "Geneva",
    country: "Switzerland",
    iata: "GVA",
    icao: "LSGG",
    type: "fbo",
    typeLabel: "Swiss Premier Private Jet Hub",
    popular: true,
    region: "europe",
    keywords: ["geneva", "geneve", "gva", "cointrin", "switzerland"]
  },
  {
    id: "zurich",
    name: "Zurich Airport (Cat Aviation / Jet Aviation)",
    city: "Zurich",
    country: "Switzerland",
    iata: "ZRH",
    icao: "LSZH",
    type: "fbo",
    typeLabel: "General Aviation Center",
    popular: true,
    region: "europe",
    keywords: ["zurich", "zuerich", "switzerland"]
  },
  {
    id: "samedan-st-moritz",
    name: "Samedan Airport (Engadin St. Moritz)",
    city: "St. Moritz",
    country: "Switzerland",
    iata: "SMV",
    icao: "LSZS",
    type: "altiport",
    typeLabel: "Europe's Highest Executive Airstrip (1,707m)",
    popular: true,
    region: "europe",
    keywords: ["samedan", "st moritz", "saint moritz", "engadin", "alps", "ski"]
  },
  {
    id: "sion",
    name: "Sion Airport",
    city: "Sion",
    country: "Switzerland",
    iata: "SIR",
    icao: "LSGS",
    type: "fbo",
    typeLabel: "Gateway to Zermatt & Verbier",
    popular: true,
    region: "europe",
    keywords: ["sion", "zermatt", "verbier", "valais", "ski"]
  },
  {
    id: "saanen-gstaad",
    name: "Saanen Airport (Gstaad Airport)",
    city: "Gstaad",
    country: "Switzerland",
    iata: "GTC",
    icao: "LSGK",
    type: "airstrip",
    typeLabel: "Exclusive Gstaad Executive Airstrip",
    popular: true,
    region: "europe",
    keywords: ["gstaad", "saanen", "berner oberland", "ski"]
  },
  {
    id: "bern-belp",
    name: "Bern Airport",
    city: "Bern",
    country: "Switzerland",
    iata: "BRN",
    icao: "LSZB",
    type: "fbo",
    typeLabel: "Capital Executive Terminal",
    popular: false,
    region: "europe",
    keywords: ["bern", "belp"]
  },
  {
    id: "basel",
    name: "EuroAirport Basel-Mulhouse-Freiburg",
    city: "Basel",
    country: "Switzerland",
    iata: "BSL",
    icao: "LFSB",
    type: "fbo",
    typeLabel: "Air Basel Business Aviation",
    popular: false,
    region: "europe",
    keywords: ["basel", "mulhouse"]
  },
  {
    id: "lugano",
    name: "Lugano Airport",
    city: "Lugano",
    country: "Switzerland",
    iata: "LUG",
    icao: "LSZA",
    type: "fbo",
    typeLabel: "Ticino Executive Terminal",
    popular: false,
    region: "europe",
    keywords: ["lugano", "lake como", "ticino"]
  },
  {
    id: "vienna",
    name: "Vienna International VIP Terminal",
    city: "Vienna",
    country: "Austria",
    iata: "VIE",
    icao: "LOWW",
    type: "fbo",
    typeLabel: "Vienna General Aviation Center",
    popular: true,
    region: "europe",
    keywords: ["vienna", "wien", "austria"]
  },
  {
    id: "salzburg",
    name: "Salzburg W.A. Mozart Executive",
    city: "Salzburg",
    country: "Austria",
    iata: "SZG",
    icao: "LOWS",
    type: "fbo",
    typeLabel: "Alpine VIP Gateway",
    popular: false,
    region: "europe",
    keywords: ["salzburg", "mozart", "kitzbuhel"]
  },
  {
    id: "innsbruck",
    name: "Innsbruck Kranebitten Airport",
    city: "Innsbruck",
    country: "Austria",
    iata: "INN",
    icao: "LOWI",
    type: "fbo",
    typeLabel: "Tyrol Alpine Terminal",
    popular: true,
    region: "europe",
    keywords: ["innsbruck", "tyrol", "kitzbuhel", "arlberg", "st anton"]
  },

  // --- ITALY ---
  {
    id: "milan-linate-prime",
    name: "Milan Linate Prime",
    city: "Milan",
    country: "Italy",
    iata: "LIN",
    icao: "LIML",
    type: "dedicated",
    typeLabel: "Premier Italian Business Hub",
    popular: true,
    region: "europe",
    keywords: ["milan", "milano", "linate", "prime", "fashion", "italy"]
  },
  {
    id: "milan-malpensa-prime",
    name: "Milan Malpensa Prime",
    city: "Milan",
    country: "Italy",
    iata: "MXP",
    icao: "LIMC",
    type: "fbo",
    typeLabel: "Intercontinental VIP Terminal",
    popular: false,
    region: "europe",
    keywords: ["malpensa", "milan"]
  },
  {
    id: "rome-ciampino",
    name: "Rome Ciampino Private Jet Terminal",
    city: "Rome",
    country: "Italy",
    iata: "CIA",
    icao: "LIRA",
    type: "dedicated",
    typeLabel: "Dedicated Rome VIP Terminal",
    popular: true,
    region: "europe",
    keywords: ["rome", "roma", "ciampino"]
  },
  {
    id: "olbia-costa-smeralda",
    name: "Olbia Costa Smeralda Executive",
    city: "Olbia",
    country: "Italy",
    iata: "OLB",
    icao: "LIEO",
    type: "fbo",
    typeLabel: "Sardinia Luxury Summer Hub",
    popular: true,
    region: "europe",
    keywords: ["olbia", "sardinia", "costa smeralda", "porto cervo"]
  },
  {
    id: "venice",
    name: "Venice Marco Polo General Aviation",
    city: "Venice",
    country: "Italy",
    iata: "VCE",
    icao: "LIPZ",
    type: "fbo",
    typeLabel: "Venice VIP Terminal",
    popular: true,
    region: "europe",
    keywords: ["venice", "venezia", "lido"]
  },
  {
    id: "florence",
    name: "Florence Peretola Executive",
    city: "Florence",
    country: "Italy",
    iata: "FLR",
    icao: "LIRQ",
    type: "fbo",
    typeLabel: "Tuscany Executive Gateway",
    popular: false,
    region: "europe",
    keywords: ["florence", "firenze", "tuscany"]
  },
  {
    id: "naples",
    name: "Naples International General Aviation",
    city: "Naples",
    country: "Italy",
    iata: "NAP",
    icao: "LIRN",
    type: "fbo",
    typeLabel: "Amalfi Coast & Capri Gateway",
    popular: false,
    region: "europe",
    keywords: ["naples", "napoli", "amalfi", "capri", "sorrento"]
  },

  // --- SPAIN & PORTUGAL ---
  {
    id: "ibiza",
    name: "Ibiza Airport Executive Terminal",
    city: "Ibiza",
    country: "Spain",
    iata: "IBZ",
    icao: "LEIB",
    type: "fbo",
    typeLabel: "Balearic VIP Aviation Hub",
    popular: true,
    region: "europe",
    keywords: ["ibiza", "eivissa", "formentera", "balearics", "spain"]
  },
  {
    id: "palma-de-mallorca",
    name: "Palma de Mallorca General Aviation",
    city: "Palma de Mallorca",
    country: "Spain",
    iata: "PMI",
    icao: "LEPA",
    type: "fbo",
    typeLabel: "Mallorca VIP Terminal",
    popular: true,
    region: "europe",
    keywords: ["palma", "mallorca", "majorca", "balearics"]
  },
  {
    id: "madrid-torrejon",
    name: "Madrid Torrejón Airport",
    city: "Madrid",
    country: "Spain",
    iata: "TOJ",
    icao: "LETO",
    type: "dedicated",
    typeLabel: "Dedicated Executive Airport",
    popular: true,
    region: "europe",
    keywords: ["madrid", "torrejon", "spain"]
  },
  {
    id: "barcelona-el-prat",
    name: "Barcelona El Prat Corporate Aviation",
    city: "Barcelona",
    country: "Spain",
    iata: "BCN",
    icao: "LEBL",
    type: "fbo",
    typeLabel: "Corporate Aviation Terminal",
    popular: true,
    region: "europe",
    keywords: ["barcelona", "catalonia", "el prat"]
  },
  {
    id: "malaga",
    name: "Malaga-Costa del Sol Executive",
    city: "Malaga / Marbella",
    country: "Spain",
    iata: "AGP",
    icao: "LEMG",
    type: "fbo",
    typeLabel: "Marbella & Costa del Sol VIP",
    popular: true,
    region: "europe",
    keywords: ["malaga", "marbella", "puerto banus", "costa del sol"]
  },
  {
    id: "lisbon-cascais",
    name: "Cascais Municipal Aerodrome",
    city: "Lisbon / Cascais",
    country: "Portugal",
    iata: "CAT",
    icao: "LPCS",
    type: "dedicated",
    typeLabel: "Dedicated Cascais/Sintra Private Hub",
    popular: true,
    region: "europe",
    keywords: ["cascais", "lisbon", "estoril", "sintra", "portugal"]
  },
  {
    id: "lisbon-humberto-delgado",
    name: "Lisbon Airport (Safeport Executive)",
    city: "Lisbon",
    country: "Portugal",
    iata: "LIS",
    icao: "LPPT",
    type: "fbo",
    typeLabel: "Safeport VIP Terminal",
    popular: false,
    region: "europe",
    keywords: ["lisbon", "portela"]
  },
  {
    id: "faro",
    name: "Faro International Executive Terminal",
    city: "Faro",
    country: "Portugal",
    iata: "FAO",
    icao: "LPFR",
    type: "fbo",
    typeLabel: "Algarve VIP Gateway",
    popular: true,
    region: "europe",
    keywords: ["faro", "algarve", "quinta do lago", "val do lobo"]
  },

  // --- GERMANY, BENELUX & SCANDINAVIA ---
  {
    id: "munich-oberpfaffenhofen",
    name: "Oberpfaffenhofen Special Airport",
    city: "Munich",
    country: "Germany",
    iata: "OBF",
    icao: "EDMO",
    type: "dedicated",
    typeLabel: "Dedicated Corporate & VIP Airport",
    popular: true,
    region: "europe",
    keywords: ["munich", "muenchen", "oberpfaffenhofen", "bavaria", "germany"]
  },
  {
    id: "munich-main",
    name: "Munich Airport General Aviation",
    city: "Munich",
    country: "Germany",
    iata: "MUC",
    icao: "EDDM",
    type: "fbo",
    typeLabel: "General Aviation Center",
    popular: false,
    region: "europe",
    keywords: ["munich", "franz josef strauss"]
  },
  {
    id: "frankfurt-egelsbach",
    name: "Frankfurt Egelsbach Airport",
    city: "Frankfurt",
    country: "Germany",
    iata: "QEF",
    icao: "EDFE",
    type: "dedicated",
    typeLabel: "Dedicated Business Aviation Reliever",
    popular: false,
    region: "europe",
    keywords: ["frankfurt", "egelsbach", "hessen"]
  },
  {
    id: "berlin-brandenburg",
    name: "Berlin Brandenburg GAC",
    city: "Berlin",
    country: "Germany",
    iata: "BER",
    icao: "EDDB",
    type: "fbo",
    typeLabel: "General Aviation Center",
    popular: true,
    region: "europe",
    keywords: ["berlin", "brandenburg"]
  },
  {
    id: "brussels",
    name: "Brussels Airport (ExecuJet / Abelag)",
    city: "Brussels",
    country: "Belgium",
    iata: "BRU",
    icao: "EBBR",
    type: "fbo",
    typeLabel: "Executive Aviation Terminal",
    popular: false,
    region: "europe",
    keywords: ["brussels", "bruxelles", "belgium"]
  },
  {
    id: "amsterdam-schiphol",
    name: "Amsterdam Schiphol-Oost (East)",
    city: "Amsterdam",
    country: "Netherlands",
    iata: "AMS",
    icao: "EHAM",
    type: "fbo",
    typeLabel: "Jet Aviation Private Hub",
    popular: true,
    region: "europe",
    keywords: ["amsterdam", "schiphol", "netherlands", "holland"]
  },
  {
    id: "copenhagen",
    name: "Copenhagen Kastrup VIP Terminal",
    city: "Copenhagen",
    country: "Denmark",
    iata: "CPH",
    icao: "EKCH",
    type: "fbo",
    typeLabel: "Nordic VIP Terminal",
    popular: false,
    region: "europe",
    keywords: ["copenhagen", "kobenhavn", "denmark"]
  },
  {
    id: "stockholm-bromma",
    name: "Stockholm Bromma Airport",
    city: "Stockholm",
    country: "Sweden",
    iata: "BMA",
    icao: "ESSB",
    type: "dedicated",
    typeLabel: "Stockholm City Business Airport",
    popular: false,
    region: "europe",
    keywords: ["stockholm", "bromma", "sweden"]
  },

  // --- GREECE, CYPRUS & TURKEY ---
  {
    id: "mykonos",
    name: "Mykonos Island National Airport VIP",
    city: "Mykonos",
    country: "Greece",
    iata: "JMK",
    icao: "LGMK",
    type: "fbo",
    typeLabel: "Aegean Luxury VIP Hub",
    popular: true,
    region: "europe",
    keywords: ["mykonos", "cyclades", "greece", "aegean"]
  },
  {
    id: "santorini",
    name: "Santorini (Thira) Airport VIP",
    city: "Santorini",
    country: "Greece",
    iata: "JTR",
    icao: "LGSR",
    type: "fbo",
    typeLabel: "Cyclades VIP Terminal",
    popular: true,
    region: "europe",
    keywords: ["santorini", "thira", "greece"]
  },
  {
    id: "athens",
    name: "Athens International General Aviation",
    city: "Athens",
    country: "Greece",
    iata: "ATH",
    icao: "LGAV",
    type: "fbo",
    typeLabel: "Aegean FBO Hub",
    popular: true,
    region: "europe",
    keywords: ["athens", "eleftherios venizelos", "greece"]
  },
  {
    id: "istanbul-ataturk",
    name: "Istanbul Atatürk General Aviation",
    city: "Istanbul",
    country: "Turkey",
    iata: "ISL",
    icao: "LTBA",
    type: "dedicated",
    typeLabel: "Dedicated General Aviation Hub",
    popular: true,
    region: "europe",
    keywords: ["istanbul", "ataturk", "turkey"]
  },
  {
    id: "bodrum",
    name: "Milas-Bodrum Airport Executive",
    city: "Bodrum",
    country: "Turkey",
    iata: "BJV",
    icao: "LTFE",
    type: "fbo",
    typeLabel: "Turkish Riviera VIP Terminal",
    popular: true,
    region: "europe",
    keywords: ["bodrum", "milas", "turkish riviera", "yalikavak"]
  },

  // --- NORTH AMERICA ---
  {
    id: "new-york-teterboro",
    name: "Teterboro Airport",
    city: "New York / Teterboro",
    country: "United States",
    iata: "TEB",
    icao: "KTEB",
    type: "dedicated",
    typeLabel: "World's Premier Dedicated Business Airport",
    popular: true,
    region: "north-america",
    keywords: ["teterboro", "new york", "nyc", "manhattan", "new jersey", "teb"]
  },
  {
    id: "new-york-westchester",
    name: "Westchester County Airport (White Plains)",
    city: "White Plains / New York",
    country: "United States",
    iata: "HPN",
    icao: "KHPN",
    type: "fbo",
    typeLabel: "New York Corporate Hub",
    popular: true,
    region: "north-america",
    keywords: ["westchester", "white plains", "new york", "connecticut"]
  },
  {
    id: "new-york-jfk",
    name: "John F. Kennedy International (Signature FBO)",
    city: "New York",
    country: "United States",
    iata: "JFK",
    icao: "KJFK",
    type: "fbo",
    typeLabel: "JFK Signature Private Terminal",
    popular: false,
    region: "north-america",
    keywords: ["jfk", "new york", "queens"]
  },
  {
    id: "east-hampton",
    name: "East Hampton Town Airport",
    city: "East Hampton",
    country: "United States",
    iata: "HTO",
    icao: "KJPX",
    type: "airstrip",
    typeLabel: "The Hamptons Executive Airstrip",
    popular: true,
    region: "north-america",
    keywords: ["hamptons", "east hampton", "long island", "new york", "hto", "jpx"]
  },
  {
    id: "los-angeles-van-nuys",
    name: "Van Nuys Airport",
    city: "Los Angeles",
    country: "United States",
    iata: "VNY",
    icao: "KVNY",
    type: "dedicated",
    typeLabel: "World's Busiest General Aviation Hub",
    popular: true,
    region: "north-america",
    keywords: ["van nuys", "los angeles", "la", "california", "hollywood", "vny"]
  },
  {
    id: "los-angeles-santa-monica",
    name: "Santa Monica Airport",
    city: "Santa Monica / Los Angeles",
    country: "United States",
    iata: "SMO",
    icao: "KSMO",
    type: "dedicated",
    typeLabel: "Westside LA Executive Airport",
    popular: false,
    region: "north-america",
    keywords: ["santa monica", "beverly hills", "los angeles"]
  },
  {
    id: "los-angeles-lax",
    name: "Los Angeles International (The Private Suite)",
    city: "Los Angeles",
    country: "United States",
    iata: "LAX",
    icao: "KLAX",
    type: "fbo",
    typeLabel: "The Private Suite at LAX",
    popular: false,
    region: "north-america",
    keywords: ["lax", "los angeles"]
  },
  {
    id: "miami-opa-locka",
    name: "Miami Opa-locka Executive Airport",
    city: "Miami",
    country: "United States",
    iata: "OPF",
    icao: "KOPF",
    type: "dedicated",
    typeLabel: "Premier South Florida Private Aviation Hub",
    popular: true,
    region: "north-america",
    keywords: ["miami", "opa locka", "florida", "south beach", "opf"]
  },
  {
    id: "palm-beach",
    name: "Palm Beach International (Signature / Jet Aviation)",
    city: "West Palm Beach",
    country: "United States",
    iata: "PBI",
    icao: "KPBI",
    type: "fbo",
    typeLabel: "Palm Beach VIP Hub",
    popular: true,
    region: "north-america",
    keywords: ["palm beach", "west palm", "florida", "pbi"]
  },
  {
    id: "naples-florida",
    name: "Naples Municipal Airport",
    city: "Naples",
    country: "United States",
    iata: "APF",
    icao: "KAPF",
    type: "dedicated",
    typeLabel: "Gulf Coast Luxury Private Hub",
    popular: false,
    region: "north-america",
    keywords: ["naples", "florida", "marco island", "apf"]
  },
  {
    id: "aspen",
    name: "Aspen-Pitkin County Airport (Sardy Field)",
    city: "Aspen",
    country: "United States",
    iata: "ASE",
    icao: "KASE",
    type: "fbo",
    typeLabel: "Premier Rocky Mountain Ski Hub",
    popular: true,
    region: "north-america",
    keywords: ["aspen", "colorado", "rockies", "ski", "snowmass", "ase"]
  },
  {
    id: "vail-eagle",
    name: "Eagle County Regional Airport (Vail)",
    city: "Vail / Beaver Creek",
    country: "United States",
    iata: "EGE",
    icao: "KEGE",
    type: "fbo",
    typeLabel: "Vail & Beaver Creek Ski Gateway",
    popular: true,
    region: "north-america",
    keywords: ["vail", "eagle", "beaver creek", "colorado", "ski", "ege"]
  },
  {
    id: "telluride",
    name: "Telluride Regional Airport",
    city: "Telluride",
    country: "United States",
    iata: "TEX",
    icao: "KTEX",
    type: "altiport",
    typeLabel: "North America's Highest Commercial Airstrip (2,765m)",
    popular: true,
    region: "north-america",
    keywords: ["telluride", "colorado", "ski", "mountain", "tex"]
  },
  {
    id: "jackson-hole",
    name: "Jackson Hole Airport",
    city: "Jackson",
    country: "United States",
    iata: "JAC",
    icao: "KJAC",
    type: "fbo",
    typeLabel: "Grand Teton National Park Airport",
    popular: true,
    region: "north-america",
    keywords: ["jackson hole", "wyoming", "tetons", "yellowstone", "jac"]
  },
  {
    id: "sun-valley",
    name: "Friedman Memorial Airport (Sun Valley)",
    city: "Sun Valley / Hailey",
    country: "United States",
    iata: "SUN",
    icao: "KSUN",
    type: "fbo",
    typeLabel: "Sun Valley Private Ski Gateway",
    popular: false,
    region: "north-america",
    keywords: ["sun valley", "idaho", "ski", "sun"]
  },
  {
    id: "bozeman",
    name: "Bozeman Yellowstone International",
    city: "Bozeman / Big Sky",
    country: "United States",
    iata: "BZN",
    icao: "KBZN",
    type: "fbo",
    typeLabel: "Big Sky & Yellowstone Gateway",
    popular: false,
    region: "north-america",
    keywords: ["bozeman", "big sky", "montana", "yellowstone", "bzn"]
  },
  {
    id: "scottsdale",
    name: "Scottsdale Airport",
    city: "Scottsdale / Phoenix",
    country: "United States",
    iata: "SCF",
    icao: "KSDL",
    type: "dedicated",
    typeLabel: "Dedicated Executive Airport Arizona",
    popular: true,
    region: "north-america",
    keywords: ["scottsdale", "phoenix", "arizona", "scf", "sdl"]
  },
  {
    id: "las-vegas-henderson",
    name: "Henderson Executive Airport",
    city: "Las Vegas",
    country: "United States",
    iata: "HSH",
    icao: "KHND",
    type: "dedicated",
    typeLabel: "Dedicated Las Vegas Executive Airport",
    popular: true,
    region: "north-america",
    keywords: ["las vegas", "henderson", "nevada", "the strip"]
  },
  {
    id: "las-vegas-harry-reid",
    name: "Harry Reid International (Signature Terminal)",
    city: "Las Vegas",
    country: "United States",
    iata: "LAS",
    icao: "KLAS",
    type: "fbo",
    typeLabel: "Signature Flight Support Las Vegas",
    popular: false,
    region: "north-america",
    keywords: ["las vegas", "mccarran", "strip", "las"]
  },
  {
    id: "chicago-executive",
    name: "Chicago Executive Airport",
    city: "Chicago",
    country: "United States",
    iata: "PWK",
    icao: "KPWK",
    type: "dedicated",
    typeLabel: "Dedicated Corporate Airport",
    popular: true,
    region: "north-america",
    keywords: ["chicago", "palwaukee", "illinois", "pwk"]
  },
  {
    id: "chicago-midway",
    name: "Chicago Midway (Signature Terminal)",
    city: "Chicago",
    country: "United States",
    iata: "MDW",
    icao: "KMDW",
    type: "fbo",
    typeLabel: "Signature Midway FBO",
    popular: false,
    region: "north-america",
    keywords: ["chicago", "midway", "mdw"]
  },
  {
    id: "dallas-love-field",
    name: "Dallas Love Field (Business Aviation)",
    city: "Dallas",
    country: "United States",
    iata: "DAL",
    icao: "KDAL",
    type: "fbo",
    typeLabel: "Premier Dallas Business Hub",
    popular: true,
    region: "north-america",
    keywords: ["dallas", "love field", "texas", "dal"]
  },
  {
    id: "dallas-addison",
    name: "Addison Airport",
    city: "Dallas / Addison",
    country: "United States",
    iata: "ADS",
    icao: "KADS",
    type: "dedicated",
    typeLabel: "Dedicated Business Aviation",
    popular: false,
    region: "north-america",
    keywords: ["addison", "dallas", "ads"]
  },
  {
    id: "houston-hobby",
    name: "William P. Hobby (Million Air Flagship FBO)",
    city: "Houston",
    country: "United States",
    iata: "HOU",
    icao: "KHOU",
    type: "fbo",
    typeLabel: "Million Air Flagship VIP Terminal",
    popular: false,
    region: "north-america",
    keywords: ["houston", "hobby", "million air", "hou"]
  },
  {
    id: "austin",
    name: "Austin-Bergstrom International (Signature FBO)",
    city: "Austin",
    country: "United States",
    iata: "AUS",
    icao: "KAUS",
    type: "fbo",
    typeLabel: "Austin Executive Aviation",
    popular: false,
    region: "north-america",
    keywords: ["austin", "texas", "aus"]
  },
  {
    id: "san-francisco-oakland",
    name: "Oakland International (Signature Executive)",
    city: "San Francisco / Oakland",
    country: "United States",
    iata: "OAK",
    icao: "KOAK",
    type: "fbo",
    typeLabel: "Bay Area Corporate Hub",
    popular: false,
    region: "north-america",
    keywords: ["san francisco", "oakland", "bay area", "oak"]
  },
  {
    id: "san-jose",
    name: "San Jose Mineta (Signature Flight Support)",
    city: "San Jose",
    country: "United States",
    iata: "SJC",
    icao: "KSJC",
    type: "fbo",
    typeLabel: "Silicon Valley VIP Terminal",
    popular: false,
    region: "north-america",
    keywords: ["san jose", "silicon valley", "sjc"]
  },
  {
    id: "nantucket",
    name: "Nantucket Memorial Airport",
    city: "Nantucket",
    country: "United States",
    iata: "ACK",
    icao: "KACK",
    type: "airstrip",
    typeLabel: "Cape & Islands Executive Airstrip",
    popular: true,
    region: "north-america",
    keywords: ["nantucket", "massachusetts", "cape cod", "ack"]
  },
  {
    id: "marthas-vineyard",
    name: "Martha's Vineyard Airport",
    city: "Martha's Vineyard",
    country: "United States",
    iata: "MVY",
    icao: "KMVY",
    type: "airstrip",
    typeLabel: "Island Executive Airstrip",
    popular: true,
    region: "north-america",
    keywords: ["martha's vineyard", "marthas vineyard", "massachusetts", "mvy"]
  },

  // --- CARIBBEAN ---
  {
    id: "st-barts",
    name: "Gustaf III Airport (St. Jean)",
    city: "St. Barthélemy",
    country: "Saint Barthélemy",
    iata: "SBH",
    icao: "TFFJ",
    type: "airstrip",
    typeLabel: "Iconic Caribbean Luxury Runway",
    popular: true,
    region: "caribbean",
    keywords: ["st barts", "st barth", "saint barthelemy", "gustaf iii", "sbh", "caribbean"]
  },
  {
    id: "st-maarten",
    name: "Princess Juliana International Executive",
    city: "St. Maarten",
    country: "Sint Maarten",
    iata: "SXM",
    icao: "TNCM",
    type: "fbo",
    typeLabel: "Caribbean Business Aviation Hub",
    popular: true,
    region: "caribbean",
    keywords: ["st maarten", "saint martin", "juliana", "sxm"]
  },
  {
    id: "nassau",
    name: "Lynden Pindling (Jet Aviation / Odyssey)",
    city: "Nassau",
    country: "Bahamas",
    iata: "NAS",
    icao: "MYNN",
    type: "fbo",
    typeLabel: "Bahamas Premier Executive FBO",
    popular: true,
    region: "caribbean",
    keywords: ["nassau", "bahamas", "paradise island", "nas"]
  },
  {
    id: "bermuda",
    name: "L.F. Wade International (Cedar Aviation)",
    city: "St. George's / Hamilton",
    country: "Bermuda",
    iata: "BDA",
    icao: "TXKF",
    type: "fbo",
    typeLabel: "Bermuda Executive Terminal",
    popular: false,
    region: "caribbean",
    keywords: ["bermuda", "hamilton", "bda"]
  },
  {
    id: "turks-and-caicos",
    name: "Providenciales (Provo Air Center)",
    city: "Providenciales",
    country: "Turks and Caicos",
    iata: "PLS",
    icao: "MBPV",
    type: "fbo",
    typeLabel: "Provo Air Center Award-Winning FBO",
    popular: true,
    region: "caribbean",
    keywords: ["turks and caicos", "providenciales", "provo", "pls"]
  },
  {
    id: "barbados",
    name: "Grantley Adams (Executive Air / Platinum)",
    city: "Bridgetown",
    country: "Barbados",
    iata: "BGI",
    icao: "TBPB",
    type: "fbo",
    typeLabel: "Barbados VIP Aviation Terminal",
    popular: false,
    region: "caribbean",
    keywords: ["barbados", "bridgetown", "bgi"]
  },
  {
    id: "anguilla",
    name: "Clayton J. Lloyd International Airport",
    city: "The Valley",
    country: "Anguilla",
    iata: "AXA",
    icao: "TQPF",
    type: "airstrip",
    typeLabel: "Exclusive Island Runway",
    popular: false,
    region: "caribbean",
    keywords: ["anguilla", "axa"]
  },

  // --- MIDDLE EAST ---
  {
    id: "dubai-international",
    name: "Dubai International Executive Flight Centre",
    city: "Dubai",
    country: "United Arab Emirates",
    iata: "DXB",
    icao: "OMDB",
    type: "fbo",
    typeLabel: "Executive Flight Centre VIP",
    popular: true,
    region: "middle-east",
    keywords: ["dubai", "dxb", "uae", "emirates"]
  },
  {
    id: "dubai-al-maktoum",
    name: "Al Maktoum International (VIP Terminal)",
    city: "Dubai",
    country: "United Arab Emirates",
    iata: "DWC",
    icao: "OMDW",
    type: "dedicated",
    typeLabel: "World's Largest Dedicated VIP Terminal",
    popular: true,
    region: "middle-east",
    keywords: ["dubai", "al maktoum", "dwc", "dubai south", "jetex"]
  },
  {
    id: "abu-dhabi-al-bateen",
    name: "Al Bateen Executive Airport",
    city: "Abu Dhabi",
    country: "United Arab Emirates",
    iata: "AZI",
    icao: "OMAD",
    type: "dedicated",
    typeLabel: "Middle East's First Dedicated Business Airport",
    popular: true,
    region: "middle-east",
    keywords: ["abu dhabi", "al bateen", "azi", "uae"]
  },
  {
    id: "riyadh",
    name: "King Khalid International Private Aviation",
    city: "Riyadh",
    country: "Saudi Arabia",
    iata: "RUH",
    icao: "OERK",
    type: "fbo",
    typeLabel: "Royal & Private Aviation Terminal",
    popular: true,
    region: "middle-east",
    keywords: ["riyadh", "saudi arabia", "ruh"]
  },
  {
    id: "jeddah",
    name: "King Abdulaziz Royal Terminal",
    city: "Jeddah",
    country: "Saudi Arabia",
    iata: "JED",
    icao: "OEJN",
    type: "fbo",
    typeLabel: "Private Aviation Lounge",
    popular: false,
    region: "middle-east",
    keywords: ["jeddah", "red sea", "jed"]
  },
  {
    id: "doha",
    name: "Hamad International (Qatar Executive Terminal)",
    city: "Doha",
    country: "Qatar",
    iata: "DOH",
    icao: "OTHH",
    type: "fbo",
    typeLabel: "Qatar Executive VIP Terminal",
    popular: true,
    region: "middle-east",
    keywords: ["doha", "qatar", "doh"]
  },
  {
    id: "bahrain",
    name: "Bahrain International (Hala Bahrain VIP)",
    city: "Manama",
    country: "Bahrain",
    iata: "BAH",
    icao: "OBBI",
    type: "fbo",
    typeLabel: "Executive Aviation Terminal",
    popular: false,
    region: "middle-east",
    keywords: ["bahrain", "manama", "bah"]
  },
  {
    id: "muscat",
    name: "Muscat International (Majan Executive)",
    city: "Muscat",
    country: "Oman",
    iata: "MCT",
    icao: "OOMS",
    type: "fbo",
    typeLabel: "Executive Aviation Terminal",
    popular: false,
    region: "middle-east",
    keywords: ["muscat", "oman", "mct"]
  },

  // --- ASIA-PACIFIC ---
  {
    id: "singapore-seletar",
    name: "Seletar Airport",
    city: "Singapore",
    country: "Singapore",
    iata: "XSP",
    icao: "WSSL",
    type: "dedicated",
    typeLabel: "Singapore Dedicated Business Aviation Centre",
    popular: true,
    region: "asia-pacific",
    keywords: ["singapore", "seletar", "xsp", "asia"]
  },
  {
    id: "singapore-changi",
    name: "Singapore Changi (JetQuay CIP Terminal)",
    city: "Singapore",
    country: "Singapore",
    iata: "SIN",
    icao: "WSSS",
    type: "fbo",
    typeLabel: "JetQuay Elite CIP Terminal",
    popular: false,
    region: "asia-pacific",
    keywords: ["singapore", "changi", "jetquay", "sin"]
  },
  {
    id: "hong-kong",
    name: "Hong Kong Business Aviation Centre (HKBAC)",
    city: "Hong Kong",
    country: "Hong Kong",
    iata: "HKG",
    icao: "VHHH",
    type: "dedicated",
    typeLabel: "Dedicated Business Aviation Centre",
    popular: true,
    region: "asia-pacific",
    keywords: ["hong kong", "hkbac", "chek lap kok", "hkg"]
  },
  {
    id: "tokyo-haneda",
    name: "Tokyo Haneda Business Jet Gate",
    city: "Tokyo",
    country: "Japan",
    iata: "HND",
    icao: "RJTT",
    type: "fbo",
    typeLabel: "Dedicated Business Jet Facility",
    popular: true,
    region: "asia-pacific",
    keywords: ["tokyo", "haneda", "japan", "hnd"]
  },
  {
    id: "tokyo-narita",
    name: "Tokyo Narita Premier Gate",
    city: "Tokyo",
    country: "Japan",
    iata: "NRT",
    icao: "RJAA",
    type: "fbo",
    typeLabel: "Premier Gate Executive Terminal",
    popular: false,
    region: "asia-pacific",
    keywords: ["tokyo", "narita", "nrt"]
  },
  {
    id: "bangkok-don-mueang",
    name: "Don Mueang (MJets Private Jet Terminal)",
    city: "Bangkok",
    country: "Thailand",
    iata: "DMK",
    icao: "VTBD",
    type: "dedicated",
    typeLabel: "MJets Dedicated Private Jet Hub",
    popular: true,
    region: "asia-pacific",
    keywords: ["bangkok", "don mueang", "mjets", "thailand", "dmk"]
  },
  {
    id: "phuket",
    name: "Phuket International (Siam Land Private Wing)",
    city: "Phuket",
    country: "Thailand",
    iata: "HKT",
    icao: "VTSP",
    type: "fbo",
    typeLabel: "Private Jet Wing",
    popular: false,
    region: "asia-pacific",
    keywords: ["phuket", "thailand", "hkt"]
  },
  {
    id: "bali",
    name: "Ngurah Rai (Denpasar) General Aviation",
    city: "Bali",
    country: "Indonesia",
    iata: "DPS",
    icao: "WADD",
    type: "fbo",
    typeLabel: "General Aviation VIP Terminal",
    popular: true,
    region: "asia-pacific",
    keywords: ["bali", "denpasar", "indonesia", "dps"]
  },
  {
    id: "maldives-male",
    name: "Velana International VIP Terminal",
    city: "Malé",
    country: "Maldives",
    iata: "MLE",
    icao: "VRMM",
    type: "fbo",
    typeLabel: "VIP Seaplane & Jet Terminal",
    popular: true,
    region: "asia-pacific",
    keywords: ["maldives", "male", "resorts", "mle"]
  },
  {
    id: "sydney",
    name: "Sydney Kingsford Smith (Jet Aviation)",
    city: "Sydney",
    country: "Australia",
    iata: "SYD",
    icao: "YSSY",
    type: "fbo",
    typeLabel: "Executive Aviation Terminal",
    popular: true,
    region: "asia-pacific",
    keywords: ["sydney", "australia", "syd"]
  },
  {
    id: "melbourne-essendon",
    name: "Essendon Fields Airport",
    city: "Melbourne",
    country: "Australia",
    iata: "MEB",
    icao: "YMEN",
    type: "dedicated",
    typeLabel: "Dedicated Corporate & VIP Airport",
    popular: false,
    region: "asia-pacific",
    keywords: ["melbourne", "essendon", "australia", "meb"]
  },
  {
    id: "auckland",
    name: "Auckland International (Airfix / Jet Aviation)",
    city: "Auckland",
    country: "New Zealand",
    iata: "AKL",
    icao: "NZAA",
    type: "fbo",
    typeLabel: "Executive Aviation Terminal",
    popular: false,
    region: "asia-pacific",
    keywords: ["auckland", "new zealand", "akl"]
  },

  // --- AFRICA ---
  {
    id: "marrakech",
    name: "Marrakech Menara VIP Terminal",
    city: "Marrakech",
    country: "Morocco",
    iata: "RAK",
    icao: "GMMX",
    type: "fbo",
    typeLabel: "Swissport Executive VIP Terminal",
    popular: true,
    region: "africa",
    keywords: ["marrakech", "morocco", "menara", "rak", "africa"]
  },
  {
    id: "cairo",
    name: "Cairo International Private Terminal 4",
    city: "Cairo",
    country: "Egypt",
    iata: "CAI",
    icao: "HECA",
    type: "fbo",
    typeLabel: "Private Aviation Terminal",
    popular: true,
    region: "africa",
    keywords: ["cairo", "egypt", "cai", "africa"]
  },
  {
    id: "cape-town",
    name: "Cape Town International (Signature FBO)",
    city: "Cape Town",
    country: "South Africa",
    iata: "CPT",
    icao: "FACT",
    type: "fbo",
    typeLabel: "Signature Flight Support South Africa",
    popular: true,
    region: "africa",
    keywords: ["cape town", "south africa", "cpt", "africa"]
  },
  {
    id: "johannesburg-lanseria",
    name: "Lanseria International Airport",
    city: "Johannesburg",
    country: "South Africa",
    iata: "HLA",
    icao: "FALA",
    type: "dedicated",
    typeLabel: "Dedicated Business Aviation Airport",
    popular: true,
    region: "africa",
    keywords: ["johannesburg", "lanseria", "gauteng", "hla", "south africa", "africa"]
  },
  {
    id: "nairobi-wilson",
    name: "Wilson Airport",
    city: "Nairobi",
    country: "Kenya",
    iata: "WIL",
    icao: "HKNW",
    type: "airstrip",
    typeLabel: "East Africa Safari & Private Jet Hub",
    popular: true,
    region: "africa",
    keywords: ["nairobi", "wilson", "kenya", "safari", "masai mara", "wil", "africa"]
  },
  {
    id: "maun-botswana",
    name: "Maun Airport",
    city: "Maun",
    country: "Botswana",
    iata: "MUB",
    icao: "FBMN",
    type: "airstrip",
    typeLabel: "Okavango Delta Safari Airstrip Hub",
    popular: true,
    region: "africa",
    keywords: ["maun", "botswana", "okavango", "safari", "mub", "africa"]
  },
  {
    id: "seychelles",
    name: "Seychelles International VIP Lounge",
    city: "Mahé",
    country: "Seychelles",
    iata: "SEZ",
    icao: "FSIA",
    type: "fbo",
    typeLabel: "Island Luxury VIP Terminal",
    popular: true,
    region: "africa",
    keywords: ["seychelles", "mahe", "sez", "africa", "island"]
  },
  {
    id: "lagos-mma",
    name: "Murtala Muhammed International (Private Terminal)",
    city: "Lagos",
    country: "Nigeria",
    iata: "LOS",
    icao: "DNMM",
    type: "fbo",
    typeLabel: "Private Aviation FBO Terminal",
    popular: true,
    region: "africa",
    keywords: ["lagos", "nigeria", "los", "mma", "africa", "west africa"]
  },
  {
    id: "abuja",
    name: "Nnamdi Azikiwe International (Executive Terminal)",
    city: "Abuja",
    country: "Nigeria",
    iata: "ABV",
    icao: "DNAA",
    type: "fbo",
    typeLabel: "Executive Terminal",
    popular: true,
    region: "africa",
    keywords: ["abuja", "nigeria", "abv", "africa", "west africa"]
  },
  {
    id: "accra",
    name: "Kotoka International (Private Jet Centre)",
    city: "Accra",
    country: "Ghana",
    iata: "ACC",
    icao: "DGAA",
    type: "fbo",
    typeLabel: "Private Jet Centre",
    popular: true,
    region: "africa",
    keywords: ["accra", "ghana", "acc", "kotoka", "africa", "west africa"]
  },
  {
    id: "kigali",
    name: "Kigali International Airport",
    city: "Kigali",
    country: "Rwanda",
    iata: "KGL",
    icao: "HRYR",
    type: "international",
    typeLabel: "International Airport",
    popular: true,
    region: "africa",
    keywords: ["kigali", "rwanda", "kgl", "africa", "east africa"]
  },
  {
    id: "addis-ababa",
    name: "Addis Ababa Bole International",
    city: "Addis Ababa",
    country: "Ethiopia",
    iata: "ADD",
    icao: "HAAB",
    type: "international",
    typeLabel: "International Hub",
    popular: true,
    region: "africa",
    keywords: ["addis ababa", "ethiopia", "add", "bole", "africa", "east africa"]
  },
  {
    id: "dar-es-salaam",
    name: "Julius Nyerere International (VIP Terminal)",
    city: "Dar es Salaam",
    country: "Tanzania",
    iata: "DAR",
    icao: "HTDA",
    type: "fbo",
    typeLabel: "VIP Terminal",
    popular: true,
    region: "africa",
    keywords: ["dar es salaam", "tanzania", "dar", "africa", "east africa", "zanzibar"]
  },
  {
    id: "casablanca",
    name: "Mohammed V International (Business Aviation)",
    city: "Casablanca",
    country: "Morocco",
    iata: "CMN",
    icao: "GMMN",
    type: "fbo",
    typeLabel: "Business Aviation Centre",
    popular: true,
    region: "africa",
    keywords: ["casablanca", "morocco", "cmn", "africa", "north africa"]
  },
  {
    id: "zanzibar",
    name: "Abeid Amani Karume International",
    city: "Zanzibar",
    country: "Tanzania",
    iata: "ZNZ",
    icao: "HTZA",
    type: "international",
    typeLabel: "Island International Airport",
    popular: true,
    region: "africa",
    keywords: ["zanzibar", "tanzania", "znz", "africa", "island", "east africa"]
  },
  {
    id: "johannesburg-ortambo",
    name: "O.R. Tambo International (Fireblade Aviation FBO)",
    city: "Johannesburg",
    country: "South Africa",
    iata: "JNB",
    icao: "FAOR",
    type: "fbo",
    typeLabel: "VIP Executive Aviation Facility",
    popular: true,
    region: "africa",
    keywords: ["johannesburg", "south africa", "jnb", "fireblade", "africa"]
  },
  {
    id: "port-harcourt",
    name: "Port Harcourt International (VIP Lounge)",
    city: "Port Harcourt",
    country: "Nigeria",
    iata: "PHC",
    icao: "DNPO",
    type: "fbo",
    typeLabel: "Executive Aviation Terminal",
    popular: true,
    region: "africa",
    keywords: ["port harcourt", "nigeria", "phc", "rivers state", "africa", "west africa"]
  },
  {
    id: "dakar",
    name: "Blaise Diagne International (Executive FBO)",
    city: "Dakar",
    country: "Senegal",
    iata: "DSS",
    icao: "GOBD",
    type: "fbo",
    typeLabel: "West Africa VIP Aviation Hub",
    popular: true,
    region: "africa",
    keywords: ["dakar", "senegal", "dss", "africa", "west africa"]
  },
  {
    id: "luanda",
    name: "Quatro de Fevereiro International",
    city: "Luanda",
    country: "Angola",
    iata: "LAD",
    icao: "FNLU",
    type: "fbo",
    typeLabel: "Business Aviation FBO",
    popular: true,
    region: "africa",
    keywords: ["luanda", "angola", "lad", "africa", "central africa"]
  },
  {
    id: "mauritius",
    name: "Sir Seewoosagur Ramgoolam (Yu Lounge Private Terminal)",
    city: "Plaine Magnien",
    country: "Mauritius",
    iata: "MRU",
    icao: "FIMP",
    type: "fbo",
    typeLabel: "Luxury Island VIP Terminal",
    popular: true,
    region: "africa",
    keywords: ["mauritius", "mru", "yu lounge", "island", "africa", "indian ocean"]
  },
  {
    id: "entebbe",
    name: "Entebbe International (VIP Handling)",
    city: "Entebbe / Kampala",
    country: "Uganda",
    iata: "EBB",
    icao: "HUEN",
    type: "fbo",
    typeLabel: "East Africa Private Jet Hub",
    popular: true,
    region: "africa",
    keywords: ["entebbe", "kampala", "uganda", "ebb", "africa", "east africa"]
  }
];

/**
 * Search and rank airports by query string.
 * Supports matching IATA abbreviation, ICAO abbreviation, airport name, city, country, region, and keywords.
 */
export function searchAirports(rawQuery: string, limit = 15): Airport[] {
  const query = rawQuery.trim().toLowerCase();
  
  if (!query) {
    // Return a diverse selection of popular airports across regions, prominently including top African hubs
    const africanHubs = airportsData.filter((a) => a.region === "africa" && a.popular);
    const otherHubs = airportsData.filter((a) => a.region !== "africa" && a.popular);
    
    // Interleave African hubs with top international hubs
    const combined: Airport[] = [];
    const maxLen = Math.max(africanHubs.length, otherHubs.length);
    for (let i = 0; i < maxLen; i++) {
      if (africanHubs[i]) combined.push(africanHubs[i]);
      if (otherHubs[i]) combined.push(otherHubs[i]);
      if (combined.length >= limit * 2) break;
    }
    return combined.slice(0, limit);
  }

  const matches: { airport: Airport; score: number }[] = [];

  for (const airport of airportsData) {
    const iata = airport.iata.toLowerCase();
    const icao = airport.icao.toLowerCase();
    const city = airport.city.toLowerCase();
    const name = airport.name.toLowerCase();
    const country = airport.country.toLowerCase();
    const region = (airport.region || "").toLowerCase();
    const keywords = (airport.keywords || []).map((k) => k.toLowerCase());

    let score = 0;

    // Exact IATA match (e.g. user typed "fab" or "nce" or "los")
    if (iata === query) {
      score += 1000;
    } 
    // Exact ICAO match (e.g. user typed "eglf" or "dnmm")
    else if (icao === query) {
      score += 900;
    }
    // IATA starts with query
    else if (iata.startsWith(query)) {
      score += 500;
    }
    // ICAO starts with query
    else if (icao.startsWith(query)) {
      score += 450;
    }
    // City exact match
    else if (city === query) {
      score += 400;
    }
    // City starts with query (e.g. "lond" -> London, "lago" -> Lagos)
    else if (city.startsWith(query)) {
      score += 300;
    }
    // City contains query
    else if (city.includes(query)) {
      score += 200;
    }
    // Name starts with query
    else if (name.startsWith(query)) {
      score += 180;
    }
    // Name contains query
    else if (name.includes(query)) {
      score += 150;
    }
    // Region match (e.g. user typed "africa" or "african")
    if (query === "africa" || query === "african" || (query.startsWith("afri") && region === "africa")) {
      score += 350;
    } else if (region.includes(query)) {
      score += 150;
    }
    // Keywords exact match
    if (keywords.some((k) => k === query)) {
      score += 140;
    }
    // Keywords contains query
    else if (keywords.some((k) => k.includes(query))) {
      score += 100;
    }
    // Country starts with query (e.g. "nigeria", "ghana", "south africa")
    if (country.startsWith(query)) {
      score += 120;
    }
    // Country contains query
    else if (country.includes(query)) {
      score += 70;
    }

    if (score > 0) {
      // Boost popular airports slightly to break ties
      if (airport.popular) {
        score += 10;
      }
      matches.push({ airport, score });
    }
  }

  matches.sort((a, b) => b.score - a.score);
  return matches.slice(0, limit).map((m) => m.airport);
}

/**
 * Format airport for input display value: "City Airport (IATA)" or "City (IATA)"
 */
export function formatAirportDisplay(airport: Airport): string {
  // If city is already in the name, e.g. "Farnborough Airport" -> "London Farnborough (FAB)"
  if (airport.city === "London" && airport.name.includes("Farnborough")) {
    return "London Farnborough (FAB)";
  }
  if (airport.city === "Nice / Monaco" || airport.name.includes("Nice Côte d'Azur")) {
    return "Nice Côte d'Azur (NCE)";
  }
  if (airport.city === "Paris" && airport.name.includes("Le Bourget")) {
    return "Paris Le Bourget (LBG)";
  }
  if (airport.city.includes("New York") && airport.name.includes("Teterboro")) {
    return "New York Teterboro (TEB)";
  }
  if (airport.city.includes("Geneva")) {
    return "Geneva Cointrin (GVA)";
  }
  if (airport.city.includes("Courchevel")) {
    return "Courchevel Altiport (CVF)";
  }
  if (airport.city.includes("St. Moritz")) {
    return "St. Moritz Samedan (SMV)";
  }
  if (airport.city.includes("Los Angeles") && airport.name.includes("Van Nuys")) {
    return "Los Angeles Van Nuys (VNY)";
  }
  if (airport.city.includes("Miami") && airport.name.includes("Opa-locka")) {
    return "Miami Opa-locka (OPF)";
  }
  if (airport.city.includes("Dubai")) {
    if (airport.iata === "DXB") return "Dubai International (DXB)";
    if (airport.iata === "DWC") return "Dubai Al Maktoum (DWC)";
  }
  if (airport.city.includes("Ibiza")) {
    return "Ibiza (IBZ)";
  }
  if (airport.city.includes("Mykonos")) {
    return "Mykonos (JMK)";
  }
  if (airport.city.includes("Aspen")) {
    return "Aspen Pitkin County (ASE)";
  }
  if (airport.city.includes("Milan") && airport.name.includes("Linate")) {
    return "Milan Linate Prime (LIN)";
  }

  // Default clean format: "City Name (IATA)"
  return `${airport.city} (${airport.iata})`;
}

export const KNOWN_FBOS: Record<string, FBOInfo> = {
  // UK & Ireland
  FAB: {
    name: "Farnborough Executive Aviation Terminal (TAG / Farnborough Airport)",
    phone: "+44 1252 375300",
    email: "ops@farnboroughairport.com",
    handler: "Farnborough Airport Operations",
    frequency: "130.405 MHz",
    address: "Farnborough Airport, Hampshire, GU14 6XA, United Kingdom"
  },
  BQH: {
    name: "Biggin Hill Executive Handling & VIP Terminal",
    phone: "+44 1959 578500",
    email: "handling@bigginhillairport.com",
    handler: "Biggin Hill Airport Handling Ltd",
    frequency: "131.980 MHz",
    address: "Main Terminal, Biggin Hill Airport, Bromley, TN16 3BN, United Kingdom"
  },
  LTN: {
    name: "Signature Flight Support / Harrods Aviation Luton",
    phone: "+44 1582 724182",
    email: "ltn@signatureflight.co.uk",
    handler: "Signature Aviation / Harrods Aviation",
    frequency: "122.375 MHz",
    address: "Percival Way, London Luton Airport, LU2 9PA, United Kingdom"
  },
  STN: {
    name: "Harrods Aviation / Fayair Stansted VIP Terminal",
    phone: "+44 1279 680616",
    email: "stansted@harrodsaviation.com",
    handler: "Harrods Aviation Stansted",
    frequency: "130.650 MHz",
    address: "First Avenue, London Stansted Airport, CM24 1QQ, United Kingdom"
  },
  OXF: {
    name: "Oxford Jet / London Oxford Executive FBO",
    phone: "+44 1865 290600",
    email: "ops@oxfordairport.co.uk",
    handler: "Oxford Airport Terminal",
    address: "Langford Lane, Kidlington, Oxfordshire, OX5 1RA, United Kingdom"
  },
  // France & Monaco
  NCE: {
    name: "Signature Flight Support / Aviapartner Executive Nice",
    phone: "+33 4 93 21 00 10",
    email: "nce@signatureflight.com",
    handler: "Signature Aviation Nice VIP Terminal",
    frequency: "131.425 MHz",
    address: "Aéroport Nice Côte d'Azur, Terminal Aviation d'Affaires, 06281 Nice, France"
  },
  LBG: {
    name: "Jet Aviation / Astonsky VIP Terminal Paris Le Bourget",
    phone: "+33 1 48 35 88 88",
    email: "lbg@jetaviation.com",
    handler: "Jet Aviation France SAS",
    frequency: "130.150 MHz",
    address: "Aéroport de Paris-Le Bourget, Zone Aviation d'Affaires, 93350 Le Bourget, France"
  },
  CEQ: {
    name: "Cannes Mandelieu Executive FBO",
    phone: "+33 4 93 90 40 40",
    email: "cannes.fbo@cote-dazur.aeroport.fr",
    handler: "Aéroports de la Côte d'Azur",
    address: "245 Avenue Francis Tonner, 06150 Cannes, France"
  },
  // Switzerland
  GVA: {
    name: "TAG Aviation / Jet Aviation Geneva FBO",
    phone: "+41 22 717 0000",
    email: "gva.handling@tagaviation.com",
    handler: "TAG Aviation Geneva VIP Handling",
    frequency: "130.600 MHz",
    address: "Chemin des Papillons 20, 1215 Geneva Airport, Switzerland"
  },
  ZRH: {
    name: "ExecuJet / Cat Aviation Zurich VIP Terminal",
    phone: "+41 44 804 1616",
    email: "fbo.zurich@execujet.com",
    handler: "ExecuJet Zurich FBO",
    address: "General Aviation Center, Zurich Airport, 8058 Zurich, Switzerland"
  },
  SMV: {
    name: "Engadin Airport Samedan VIP Handling",
    phone: "+41 81 851 0851",
    email: "handling@engadin-airport.ch",
    handler: "Engadin Airport AG",
    address: "Plazza Aviatica 2, 7503 Samedan, Switzerland"
  },
  // USA & Americas
  TEB: {
    name: "Meridian Teterboro / Jet Aviation TEB",
    phone: "+1 201 288 5040",
    email: "fbo@meridian.aero",
    handler: "Meridian Air Charter & FBO Services",
    frequency: "129.900 MHz",
    address: "485 Industrial Ave, Teterboro, NJ 07608, United States"
  },
  OPF: {
    name: "Fontainebleau Aviation / Atlantic Aviation Opa-locka",
    phone: "+1 305 685 4646",
    email: "fbo@fontainebleauaviation.com",
    handler: "Fontainebleau Aviation Executive Terminal",
    frequency: "131.750 MHz",
    address: "14200 NW 42nd Ave, Opa-locka, FL 33054, United States"
  },
  VNY: {
    name: "Signature Flight Support / Castle & Cooke Van Nuys",
    phone: "+1 818 786 8530",
    email: "vny@signatureflight.com",
    handler: "Signature Aviation Van Nuys",
    frequency: "129.850 MHz",
    address: "7401 Hayvenhurst Ave, Van Nuys, CA 91406, United States"
  },
  HPN: {
    name: "Million Air White Plains / Westchester County",
    phone: "+1 914 446 0100",
    email: "fbo-hpn@millionair.com",
    handler: "Million Air FBO",
    address: "136 Tower Rd, West Harrison, NY 10604, United States"
  },
  PBI: {
    name: "Signature Flight Support Palm Beach VIP",
    phone: "+1 561 683 4121",
    email: "pbi@signatureflight.com",
    handler: "Signature Aviation Palm Beach",
    address: "1500 Perimeter Rd, West Palm Beach, FL 33406, United States"
  },
  LAS: {
    name: "Atlantic Aviation / Signature Las Vegas Executive",
    phone: "+1 702 736 1830",
    email: "las@atlanticaviation.com",
    handler: "Atlantic Aviation Executive Services",
    address: "275 E Tropicana Ave, Las Vegas, NV 89169, United States"
  },
  // Middle East
  DXB: {
    name: "Jetex VIP Terminal / ExecuJet Dubai International",
    phone: "+971 4 212 4000",
    email: "fbo-dxb@jetex.com",
    handler: "Jetex Flight Support Dubai",
    frequency: "131.850 MHz",
    address: "VIP Terminal, Dubai South Aviation District, Dubai, United Arab Emirates"
  },
  DWC: {
    name: "Falcon Aviation / Jet Aviation Dubai World Central",
    phone: "+971 4 807 0707",
    email: "fbo.dwc@jetaviation.com",
    handler: "Falcon Aviation Services / Jet Aviation",
    address: "VIP Terminal Building, Al Maktoum International Airport, Dubai, UAE"
  },
  RUH: {
    name: "ExecuJet Aviation Saudi / Private Wings Riyadh",
    phone: "+966 11 220 8888",
    email: "fbo.riyadh@execujet.com",
    handler: "Private Aviation Terminal Riyadh",
    address: "King Khalid International Airport, Private Terminal, Riyadh, Saudi Arabia"
  },
  DOH: {
    name: "Qatar Executive VIP Terminal Doha",
    phone: "+974 4022 1700",
    email: "qatarexecutive@qatarairways.com.qa",
    handler: "Qatar Executive FBO",
    address: "Doha International Airport VIP Terminal, Doha, Qatar"
  },
  // Africa
  LOS: {
    name: "ExecuJet Aviation Nigeria / EAN Aviation FBO Lagos",
    phone: "+234 1 295 5110",
    email: "fbo.los@execujet.com",
    handler: "ExecuJet Nigeria VIP Terminal",
    address: "Murtala Muhammed International Airport, General Aviation Wing, Ikeja, Lagos, Nigeria"
  },
  ABV: {
    name: "ExecuJet / Skyway Aviation VIP Handling Abuja",
    phone: "+234 9 810 0090",
    email: "handling.abuja@execujet.com",
    handler: "Nnamdi Azikiwe International Airport Presidential Wing / VIP FBO",
    address: "Nnamdi Azikiwe Airport, VIP Terminal, Abuja, Nigeria"
  },
  PHC: {
    name: "Caverton / Bristow Executive FBO Port Harcourt",
    phone: "+234 84 231 100",
    email: "phc.ops@caverton-aviation.com",
    handler: "Port Harcourt Executive Aviation Center",
    address: "Port Harcourt International Airport, Omagwa, Rivers State, Nigeria"
  },
  CPT: {
    name: "Signature Flight Support Cape Town International",
    phone: "+27 21 934 0350",
    email: "cpt@signatureflight.co.za",
    handler: "Signature Aviation Cape Town",
    address: "General Aviation Area, Cape Town International Airport, Cape Town, South Africa"
  },
  JNB: {
    name: "Fireblade Aviation / ExecuJet Lanseria & OR Tambo",
    phone: "+27 10 595 3920",
    email: "fbo@firebladeaviation.com",
    handler: "Fireblade Aviation World-Class VIP FBO",
    address: "Denel Precinct, Atlas Road, Kempton Park, Johannesburg, South Africa"
  },
  NBO: {
    name: "Tradewinds Aviation / Wilson Executive VIP Handling",
    phone: "+254 20 600 3900",
    email: "wilson.fbo@tradewinds-aviation.com",
    handler: "Wilson Airport VIP Executive Hub",
    address: "Wilson Airport, Langata Road, Nairobi, Kenya"
  },
  ACC: {
    name: "Aviance VIP / Kotoka Executive Handling Accra",
    phone: "+233 30 277 8000",
    email: "accra.fbo@aviancecargo.com",
    handler: "Kotoka International Airport Executive Aviation Suite",
    address: "Kotoka International Airport, Airport City, Accra, Ghana"
  },
  KGL: {
    name: "RwandAir Executive / VIP Handling Kigali",
    phone: "+250 788 177 000",
    email: "vip.fbo@kigaliairport.rw",
    handler: "Kigali International Airport VIP Presidential Pavilion",
    address: "Kigali International Airport, Kanombe, Kigali, Rwanda"
  },
  RAK: {
    name: "Swissport Executive Aviation Marrakech Menara",
    phone: "+212 524 44 79 10",
    email: "rak.handling@swissport.com",
    handler: "Swissport Executive Aviation Morocco",
    address: "Marrakech Menara Airport, Private Aviation Pavilion, Marrakech, Morocco"
  },
  CAI: {
    name: "EgyptAir VIP / Cairo Executive Jet Center",
    phone: "+20 2 2265 5000",
    email: "cai.executive@cairo-airport.info",
    handler: "Cairo International Private Flight Services",
    address: "Airport Road, Terminal 4 Private Aviation, Cairo, Egypt"
  },
  SEZ: {
    name: "Seychelles Civil Aviation Authority VIP Lounge / FBO",
    phone: "+248 438 4000",
    email: "viphandling@scaa.sc",
    handler: "SCAA VIP Services Pointe Larue",
    address: "Pointe Larue, Mahé, Seychelles"
  },
  MRU: {
    name: "Yu Lounge VIP Executive Terminal Mauritius",
    phone: "+230 603 6200",
    email: "concierge@yulounge.com",
    handler: "Yu Lounge Luxury FBO Terminal",
    address: "Sir Seewoosagur Ramgoolam International Airport, Plaine Magnien, Mauritius"
  }
};

export function getAirportFBO(airportOrCode: Airport | string | null | undefined): FBOInfo {
  if (!airportOrCode) {
    return {
      name: "Executive VIP Terminal Handling",
      phone: "+1 800 538 3548",
      email: "flightops@orbelo-vip.com",
      handler: "Certified FBO Dispatch",
      frequency: "131.500 MHz",
      address: "VIP Private Aviation Terminal"
    };
  }

  let code = "";
  let cityName = "Executive";
  let fullName = "Executive Jet Center";
  let countryName = "International";

  if (typeof airportOrCode === "string") {
    // Check if it contains IATA code in brackets like "London Farnborough (FAB)"
    const match = airportOrCode.match(/\(([A-Z]{3})\)/i);
    if (match) {
      code = match[1].toUpperCase();
    } else {
      code = airportOrCode.trim().toUpperCase();
    }

    const found = airportsData.find(
      (a) =>
        a.iata.toUpperCase() === code ||
        a.icao.toUpperCase() === code ||
        a.id.toLowerCase() === airportOrCode.toLowerCase()
    );
    if (found) {
      code = found.iata.toUpperCase();
      cityName = found.city;
      fullName = found.name;
      countryName = found.country;
    }
  } else {
    code = airportOrCode.iata ? airportOrCode.iata.toUpperCase() : airportOrCode.icao.toUpperCase();
    cityName = airportOrCode.city;
    fullName = airportOrCode.name;
    countryName = airportOrCode.country;
  }

  if (KNOWN_FBOS[code]) {
    return KNOWN_FBOS[code];
  }

  return {
    name: `${cityName} Executive FBO Terminal (${code})`,
    phone: "+1 800 538 3548",
    email: `fbo.${code.toLowerCase()}@orbelo-vip.com`,
    handler: `${cityName} Private Ramp Ground Handling`,
    frequency: "131.500 MHz",
    address: `${fullName}, Private Aviation Apron, ${countryName}`
  };
}
