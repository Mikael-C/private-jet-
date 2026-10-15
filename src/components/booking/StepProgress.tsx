"use client";

import React from "react";
import { Check } from "lucide-react";

interface StepProgressProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: "Search" },
  { number: 2, label: "Results" },
  { number: 3, label: "Aircraft" },
  { number: 4, label: "Review" },
  { number: 5, label: "Passengers" },
  { number: 6, label: "Services" },
  { number: 7, label: "Quotation" },
  { number: 8, label: "Confirmation" },
];

export default function StepProgress({ currentStep }: StepProgressProps) {
  const currentStepData = steps.find((s) => s.number === currentStep) || steps[0];

  return (
    <div className="w-full bg-white border-b border-[#E8E5DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        {/* Mobile View */}
        <div className="md:hidden flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0F1420] text-white flex items-center justify-center font-body text-xs font-semibold">
              {currentStep}
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#888888] font-medium block">
                Step {currentStep} of 8
              </span>
              <span className="text-sm font-semibold text-[#0F1420] block">
                {currentStepData.label}
              </span>
            </div>
          </div>
          <div className="w-24 bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#C9A052] h-full transition-all duration-300"
              style={{ width: `${(currentStep / 8) * 100}%` }}
            />
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex items-center justify-between w-full">
          {steps.map((step, index) => {
            const isCompleted = step.number < currentStep;
            const isActive = step.number === currentStep;
            const isFuture = step.number > currentStep;
            const isLast = index === steps.length - 1;

            return (
              <React.Fragment key={step.number}>
                {/* Step Item */}
                <div className="flex flex-col items-center group relative min-w-[70px]">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold transition-all duration-200 ${
                        isCompleted
                          ? "bg-[#0F1420] border border-[#0F1420] text-white"
                          : isActive
                          ? "bg-[#0F1420] border-2 border-[#0F1420] text-white ring-4 ring-[#C9A052]/20"
                          : "bg-white border border-[#E8E5DF] text-[#888888]"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      ) : (
                        <span>{step.number}</span>
                      )}
                    </div>
                    <span
                      className={`text-xs font-body tracking-tight transition-colors duration-200 ${
                        isActive
                          ? "text-[#0F1420] font-bold"
                          : isCompleted
                          ? "text-[#555555] font-medium"
                          : "text-[#888888] font-normal"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>

                  {/* Active Gold Underline */}
                  {isActive && (
                    <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-[#C9A052] rounded-full" />
                  )}
                </div>

                {/* Connecting Line */}
                {!isLast && (
                  <div className="flex-1 mx-2 sm:mx-3 h-[1.5px] bg-[#E8E5DF] relative">
                    <div
                      className="absolute inset-0 bg-[#0F1420] transition-all duration-300"
                      style={{
                        width: isCompleted ? "100%" : "0%",
                      }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
