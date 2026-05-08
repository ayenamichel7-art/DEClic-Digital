import React, { useState } from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: { name: string; price: number } | null;
  onSubmit: (formData: { fullName: string; email: string; phone: string }) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, selectedPackage, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Le nom doit contenir au moins 2 caractères.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Veuillez entrer une adresse email valide.';
    }

    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (digitsOnly.length < 8) {
      newErrors.phone = 'Le numéro doit contenir au moins 8 chiffres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box max-w-md rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl">
        {/* Modal Header */}
        <div className="bg-brand-dark p-8 text-white relative">
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-white/50 hover:text-white">✕</button>
          <div className="w-12 h-12 bg-brand-pink rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-brand-pink/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </div>
          <h3 className="font-bold text-2xl uppercase tracking-tight">Finalisez votre inscription</h3>
          <p className="text-brand-pink font-bold text-sm mt-1 uppercase tracking-widest">{selectedPackage?.name}</p>
        </div>

        {/* Modal Body */}
        <div className="p-8 bg-white">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-400 tracking-wider ml-1">Nom complet</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-pink transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <input 
                  type="text" 
                  value={formData.fullName}
                  onChange={(e) => { setFormData({ ...formData, fullName: e.target.value }); setErrors(prev => ({ ...prev, fullName: '' })); }}
                  placeholder="Ex: Jean Dupont" 
                  className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-2xl focus:bg-white focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/5 outline-none transition-all font-medium text-brand-dark ${errors.fullName ? 'border-red-400' : 'border-gray-100'}`}
                  required 
                />
              </div>
              {errors.fullName && <p className="text-red-500 text-xs font-medium ml-1">{errors.fullName}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-400 tracking-wider ml-1">Adresse Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-pink transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setErrors(prev => ({ ...prev, email: '' })); }}
                  placeholder="votre@email.com" 
                  className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-2xl focus:bg-white focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/5 outline-none transition-all font-medium text-brand-dark ${errors.email ? 'border-red-400' : 'border-gray-100'}`}
                  required 
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs font-medium ml-1">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-400 tracking-wider ml-1">Téléphone (WhatsApp)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-pink transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); setErrors(prev => ({ ...prev, phone: '' })); }}
                  placeholder="+229 01 00 00 00" 
                  className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-2xl focus:bg-white focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/5 outline-none transition-all font-medium text-brand-dark ${errors.phone ? 'border-red-400' : 'border-gray-100'}`}
                  required 
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs font-medium ml-1">{errors.phone}</p>}
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full py-4 bg-brand-pink hover:bg-brand-pink/90 text-white font-bold rounded-2xl shadow-lg shadow-brand-pink/30 transform active:scale-[0.98] transition-all uppercase tracking-widest flex items-center justify-center gap-3">
                Confirmer et Payer
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </button>
              <div className="flex items-center justify-center gap-2 mt-6 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                <span className="text-[10px] uppercase font-bold tracking-widest">Paiement 100% sécurisé via FedaPay</span>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}>
        <button className="cursor-default">close</button>
      </div>
    </div>
  );
};
