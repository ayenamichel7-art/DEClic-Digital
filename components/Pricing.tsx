import React from 'react';

interface PricingProps {
  onSelectPackage: (name: string, price: number) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPackage }) => {
  const packages = [
    {
      name: 'Simple',
      price: 3000,
      label: 'Entrée',
      features: ['Accès Salle', 'Formation Live'],
      color: 'brand-pink',
      delay: '100'
    },
    {
      name: 'Standard',
      price: 5000,
      label: 'Croissance',
      features: ['Pass + Consultations', '4 contenus Formation', 'Wi‑Fi VIP'],
      color: 'brand-pink',
      recommended: true,
      delay: '200'
    },
    {
      name: 'Premium',
      price: 25000,
      label: 'Expert',
      features: ['Tout du Standard', '8 contenus supp.', 'Mentorat privé'],
      color: 'brand-navy',
      delay: '300'
    },
    {
      name: 'VIP',
      price: 50000,
      label: 'Elite',
      features: ['Tout du Premium', '18 contenus Bonus', 'Dîner Networking'],
      color: 'brand-navy',
      prestige: true,
      delay: '400'
    }
  ];

  return (
    <section id="packages" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24 space-y-4">
          <p className="text-brand-pink font-black text-xs uppercase tracking-[0.3em]">Investissement</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">CHOISISSEZ VOTRE <span className="text-gradient">PASS</span></h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg) => (
            <div 
              key={pkg.name}
              className={`glass-card p-10 rounded-[2.5rem] flex flex-col relative transition-all reveal delay-${pkg.delay} 
                ${pkg.recommended ? 'border-brand-pink/30 shadow-[0_0_50px_rgba(255,27,107,0.15)] transform lg:-translate-y-6' : ''}
                ${pkg.prestige ? 'border-brand-navy/30 shadow-[0_0_50px_rgba(69,202,255,0.15)] transform lg:-translate-y-6' : 'hover:border-brand-pink/30'}`}
            >
              {(pkg.recommended || pkg.prestige) && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-pink px-6 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
                  {pkg.recommended ? 'Recommandé' : 'Prestige'}
                </div>
              )}
              
              <div className="mb-10">
                <p className={`${pkg.recommended || pkg.prestige ? 'text-brand-pink' : 'text-white/40'} font-bold text-[10px] uppercase tracking-widest mb-2`}>{pkg.label}</p>
                <h4 className="text-2xl font-black uppercase">Pack {pkg.name}</h4>
              </div>
              
              <div className="flex items-baseline gap-2 mb-10">
                <span className={`text-5xl font-black ${pkg.recommended || pkg.prestige ? 'text-gradient' : ''}`}>{pkg.price.toLocaleString('fr-FR')}</span>
                <span className="text-white/40 text-xs font-bold uppercase">FCFA</span>
              </div>
              
              <ul className="space-y-6 mb-12 flex-grow">
                {pkg.features.map((feature, i) => (
                  <li key={i} className={`flex items-center gap-4 text-sm font-medium ${pkg.recommended || pkg.prestige ? 'text-white' : 'text-white/70'}`}>
                    <div className={`w-2 h-2 rounded-full ${pkg.color === 'brand-pink' ? 'bg-brand-pink shadow-[0_0_10px_#FF1B6B]' : 'bg-brand-navy shadow-[0_0_10px_#45CAFF]'}`}></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => onSelectPackage(pkg.name, pkg.price)} 
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl text-white
                  ${pkg.recommended ? 'bg-gradient-to-r from-brand-pink to-brand-navy hover:scale-105 shadow-2xl' : 
                    pkg.prestige ? 'bg-gradient-to-r from-brand-navy to-brand-pink hover:scale-105 shadow-2xl' : 
                    'glass-premium border border-white/10 hover:bg-brand-pink hover:border-brand-pink'}`}
              >
                {pkg.recommended ? 'Prendre Standard' : pkg.prestige ? 'Prendre VIP' : 'Choisir'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
