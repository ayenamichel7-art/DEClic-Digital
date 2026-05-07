import React from 'react';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-[100] transition-all duration-500 py-6 px-4 lg:px-20">
      <div className="max-w-7xl mx-auto glass-premium rounded-full px-8 py-4 flex justify-between items-center border border-white/10 shadow-2xl">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-brand-pink blur-md opacity-20 group-hover:opacity-40 transition"></div>
            <img src="logo.png?v=1.1" alt="Logo" className="h-10 w-10 object-contain relative z-10" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white uppercase">DECLIC DIGITAL</span>
        </Link>
        
        <div className="hidden lg:flex items-center gap-8 font-bold uppercase text-xs tracking-widest text-white/70">
          <a href="#vision" className="hover:text-white transition-colors">La Vision</a>
          <a href="#packages" className="hover:text-white transition-colors">Tarifs</a>
          <Link href="/admin" className="px-6 py-3 glass-premium rounded-full hover:bg-white/10 transition-all border border-white/20">Connexion</Link>
        </div>

        {/* Mobile Trigger */}
        <div className="lg:hidden">
          <button className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};
