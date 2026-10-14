"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { BookingProvider } from "@/lib/bookingContext";
import StepProgress from "@/components/booking/StepProgress";

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getStep = (path: string): number => {
    if (!path) return 1;
    if (path === "/booking" || path === "/booking/") return 1;
    if (path.startsWith("/booking/results")) return 2;
    if (path.startsWith("/booking/aircraft")) return 3;
    if (path.startsWith("/booking/review")) return 4;
    if (path.startsWith("/booking/passengers")) return 5;
    if (path.startsWith("/booking/services")) return 6;
    if (path.startsWith("/booking/payment")) return 7;
    if (path.startsWith("/booking/confirmation")) return 8;
    return 1;
  };

  const currentStep = getStep(pathname);

  return (
    <BookingProvider>
      <div className="min-h-screen bg-white pt-20 lg:pt-24 text-gray-900">
        <StepProgress currentStep={currentStep} />
        <div className="w-full">{children}</div>
      </div>
    </BookingProvider>
  );
}
