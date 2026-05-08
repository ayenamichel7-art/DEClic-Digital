import React from 'react';

export const Vision = () => {
  return (
    <section id="vision" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 space-y-12">
            <div className="space-y-4">
              <p className="text-brand-pink font-black text-xs uppercase tracking-[0.3em]">Vision 2026</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-brand-navy">UNE EXPÉRIENCE <br /> <span className="text-brand-gray/40">TRANSFORMATRICE</span></h2>
            </div>
            <p className="text-xl text-brand-gray leading-relaxed font-light">
              Plus qu'une simple formation, DEClic Digital est un catalyseur de croissance. Nous formons aux techniques modernes de vente sur Internet pour vous aider à générer des revenus pérennes.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <p className="text-gradient text-4xl font-black">100%</p>
                <p className="text-xs font-bold text-brand-gray uppercase tracking-widest">Pratique</p>
              </div>
              <div className="space-y-2">
                <p className="text-gradient text-4xl font-black">24/7</p>
                <p className="text-xs font-bold text-brand-gray uppercase tracking-widest">Accompagnement</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Objectives */}
            <div className="glass-card p-10 rounded-[2rem] reveal delay-100">
              <div className="w-14 h-14 bg-gradient-to-br from-brand-pink to-brand-pink/60 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-brand-pink/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h4 className="text-xl font-bold mb-4 uppercase text-brand-navy">Vente en ligne</h4>
              <p className="text-sm text-brand-gray leading-relaxed">Maîtrisez les tunnels de vente et la psychologie d'achat sur internet.</p>
            </div>

            <div className="glass-card p-10 rounded-[2rem] reveal delay-200">
              <div className="w-14 h-14 bg-gradient-to-br from-brand-navy to-brand-navy/60 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-brand-navy/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h4 className="text-xl font-bold mb-4 uppercase text-brand-navy">Génération de Revenus</h4>
              <p className="text-sm text-brand-gray leading-relaxed">Stratégies concrètes pour transformer votre audience en clients fidèles.</p>
            </div>

            <div className="glass-card p-10 rounded-[2rem] reveal delay-300">
              <div className="w-14 h-14 bg-gradient-to-br from-brand-pink to-purple-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-purple-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <h4 className="text-xl font-bold mb-4 uppercase text-brand-navy">Networking</h4>
              <p className="text-sm text-brand-gray leading-relaxed">Connectez-vous avec les leaders du marché et créez des partenariats.</p>
            </div>

            <div className="glass-card p-10 rounded-[2rem] reveal delay-400">
              <div className="w-14 h-14 bg-gradient-to-br from-brand-navy to-brand-pink rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-brand-navy/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              </div>
              <h4 className="text-xl font-bold mb-4 uppercase text-brand-navy">Marketing Digital</h4>
              <p className="text-sm text-brand-gray leading-relaxed">Exploitez les outils de pointe pour automatiser votre croissance.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
