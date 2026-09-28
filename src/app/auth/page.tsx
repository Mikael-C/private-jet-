"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, User, Phone, ArrowRight, Plane } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen flex">
      {/* Left Half - Image (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-50 dark:bg-jet-950">
        <Image
          src="/images/jet-globe.jpg"
          alt="Luxury Private Jet"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-jet-950/80 to-transparent"></div>
        <div className="relative z-10 p-16 flex flex-col justify-between h-full">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 group">
              <Plane className="text-gold group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" size={32} />
              <span className="text-2xl font-display font-bold text-jet-950 dark:text-white tracking-widest">JET<span className="text-gold">ELITE</span></span>
            </Link>
          </div>
          <div>
            <h1 className="text-5xl font-display text-jet-950 dark:text-white mb-6 leading-tight">
              Your journey<br />
              <span className="text-gold-gradient">begins here.</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-md">
              Access your personalized dashboard, manage your bookings, and experience seamless travel with JetElite.
            </p>
          </div>
        </div>
      </div>

      {/* Right Half - Form */}
      <div className="w-full lg:w-1/2 bg-slate-50 dark:bg-jet-950 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 relative overflow-y-auto">
        {/* Mobile Logo */}
        <div className="lg:hidden mb-12 flex justify-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <Plane className="text-gold" size={28} />
            <span className="text-2xl font-display font-bold text-jet-950 dark:text-white tracking-widest">JET<span className="text-gold">ELITE</span></span>
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto">
          {/* Tabs */}
          <div className="flex border-b border-jet-800 mb-8 relative">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 pb-4 text-lg font-medium transition-colors ${isLogin ? "text-jet-950 dark:text-white" : "text-slate-500 hover:text-slate-600 dark:text-slate-300"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 pb-4 text-lg font-medium transition-colors ${!isLogin ? "text-jet-950 dark:text-white" : "text-slate-500 hover:text-slate-600 dark:text-slate-300"}`}
            >
              Create Account
            </button>
            
            {/* Active Tab Indicator */}
            <div 
              className="absolute bottom-0 h-0.5 bg-gold transition-all duration-300 ease-out"
              style={{ width: "50%", left: isLogin ? "0%" : "50%" }}
            />
          </div>

          {/* Form Content */}
          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60" size={20} />
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="input-luxury w-full pl-12"
                      />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60" size={20} />
                      <input 
                        type="password" 
                        placeholder="Password" 
                        className="input-luxury w-full pl-12"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="form-checkbox h-4 w-4 text-gold rounded border-jet-700 bg-slate-50 dark:bg-jet-950 focus:ring-gold focus:ring-offset-jet-900" />
                      <span className="text-sm text-slate-600 dark:text-slate-300">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-gold hover:text-gold-light transition-colors">
                      Forgot Password?
                    </a>
                  </div>

                  <button className="btn-gold w-full flex justify-center items-center gap-2 py-4 text-lg">
                    Sign In <ArrowRight size={20} />
                  </button>

                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60" size={20} />
                      <input 
                        type="text" 
                        placeholder="Full Name" 
                        className="input-luxury w-full pl-12"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60" size={20} />
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="input-luxury w-full pl-12"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60" size={20} />
                      <input 
                        type="tel" 
                        placeholder="Phone Number" 
                        className="input-luxury w-full pl-12"
                      />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60" size={20} />
                      <input 
                        type="password" 
                        placeholder="Password" 
                        className="input-luxury w-full pl-12"
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 form-checkbox h-4 w-4 text-gold rounded border-jet-700 bg-slate-50 dark:bg-jet-950 focus:ring-gold focus:ring-offset-jet-900" />
                    <span className="text-sm text-slate-500 dark:text-slate-400 leading-tight">
                      I agree to the <a href="#" className="text-gold">Terms of Service</a> and <a href="#" className="text-gold">Privacy Policy</a>.
                    </span>
                  </label>

                  <button className="btn-gold w-full flex justify-center items-center gap-2 py-4 text-lg">
                    Create Account <ArrowRight size={20} />
                  </button>

                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Social Auth */}
          <div className="mt-10 pt-8 border-t border-jet-800">
            <p className="text-center text-sm text-slate-500 mb-6">Or continue with</p>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-white dark:bg-jet-900 border border-jet-800 hover:border-gold/50 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <Image src="https://authjs.dev/img/providers/google.svg" alt="Google" width={20} height={20} />
                <span className="text-jet-950 dark:text-white text-sm">Google</span>
              </button>
              <button className="bg-white dark:bg-jet-900 border border-jet-800 hover:border-gold/50 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <Image src="https://authjs.dev/img/providers/apple.svg" alt="Apple" width={20} height={20} className="invert" />
                <span className="text-jet-950 dark:text-white text-sm">Apple</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
