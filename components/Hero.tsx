import React from 'react';

export const Hero = () => {
  return (
    <header className="min-h-screen flex items-center pt-32 pb-20 relative overflow-hidden">
      {/* Floating Ambient Orbs */}
      <div className="absolute top-[10%] -left-20 w-[500px] h-[500px] bg-brand-pink/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[10%] -right-20 w-[400px] h-[400px] bg-brand-navy/20 rounded-full blur-[100px] animate-pulse"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 text-center lg:text-left space-y-10">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass-premium border border-white/10 text-brand-pink font-bold text-xs uppercase tracking-widest animate-float">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-pink opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-pink"></span>
              </span>
              20 JUIN 2026 • COTONOU, BÉNIN
            </div>
            
            <h1 className="text-4xl md:text-7xl font-black leading-[1.1] tracking-tight uppercase">
              APPRENDRE À VENDRE <br /> EFFICACEMENT <br />
              <span className="text-gradient">SUR INTERNET</span>
            </h1>
            
            <p className="text-xl text-white/60 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              L'événement de référence pour propulser votre entreprise. Apprenez les stratégies qui génèrent des résultats concrets et rejoignez l'élite du commerce en ligne.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-6">
              <a href="#packages" className="px-12 py-5 bg-brand-pink text-white font-black rounded-full shadow-[0_0_40px_rgba(255,27,107,0.4)] hover:scale-105 transition-all uppercase tracking-widest text-sm">Prendre mon Pass</a>
              <a href="#vision" className="px-12 py-5 glass-premium border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all uppercase tracking-widest text-sm">Voir la vision</a>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/20 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-700">
              <img src="hero.png" alt="DEClic Digital" className="w-full grayscale hover:grayscale-0 transition-all duration-700 scale-110 hover:scale-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-60"></div>
            </div>
            {/* Experience Card */}
            <div className="absolute -bottom-10 -left-10 glass-card p-8 rounded-3xl z-20 animate-float">
              <p className="text-4xl font-black text-gradient">+500</p>
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mt-1">Participants Attendus</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
