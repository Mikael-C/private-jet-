"use client";

import React, { useState, useRef, useEffect } from "react";
import { Plane, MapPin, X, Check, Building2, Mountain, Compass } from "lucide-react";
import { Airport, searchAirports, formatAirportDisplay } from "@/data/airports";

interface AirportAutocompleteProps {
  value: string;
  onChange: (value: string, airport?: Airport) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  id?: string;
  className?: string;
}

export default function AirportAutocomplete({
  value,
  onChange,
  placeholder = "Search airport, city, or code (e.g. FAB, NCE, TEB)",
  icon,
  id,
  className = "",
}: AirportAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Sync internal searchTerm when external value changes
  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  // Query results from airports data
  const results = searchAirports(searchTerm, 20);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    if (isOpen && listRef.current && listRef.current.children[highlightedIndex]) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement;
      item.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [highlightedIndex, isOpen]);

  const handleSelect = (airport: Airport) => {
    const formatted = formatAirportDisplay(airport);
    setSearchTerm(formatted);
    onChange(formatted, airport);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchTerm("");
    onChange("", undefined);
    setHighlightedIndex(0);
    inputRef.current?.focus();
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < results.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : results.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[highlightedIndex]) {
        handleSelect(results[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const getAirportTypeBadge = (type: Airport["type"]) => {
    switch (type) {
      case "dedicated":
        return {
          icon: <Building2 className="w-3 h-3 text-[#C9A052]" />,
          label: "Dedicated Private",
          bg: "bg-[#C9A052]/10 text-[#A67C2E] border-[#C9A052]/20",
        };
      case "altiport":
        return {
          icon: <Mountain className="w-3 h-3 text-cyan-600" />,
          label: "Alpine Altiport",
          bg: "bg-cyan-50 text-cyan-700 border-cyan-200",
        };
      case "airstrip":
        return {
          icon: <Compass className="w-3 h-3 text-emerald-600" />,
          label: "Private Airstrip",
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
        };
      default:
        return {
          icon: <Plane className="w-3 h-3 text-gray-500" />,
          label: "VIP FBO Terminal",
          bg: "bg-gray-100 text-gray-700 border-gray-200",
        };
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Input Field */}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C9A052]">
            {icon}
          </div>
        )}
        <input
          ref={inputRef}
          id={id}
          type="text"
          autoComplete="off"
          value={searchTerm}
          placeholder={placeholder}
          onFocus={() => {
            setIsOpen(true);
            setHighlightedIndex(0);
          }}
          onChange={(e) => {
            const val = e.target.value;
            setSearchTerm(val);
            onChange(val);
            setIsOpen(true);
            setHighlightedIndex(0);
          }}
          onKeyDown={handleKeyDown}
          className={`w-full bg-white border border-gray-200 rounded-xl ${
            icon ? "pl-10" : "pl-4"
          } pr-9 py-3.5 text-sm font-body text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#C9A052] focus:ring-1 focus:ring-[#C9A052] transition-all shadow-sm`}
        />

        {/* Clear Button */}
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            title="Clear airport selection"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200/80 z-50 overflow-hidden backdrop-blur-md animate-in fade-in-0 zoom-in-95 duration-150">
          {/* Header Bar */}
          <div className="px-4 py-2.5 bg-[#F5F2EC]/80 border-b border-gray-100 flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase font-body text-gray-500">
            <span>
              {searchTerm.trim()
                ? `Matching Locations (${results.length})`
                : "Popular Private Hubs & Airstrips"}
            </span>
            <span className="text-[10px] text-gray-400 lowercase font-normal">
              Search by code, city or runway
            </span>
          </div>

          {/* List of Airports */}
          <ul
            ref={listRef}
            className="max-h-72 overflow-y-auto divide-y divide-gray-50 scrollbar-thin scrollbar-thumb-gray-200"
            role="listbox"
          >
            {results.length > 0 ? (
              results.map((airport, index) => {
                const isSelected =
                  value.toLowerCase().includes(airport.iata.toLowerCase()) ||
                  value.toLowerCase() === formatAirportDisplay(airport).toLowerCase();
                const isHighlighted = index === highlightedIndex;
                const badge = getAirportTypeBadge(airport.type);

                return (
                  <li
                    key={airport.id}
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onClick={() => handleSelect(airport)}
                    className={`px-4 py-3 cursor-pointer transition-colors flex items-center justify-between gap-3 ${
                      isHighlighted
                        ? "bg-[#F5F2EC]"
                        : isSelected
                        ? "bg-amber-50/50"
                        : "hover:bg-gray-50/80"
                    }`}
                  >
                    {/* Left: Airport Info */}
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="mt-0.5 w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 text-gray-600 border border-gray-200/60">
                        {airport.type === "altiport" ? (
                          <Mountain className="w-3.5 h-3.5 text-cyan-600" />
                        ) : airport.type === "airstrip" ? (
                          <Compass className="w-3.5 h-3.5 text-emerald-600" />
                        ) : airport.type === "dedicated" ? (
                          <Building2 className="w-3.5 h-3.5 text-[#C9A052]" />
                        ) : (
                          <Plane className="w-3.5 h-3.5 text-gray-500" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-[#0F1420] truncate">
                            {airport.city}
                          </span>
                          <span className="text-xs text-gray-500 truncate">
                            — {airport.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-gray-400">
                            {airport.country}
                          </span>
                          <span className="text-gray-300 text-[10px]">•</span>
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${badge.bg}`}
                          >
                            {badge.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: IATA & ICAO Code Badges */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="text-right">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-[#0F1420] text-[#C9A052] font-mono text-xs font-bold shadow-sm tracking-wide">
                          {airport.iata}
                        </span>
                        <span className="block text-[10px] font-mono text-gray-400 tracking-wider">
                          {airport.icao}
                        </span>
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-[#C9A052] shrink-0" />
                      )}
                    </div>
                  </li>
                );
              })
            ) : (
              <li className="px-5 py-8 text-center text-sm text-gray-500">
                <p className="font-semibold text-gray-800 mb-1">
                  No airports or airstrips found
                </p>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Try searching by 3-letter IATA code (e.g.{" "}
                  <span className="font-mono text-[#0F1420] font-medium">
                    FAB, NCE, TEB, DXB
                  </span>
                  ), city name, or ICAO code.
                </p>
              </li>
            )}
          </ul>

          {/* Footer info tip */}
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 text-[11px] text-gray-500 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              190+ Global private jet FBOs, airports & airstrips
            </span>
            <span className="text-[10px] text-gray-400 hidden sm:inline">
              Use ↑ ↓ to navigate, Enter to select
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
