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
    name: "Signature catering",
    description:
      "A seasonal menu, fresh fruit and a considered drinks selection, prepared for your party.",
    price: 480,
    priceLabel: "£480 · £120 per passenger",
    added: false,
    details: { menuPreference: "", dietaryRequirements: "" },
  },
  {
    id: "chauffeured-arrival",
    name: "Chauffeured arrival",
    description:
      "A private executive vehicle from the arrival airport to your destination. One seamless arrival for all guests.",
    price: 320,
    priceLabel: "£320 · One-way arrival transfer",
    added: false,
    details: { destination: "", pickupTime: "" },
  },
  {
    id: "floral-arrangement",
    name: "Onboard floral arrangement",
    description:
      "A discreet seasonal arrangement to welcome you onboard, chosen in a soft, neutral palette.",
    price: 180,
    priceLabel: "£180 · Per flight",
    added: false,
  },
  {
    id: "concierge-requests",
    name: "Personal concierge requests",
    description:
      "Travelling with a pet, celebrating an occasion or arranging something special? Share your request with us.",
    price: 0,
    priceLabel: "Tailored quote · No charge added now",
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

  // Aircraft base prices (per charter, not per hour)
  const aircraftPrices: Record<string, number> = {
    "citation-cj3-plus": 14200,
    "phenom-300e": 16500,
    "learjet-75-liberty": 18000,
    "praetor-600": 20500,
    "challenger-350": 24000,
    "gulfstream-g550": 35000,
    "gulfstream-g650er": 42000,
    "global-7500": 55000,
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
