import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="py-32 relative overflow-hidden bg-brand-dark w-full">
      <div className="absolute inset-0 bg-mesh opacity-30"></div>
      <div className="container mx-auto px-10 relative z-10">
        <div className="grid md:grid-cols-4 gap-20 pb-20 border-b border-white/5">
          <div className="col-span-2 space-y-10">
            <Link href="/" className="flex items-center gap-3">
              <img src="logo.png?v=1.1" alt="Logo" className="h-10 w-10 object-contain" />
              <span className="text-3xl font-black tracking-tighter uppercase text-white">DECLIC DIGITAL</span>
            </Link>
            <p className="text-white/40 max-w-sm leading-relaxed text-lg font-light">
              Le point de bascule de votre business. Rejoignez-nous pour redéfinir les standards de la vente en ligne au Bénin.
            </p>
          </div>
          <div className="space-y-8">
            <h4 className="font-bold uppercase tracking-widest text-xs text-brand-pink">Navigation</h4>
            <ul className="space-y-4 text-white/50 font-medium">
              <li><a href="#vision" className="hover:text-white transition-colors">La Vision</a></li>
              <li><a href="#packages" className="hover:text-white transition-colors">Tarifs</a></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Espace Admin</Link></li>
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
          <p className="text-white/20 text-xs font-medium uppercase tracking-[0.2em]">© 2026 DEClic Digital. Built for the Elite.</p>
          <div className="flex gap-6 opacity-30">
            {/* Social Icons placeholder */}
          </div>
        </div>
      </div>
    </footer>
  );
};
