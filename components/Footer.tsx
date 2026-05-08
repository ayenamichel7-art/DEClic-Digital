import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="py-32 relative overflow-hidden bg-brand-navy w-full">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-pink/30 to-transparent"></div>
      <div className="container mx-auto px-10 relative z-10">
        <div className="grid md:grid-cols-4 gap-20 pb-20 border-b border-white/10">
          <div className="col-span-2 space-y-10">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
              <span className="text-3xl font-black tracking-tighter uppercase text-white">DECLIC DIGITAL</span>
            </Link>
            <p className="text-white/50 max-w-sm leading-relaxed text-lg font-light">
              Le point de bascule de votre business. Rejoignez-nous pour redéfinir les standards de la vente en ligne au Bénin.
            </p>
          </div>
          <div className="space-y-8">
            <h4 className="font-bold uppercase tracking-widest text-xs text-brand-pink">Navigation</h4>
            <ul className="space-y-4 text-white/50 font-medium">
              <li><a href="#vision" className="hover:text-white transition-colors">La Vision</a></li>
              <li><a href="#packages" className="hover:text-white transition-colors">Tarifs</a></li>
            </ul>
          </div>
          <div className="space-y-8">
            <h4 className="font-bold uppercase tracking-widest text-xs text-brand-pink">Contact</h4>
            <div className="space-y-4 text-white/50 font-medium">
              <p>(+229) 01 52 29 26 30</p>
              <p>Cotonou, Bénin</p>
            </div>
          </div>
        </div>
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-xs font-medium uppercase tracking-[0.2em]">© 2026 DEClic Digital. Built for the Elite.</p>
        </div>
      </div>
    </footer>
  );
};
