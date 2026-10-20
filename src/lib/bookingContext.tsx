"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface PassengerInfo {
  id: string;
  fullName: string;
  dateOfBirth: string;
  nationality: string;
  type: "lead" | "adult" | "child";
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  priceLabel: string;
  added: boolean;
  details?: Record<string, string>;
}

export interface BookingState {
  // Step 1: Search
  tripType: "one-way" | "round-trip" | "multi-city";
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departureDate: string;
  departureTime: string;
  returnDate?: string;
  passengers: number;
  flexibleTime: boolean;

  // Step 3: Aircraft
  selectedAircraftId: string | null;

  // Step 4: Review
  reviewConfirmed: boolean;

  // Step 5: Passengers
  bookingContact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  passengerList: PassengerInfo[];
  specialRequests: string;
  passengerConsentGiven: boolean;

  // Step 6: Services
  services: ServiceItem[];

  // Booking reference (Step 8)
  bookingReference: string;
}

const defaultServices: ServiceItem[] = [
  {
    id: "signature-catering",
    name: "Signature bespoke catering",
    description:
      "Gourmet dining crafted to your culinary requests, fine wines, and artisanal refreshments.",
    price: 480,
    priceLabel: "Estimated $480 · Approx. $120 per guest",
    added: false,
    details: {
      menuPreference: "seasonal-gourmet",
      customPreferences: "",
      dietaryRequirements: "",
    },
  },
  {
    id: "chauffeured-arrival",
    name: "Chauffeured tarmac transfer",
    description:
      "Private executive chauffeur vehicle to or from your aircraft steps directly to your final address.",
    price: 320,
    priceLabel: "Estimated $320 · Direct tarmac pickup",
    added: false,
    details: {
      pickupAddress: "",
      destinationAddress: "",
      vehiclePreference: "Mercedes-Benz S-Class",
      pickupTime: "",
    },
  },
  {
    id: "floral-arrangement",
    name: "Onboard floral styling",
    description:
      "Curated fresh floral arrangements to elevate your cabin atmosphere for business or celebration.",
    price: 180,
    priceLabel: "Estimated $180 · Curated arrangement",
    added: false,
    details: {
      floralOption: "Fresh White Phalaenopsis Orchids",
      occasion: "Executive Welcome",
    },
  },
  {
    id: "pets-on-board",
    name: "Pets on board",
    description:
      "Fly with your pets alongside you in the cabin. Includes dedicated pet cabin setup and handling.",
    price: 250,
    priceLabel: "Estimated $250 · Cabin pet preparation",
    added: false,
    details: {
      petType: "Dog",
      petBreed: "",
      petWeight: "",
      hasPassportAndDocuments: "false",
    },
  },
  {
    id: "weapons-on-board",
    name: "Firearms & weapons declaration",
    description:
      "Mandatory legal declaration for licensed sporting, hunting, or personal security firearms.",
    price: 0,
    priceLabel: "Official declaration · Advance manifest verification",
    added: false,
    details: {
      weaponType: "Sporting Shotgun",
      quantity: "1",
      licenseNumber: "",
      issuingAuthority: "",
      procedureAcknowledged: "false",
    },
  },
  {
    id: "concierge-requests",
    name: "Personal concierge requests",
    description:
      "Celebrating an occasion, helicopter link, or arranging bespoke amenities? Share your vision.",
    price: 0,
    priceLabel: "Tailored quote · Handled by flight officer",
    added: false,
    details: { request: "" },
  },
];

const initialState: BookingState = {
  tripType: "one-way",
  from: "",
  fromCode: "",
  to: "",
  toCode: "",
  departureDate: "",
  departureTime: "10:00",
  returnDate: "",
  passengers: 2,
  flexibleTime: false,
  selectedAircraftId: null,
  reviewConfirmed: false,
  bookingContact: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  passengerList: [],
  specialRequests: "",
  passengerConsentGiven: false,
  services: defaultServices,
  bookingReference: "",
};

interface BookingContextType {
  booking: BookingState;
  updateBooking: (updates: Partial<BookingState>) => void;
  resetBooking: () => void;
  totalPrice: number;
  basePrice: number;
  servicesTotal: number;
  generateReference: () => string;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const STORAGE_KEY = "skyvantage_booking";

function generateRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const rand = (n: number) => Math.floor(Math.random() * n);
  return `SV-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}-${
    chars[rand(chars.length)]
  }${chars[rand(chars.length)]}${rand(10)}${rand(10)}-${rand(10)}${rand(10)}${rand(10)}${rand(10)}`;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingState>(initialState);

  // Restore from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setBooking({ ...initialState, ...parsed });
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist to sessionStorage on every update
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(booking));
    } catch {
      // ignore
    }
  }, [booking]);

  const updateBooking = (updates: Partial<BookingState>) => {
    setBooking((prev) => ({ ...prev, ...updates }));
  };

  const resetBooking = () => {
    setBooking({ ...initialState, services: defaultServices });
    sessionStorage.removeItem(STORAGE_KEY);
  };

  // Aircraft and Category base charter prices (USD $)
  const aircraftPrices: Record<string, number> = {
    // Jet Size Categories
    "turboprop": 8500,
    "piston": 5200,
    "entry-level-jet": 11500,
    "super-light-jet": 15800,
    "midsize-jet": 21000,
    "super-midsize-jet": 28500,
    "heavy-jet": 39000,
    "ultra-long-range": 58000,
    "vip-airliner": 95000,
    // Individual Models
    "citation-cj3-plus": 11500,
    "phenom-300e": 15800,
    "learjet-75-liberty": 16500,
    "praetor-600": 28500,
    "challenger-350": 24500,
    "gulfstream-g550": 45000,
    "gulfstream-g650er": 62000,
    "global-7500": 59000,
  };

  const basePrice = booking.selectedAircraftId
    ? aircraftPrices[booking.selectedAircraftId] ?? 0
    : 0;

  const servicesTotal = booking.services
    .filter((s) => s.added)
    .reduce((sum, s) => sum + s.price, 0);

  const totalPrice = basePrice + servicesTotal;

  const generateReference = () => {
    const ref = generateRef();
    updateBooking({ bookingReference: ref });
    return ref;
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        updateBooking,
        resetBooking,
        totalPrice,
        basePrice,
        servicesTotal,
        generateReference,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
