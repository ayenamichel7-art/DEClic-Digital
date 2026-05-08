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
    <section id="packages" className="py-20 md:py-32 relative bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24 space-y-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-brand-navy">CHOISISSEZ VOTRE <span className="text-gradient">PASS</span></h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg) => (
            <div 
              key={pkg.name}
              className={`glass-card p-10 rounded-[2.5rem] flex flex-col relative reveal delay-${pkg.delay} border-2 border-brand-navy/15 hover:border-brand-navy/40 transition-all`}
            >
              
              <div className="mb-10">
                <p className="text-brand-pink font-bold text-[10px] uppercase tracking-widest mb-2">{pkg.label}</p>
                <h4 className="text-2xl font-black uppercase text-brand-navy">Pack {pkg.name}</h4>
              </div>
              
              <div className="flex items-baseline gap-2 mb-10">
                <span className="text-5xl font-black text-brand-navy">{pkg.price.toLocaleString('fr-FR')}</span>
                <span className="text-xs font-bold uppercase text-brand-gray">FCFA</span>
              </div>
              
              <ul className="space-y-6 mb-12 flex-grow">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-4 text-sm font-medium text-brand-navy/70">
                    <div className="w-2 h-2 rounded-full bg-brand-pink shadow-[0_0_10px_#FF1B6B]"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => onSelectPackage(pkg.name, pkg.price)} 
                className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all cursor-pointer bg-brand-navy/5 border border-brand-navy/10 text-brand-navy hover:bg-brand-pink hover:text-white hover:border-brand-pink hover:shadow-lg hover:shadow-brand-pink/20"
              >
                Choisir
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
