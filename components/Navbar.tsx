"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <nav className="fixed top-0 w-full z-[100] transition-all duration-500 py-6 px-4 lg:px-20">
      <div className="max-w-7xl mx-auto glass-premium rounded-full px-8 py-4 flex justify-between items-center shadow-lg">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-brand-pink blur-md opacity-20 group-hover:opacity-40 transition"></div>
            <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain relative z-10" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-brand-navy uppercase">DECLIC DIGITAL</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 font-bold uppercase text-xs tracking-widest text-brand-navy/60">
          <a href="#vision" className="hover:text-brand-pink transition-colors">La Vision</a>
          <a href="#packages" className="hover:text-brand-pink transition-colors">Tarifs</a>
          <a href="#packages" className="px-6 py-3 bg-brand-pink text-white rounded-full hover:bg-brand-navy transition-all shadow-md uppercase text-xs font-black tracking-widest">Prendre mon Pass</a>
        </div>

        {/* Mobile Trigger */}
        <div className="lg:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="text-brand-navy p-2 rounded-xl hover:bg-brand-navy/5 transition-colors"
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden mt-4 max-w-7xl mx-auto bg-white rounded-3xl border border-brand-navy/10 shadow-2xl overflow-hidden transition-all duration-500 ${
          mobileMenuOpen 
            ? 'max-h-80 opacity-100 p-6' 
            : 'max-h-0 opacity-0 p-0 border-transparent'
        }`}
      >
        <div className="flex flex-col gap-4 font-bold uppercase text-sm tracking-widest">
          <a href="#vision" onClick={closeMobile} className="text-brand-navy/60 hover:text-brand-pink transition-colors py-3 border-b border-brand-navy/5">La Vision</a>
          <a href="#packages" onClick={closeMobile} className="text-brand-navy/60 hover:text-brand-pink transition-colors py-3 border-b border-brand-navy/5">Tarifs</a>
          <a href="#packages" onClick={closeMobile} className="mt-2 py-4 bg-brand-pink text-white text-center rounded-2xl shadow-lg shadow-brand-pink/20 hover:scale-[1.02] transition-transform text-xs tracking-widest font-black uppercase">
            Prendre mon Pass
          </a>
        </div>
      </div>
    </nav>
  );
};
