export interface Destination {
  id: string;
  city: string;
  country: string;
  region: "europe" | "middle-east" | "americas" | "asia" | "africa";
  regionLabel: string;
  tagline: string;
  description: string;
  flightTime: string; // from London
  airport: string;
  image: string;
  highlights: string[];
  popularFor: string[];
}

export const destinations: Destination[] = [
  {
    id: "nice-cote-dazur",
    city: "Nice",
    country: "France",
    region: "europe",
    regionLabel: "The Riviera",
    tagline: "The Riviera, your way.",
    description:
      "From London to the Mediterranean. Arrive refreshed, with more time for what brought you here.",
    flightTime: "2h from London",
    airport: "Nice Côte d'Azur (NCE)",
    image:
      "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&fit=crop&q=80",
    highlights: ["Cannes", "Monaco", "Antibes", "St-Tropez"],
    popularFor: ["Cannes Film Festival", "Monaco Grand Prix", "Summer retreats"],
  },
  {
    id: "dubai",
    city: "Dubai",
    country: "UAE",
    region: "middle-east",
    regionLabel: "Gulf",
    tagline: "Dubai, without the crowds.",
    description:
      "Skip the commercial terminals entirely. Arrive at a private FBO and step into a city on its own terms.",
    flightTime: "6h 30m from London",
    airport: "Dubai International (DXB) / Al Maktoum (DWC)",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&fit=crop&q=80",
    highlights: ["Downtown", "Palm Jumeirah", "DIFC", "Abu Dhabi day trip"],
    popularFor: ["Business headquarters", "Luxury retail", "Year-round sun"],
  },
  {
    id: "new-york",
    city: "New York",
    country: "United States",
    region: "americas",
    regionLabel: "East Coast",
    tagline: "Arrive ready for New York.",
    description:
      "Seven-plus hours on a commercial flight, or arrive fully rested, ready for the board meeting or the Broadway show.",
    flightTime: "7h 30m from London",
    airport: "Teterboro (TEB) / JFK",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&fit=crop&q=80",
    highlights: ["Manhattan", "Hamptons", "Aspen connection", "Miami"],
    popularFor: ["Finance & banking", "Fashion Week", "East Coast hops"],
  },
  {
    id: "santorini",
    city: "Santorini",
    country: "Greece",
    region: "europe",
    regionLabel: "Aegean",
    tagline: "The islands, exclusively yours.",
    description:
      "Fly into Santorini when the ferries are full and the resorts are quiet. Your private charter doesn't follow a schedule.",
    flightTime: "3h 30m from London",
    airport: "Santorini (JTR)",
    image:
      "https://images.unsplash.com/photo-1469796466635-455ede028aca?w=800&fit=crop&q=80",
    highlights: ["Oia", "Fira", "Private villas", "Naxos day trip"],
    popularFor: ["Honeymoons", "Summer escapes", "Island-hopping"],
  },
  {
    id: "maldives",
    city: "Malé",
    country: "Maldives",
    region: "asia",
    regionLabel: "Indian Ocean",
    tagline: "The world's most private destination.",
    description:
      "Charter to Malé then transfer by seaplane to your resort island. The journey is as remarkable as the destination.",
    flightTime: "10h from London",
    airport: "Velana International (MLE)",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&fit=crop&q=80",
    highlights: ["Private resort islands", "Seaplane transfer", "Underwater dining"],
    popularFor: ["Honeymoons", "Family retreats", "Wellness"],
  },
  {
    id: "st-barts",
    city: "St. Barts",
    country: "Caribbean",
    region: "americas",
    regionLabel: "Caribbean",
    tagline: "St. Barts, on your schedule.",
    description:
      "One of the world's most exclusive islands. Accessible only by small aircraft or yacht — private charter is the only way to arrive in style.",
    flightTime: "9h from London",
    airport: "Gustaf III (SBH)",
    image:
      "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&fit=crop&q=80",
    highlights: ["Shell Beach", "Gustavia", "Private villas", "New Year's Eve"],
    popularFor: ["New Year celebrations", "Winter sun", "VIP retreats"],
  },
];

export const destinationRegions = [
  { id: "all", label: "All destinations" },
  { id: "europe", label: "Europe" },
  { id: "middle-east", label: "Middle East" },
  { id: "americas", label: "The Americas" },
  { id: "asia", label: "Asia & Indian Ocean" },
] as const;
