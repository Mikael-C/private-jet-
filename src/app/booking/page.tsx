"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Users, Check, Plane, CreditCard, User, ChevronRight, ChevronLeft, Info, Plus, X, Send } from "lucide-react";
import Image from "next/image";

const steps = [
  { id: 1, title: "Route Details", icon: MapPin },
  { id: 2, title: "Select Aircraft", icon: Plane },
  { id: 3, title: "Passenger Info", icon: User },
  { id: 4, title: "Review & Pay", icon: CreditCard },
];

const aircraftOptions = [
  {
    id: "light",
    name: "Light Jet",
    capacity: "4-6 Passengers",
    range: "1,500 nm",
    price: "$3,500/hr",
    image: "/images/jet-tarmac.jpg",
  },
  {
    id: "midsize",
    name: "Midsize Jet",
    capacity: "7-9 Passengers",
    range: "2,500 nm",
    price: "$5,200/hr",
    image: "/images/jet-luxury.jpg",
  },
  {
    id: "super-mid",
    name: "Super-Mid Jet",
    capacity: "8-10 Passengers",
    range: "3,500 nm",
    price: "$7,000/hr",
    image: "/images/jet-globe.jpg",
  },
  {
    id: "heavy",
    name: "Heavy Jet",
    capacity: "10-16 Passengers",
    range: "4,000+ nm",
    price: "$10,500/hr",
    image: "/images/jet-hangar.jpg",
  },
];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState<{sender: 'user' | 'agent', text: string, isAction?: boolean}[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [formData, setFormData] = useState({
    tripType: "One Way",
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    passengers: 1,
    aircraft: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    extras: {
      catering: false,
      transportation: false,
      hotel: false,
      luggage: false,
    },
    paymentMethod: "card",
    termsAccepted: false,
  });

  const updateForm = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (currentStep === 3) {
      setShowChatbot(true);
      const initialMessage = `Hi! I'd like to book a flight from ${formData.from || 'NYC'} to ${formData.to || 'LA'} on ${formData.departureDate || 'my selected date'}. We have ${formData.passengers} passengers.`;
      setChatMessages([{ sender: 'user', text: initialMessage }]);
      
      setTimeout(() => {
        setChatMessages(prev => [...prev, { sender: 'agent', text: "Hello! We've received your booking request. Let me calculate the final quote for you based on the requested route and aircraft. One moment please..." }]);
        
        setTimeout(() => {
            setChatMessages(prev => [...prev, { sender: 'agent', text: "The total estimated cost for your trip will be $38,650, including taxes and your selected extras. Does this work for you?" }]);
        }, 2000);
      }, 1000);
    } else if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    setChatMessages(prev => [...prev, { sender: 'user', text: chatInput }]);
    setChatInput("");
    
    // Simulate agent sending payment link
    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: 'agent', text: "Great! Click the button below to proceed to the secure payment and review screen.", isAction: true }]);
    }, 1000);
  };

  const slideVariants = {
    initial: { x: 50, opacity: 0 },
    enter: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { x: -50, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <main className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-jet-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-jet-950 dark:text-white mb-4">
            Book Your <span className="text-gold-gradient">Flight</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-body text-lg">
            Experience unparalleled luxury and convenience.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-jet-800 -translate-y-1/2 z-0 rounded-full"></div>
          <div
            className="absolute top-1/2 left-0 h-1 bg-gold transition-all duration-500 ease-in-out z-0 rounded-full"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
          <div className="relative z-10 flex justify-between">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-gold text-jet-950 shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                        : isCompleted
                        ? "bg-gold/20 text-gold border border-gold"
                        : "bg-white dark:bg-jet-900 text-slate-500 border border-jet-700"
                    }`}
                  >
                    {isCompleted ? <Check size={20} /> : <Icon size={20} />}
                  </div>
                  <span
                    className={`mt-3 text-sm font-medium ${
                      isActive || isCompleted ? "text-jet-950 dark:text-white" : "text-slate-500"
                    } hidden md:block`}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="glass-card p-6 md:p-10 relative overflow-hidden min-h-[500px]">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                variants={slideVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                className="space-y-8"
              >
                <h2 className="text-2xl font-display text-jet-950 dark:text-white mb-6">Route Details</h2>
                
                {/* Trip Type */}
                <div className="flex flex-wrap gap-4">
                  {["One Way", "Round Trip", "Multi City"].map((type) => (
                    <button
                      key={type}
                      onClick={() => updateForm("tripType", type)}
                      className={`px-6 py-2 rounded-full border transition-all ${
                        formData.tripType === type
                          ? "bg-gold text-jet-950 border-gold font-semibold"
                          : "bg-transparent text-slate-600 dark:text-slate-300 border-jet-700 hover:border-gold/50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* From / To */}
                  <div className="space-y-2">
                    <label className="text-sm text-slate-500 dark:text-slate-400 block">Departure</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60" size={20} />
                      <input
                        type="text"
                        placeholder="City or Airport Code"
                        className="w-full bg-white dark:bg-jet-900 border border-jet-800 rounded-lg py-3 pl-10 pr-4 text-jet-950 dark:text-white focus:outline-none focus:border-gold transition-colors"
                        value={formData.from}
                        onChange={(e) => updateForm("from", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-500 dark:text-slate-400 block">Destination</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60" size={20} />
                      <input
                        type="text"
                        placeholder="City or Airport Code"
                        className="w-full bg-white dark:bg-jet-900 border border-jet-800 rounded-lg py-3 pl-10 pr-4 text-jet-950 dark:text-white focus:outline-none focus:border-gold transition-colors"
                        value={formData.to}
                        onChange={(e) => updateForm("to", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="space-y-2">
                    <label className="text-sm text-slate-500 dark:text-slate-400 block">Departure Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60" size={20} />
                      <input
                        type="date"
                        className="w-full bg-white dark:bg-jet-900 border border-jet-800 rounded-lg py-3 pl-10 pr-4 text-jet-950 dark:text-white focus:outline-none focus:border-gold transition-colors"
                        value={formData.departureDate}
                        onChange={(e) => updateForm("departureDate", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {formData.tripType === "Round Trip" && (
                    <div className="space-y-2">
                      <label className="text-sm text-slate-500 dark:text-slate-400 block">Return Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60" size={20} />
                        <input
                          type="date"
                          className="w-full bg-white dark:bg-jet-900 border border-jet-800 rounded-lg py-3 pl-10 pr-4 text-jet-950 dark:text-white focus:outline-none focus:border-gold transition-colors"
                          value={formData.returnDate}
                          onChange={(e) => updateForm("returnDate", e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {/* Passengers */}
                  <div className="space-y-2">
                    <label className="text-sm text-slate-500 dark:text-slate-400 block">Passengers</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60" size={20} />
                      <select
                        className="w-full bg-white dark:bg-jet-900 border border-jet-800 rounded-lg py-3 pl-10 pr-4 text-jet-950 dark:text-white focus:outline-none focus:border-gold transition-colors appearance-none"
                        value={formData.passengers}
                        onChange={(e) => updateForm("passengers", parseInt(e.target.value))}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((num) => (
                          <option key={num} value={num}>
                            {num} Passenger{num > 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                variants={slideVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                className="space-y-6"
              >
                <h2 className="text-2xl font-display text-jet-950 dark:text-white mb-6">Select Aircraft</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {aircraftOptions.map((jet) => (
                    <div
                      key={jet.id}
                      onClick={() => updateForm("aircraft", jet.id)}
                      className={`glass-card-hover cursor-pointer overflow-hidden transition-all duration-300 border ${
                        formData.aircraft === jet.id ? "border-gold ring-1 ring-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]" : "border-jet-800"
                      }`}
                    >
                      <div className="relative h-48 w-full">
                        <Image src={jet.image} alt={jet.name} fill className="object-cover" />
                        {formData.aircraft === jet.id && (
                          <div className="absolute top-4 right-4 bg-gold text-jet-950 p-1 rounded-full">
                            <Check size={16} />
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-display font-semibold text-jet-950 dark:text-white mb-2">{jet.name}</h3>
                        <div className="grid grid-cols-2 gap-y-2 text-sm text-slate-600 dark:text-slate-300">
                          <div className="flex items-center gap-2">
                            <Users size={16} className="text-gold/70" /> {jet.capacity}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-gold/70" /> {jet.range}
                          </div>
                          <div className="col-span-2 mt-2 pt-2 border-t border-jet-800 flex justify-between items-center">
                            <span className="text-slate-500 dark:text-slate-400">Estimated</span>
                            <span className="text-lg text-gold font-semibold">{jet.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                variants={slideVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                className="space-y-8"
              >
                <h2 className="text-2xl font-display text-jet-950 dark:text-white mb-6">Passenger Info</h2>
                
                <div className="space-y-6">
                  <h3 className="text-lg text-gold font-medium border-b border-jet-800 pb-2">Lead Passenger</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full bg-white dark:bg-jet-900 border border-jet-800 rounded-lg py-3 px-4 text-jet-950 dark:text-white focus:outline-none focus:border-gold"
                      value={formData.firstName}
                      onChange={(e) => updateForm("firstName", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full bg-white dark:bg-jet-900 border border-jet-800 rounded-lg py-3 px-4 text-jet-950 dark:text-white focus:outline-none focus:border-gold"
                      value={formData.lastName}
                      onChange={(e) => updateForm("lastName", e.target.value)}
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full bg-white dark:bg-jet-900 border border-jet-800 rounded-lg py-3 px-4 text-jet-950 dark:text-white focus:outline-none focus:border-gold"
                      value={formData.email}
                      onChange={(e) => updateForm("email", e.target.value)}
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full bg-white dark:bg-jet-900 border border-jet-800 rounded-lg py-3 px-4 text-jet-950 dark:text-white focus:outline-none focus:border-gold"
                      value={formData.phone}
                      onChange={(e) => updateForm("phone", e.target.value)}
                    />
                  </div>
                  
                  <textarea
                    placeholder="Special Requests (Dietary, Accessibility, etc.)"
                    rows={3}
                    className="w-full bg-white dark:bg-jet-900 border border-jet-800 rounded-lg py-3 px-4 text-jet-950 dark:text-white focus:outline-none focus:border-gold resize-none"
                    value={formData.specialRequests}
                    onChange={(e) => updateForm("specialRequests", e.target.value)}
                  ></textarea>

                  <h3 className="text-lg text-gold font-medium border-b border-jet-800 pb-2 pt-4">Extras & Add-ons</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: "catering", label: "In-flight Catering" },
                      { id: "transportation", label: "Ground Transportation" },
                      { id: "hotel", label: "Hotel Booking" },
                      { id: "luggage", label: "Luggage Assistance" },
                    ].map((extra) => (
                      <label key={extra.id} className="flex items-center space-x-3 cursor-pointer p-4 bg-white dark:bg-jet-900 rounded-lg border border-jet-800 hover:border-gold/50 transition-colors">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-gold rounded border-jet-700 bg-slate-50 dark:bg-jet-950 focus:ring-gold focus:ring-offset-jet-900"
                          checked={formData.extras[extra.id as keyof typeof formData.extras]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              extras: { ...formData.extras, [extra.id]: e.target.checked },
                            })
                          }
                        />
                        <span className="text-slate-600 dark:text-slate-300">{extra.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                variants={slideVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                className="space-y-8"
              >
                <h2 className="text-2xl font-display text-jet-950 dark:text-white mb-6">Review & Pay</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  {/* Summary */}
                  <div className="lg:col-span-3 space-y-6">
                    <div className="bg-white dark:bg-jet-900 p-6 rounded-xl border border-jet-800 space-y-4">
                      <h3 className="text-lg text-gold font-semibold mb-4">Flight Summary</h3>
                      
                      <div className="flex flex-col sm:flex-row justify-between pb-4 border-b border-jet-800 gap-4">
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">From</p>
                          <p className="text-jet-950 dark:text-white font-medium">{formData.from || "Not specified"}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{formData.departureDate || "Date TBD"}</p>
                        </div>
                        <div className="flex items-center px-4">
                          <Plane className="text-gold opacity-50" size={24} />
                        </div>
                        <div className="sm:text-right">
                          <p className="text-sm text-slate-500 dark:text-slate-400">To</p>
                          <p className="text-jet-950 dark:text-white font-medium">{formData.to || "Not specified"}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{formData.tripType === "Round Trip" ? formData.returnDate : "One Way"}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Aircraft</p>
                          <p className="text-jet-950 dark:text-white capitalize">{formData.aircraft || "None selected"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Passengers</p>
                          <p className="text-jet-950 dark:text-white">{formData.passengers}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-jet-900 p-6 rounded-xl border border-jet-800">
                      <h3 className="text-lg text-gold font-semibold mb-4">Payment Method</h3>
                      <div className="flex gap-4">
                        <label className={`flex-1 border p-4 rounded-lg cursor-pointer flex items-center justify-center gap-2 transition-colors ${formData.paymentMethod === 'card' ? 'border-gold bg-gold/10' : 'border-jet-700 hover:border-gold/50'}`}>
                          <input type="radio" name="payment" className="hidden" checked={formData.paymentMethod === 'card'} onChange={() => updateForm('paymentMethod', 'card')} />
                          <CreditCard size={20} className={formData.paymentMethod === 'card' ? 'text-gold' : 'text-slate-500 dark:text-slate-400'} />
                          <span className={formData.paymentMethod === 'card' ? 'text-gold font-medium' : 'text-slate-600 dark:text-slate-300'}>Credit Card</span>
                        </label>
                        <label className={`flex-1 border p-4 rounded-lg cursor-pointer flex items-center justify-center gap-2 transition-colors ${formData.paymentMethod === 'wire' ? 'border-gold bg-gold/10' : 'border-jet-700 hover:border-gold/50'}`}>
                          <input type="radio" name="payment" className="hidden" checked={formData.paymentMethod === 'wire'} onChange={() => updateForm('paymentMethod', 'wire')} />
                          <span className={formData.paymentMethod === 'wire' ? 'text-gold font-medium' : 'text-slate-600 dark:text-slate-300'}>Wire Transfer</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-jet-900 p-6 rounded-xl border border-gold/30 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                      <h3 className="text-xl font-display text-jet-950 dark:text-white mb-6">Price Breakdown</h3>
                      
                      <div className="space-y-4 text-sm border-b border-jet-800 pb-6 mb-6">
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-300">Base Price (Est.)</span>
                          <span className="text-jet-950 dark:text-white">$35,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-300">Taxes & Fees</span>
                          <span className="text-jet-950 dark:text-white">$2,450</span>
                        </div>
                        {Object.values(formData.extras).some(Boolean) && (
                          <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-300">Selected Extras</span>
                            <span className="text-jet-950 dark:text-white">$1,200</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-end mb-8">
                        <span className="text-slate-600 dark:text-slate-300 font-medium">Total Estimate</span>
                        <span className="text-3xl font-display text-gold font-bold">$38,650</span>
                      </div>

                      <label className="flex items-start gap-3 mb-6 cursor-pointer">
                        <input
                          type="checkbox"
                          className="mt-1 form-checkbox h-4 w-4 text-gold rounded border-jet-700 bg-slate-50 dark:bg-jet-950"
                          checked={formData.termsAccepted}
                          onChange={(e) => updateForm("termsAccepted", e.target.checked)}
                        />
                        <span className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                          I agree to the Terms of Service and Cancellation Policy. I understand this is an estimate and final pricing will be confirmed.
                        </span>
                      </label>

                      <button
                        className="btn-gold w-full flex justify-center items-center gap-2 py-4 text-lg"
                        disabled={!formData.termsAccepted}
                      >
                        <Check size={20} />
                        Confirm Booking
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={prevStep}
            className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all ${
              currentStep === 1
                ? "opacity-0 pointer-events-none"
                : "text-slate-600 dark:text-slate-300 hover:text-jet-950 dark:text-white bg-white dark:bg-jet-900 hover:bg-jet-800"
            }`}
          >
            <ChevronLeft size={20} /> Back
          </button>
          
          {currentStep < 4 && (
            <button
              onClick={nextStep}
              className="btn-gold flex items-center gap-2"
            >
              Continue <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Chatbot Modal */}
      {showChatbot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-jet-950 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-jet-800 flex flex-col h-[500px]">
            {/* Header */}
            <div className="bg-gold p-4 flex justify-between items-center text-jet-950">
              <div>
                <h3 className="font-bold text-lg">Concierge Service</h3>
                <p className="text-xs opacity-80">Typically replies in minutes</p>
              </div>
              <button onClick={() => setShowChatbot(false)} className="hover:bg-black/10 p-1 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-jet-900">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 ${msg.sender === 'user' ? 'bg-jet-950 dark:bg-jet-800 text-white rounded-2xl rounded-tr-none' : 'bg-white dark:bg-jet-950 border border-jet-200 dark:border-jet-800 text-jet-950 dark:text-white rounded-2xl rounded-tl-none shadow-sm'}`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    {msg.isAction && (
                      <button 
                        onClick={() => {
                          setShowChatbot(false);
                          setCurrentStep(4);
                        }}
                        className="mt-3 w-full btn-gold py-2 px-4 rounded text-sm font-semibold flex justify-center items-center gap-2 bg-gold text-jet-950"
                      >
                        <CreditCard size={16} /> Pay & Review
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-jet-950 border-t border-jet-200 dark:border-jet-800 flex gap-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message..." 
                className="flex-1 bg-slate-100 dark:bg-jet-900 border-none rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold text-jet-950 dark:text-white"
              />
              <button type="submit" className="bg-gold text-jet-950 p-2 rounded-full hover:bg-gold/90 transition-colors">
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
