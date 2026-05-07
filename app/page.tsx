"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Vision } from '@/components/Vision';
import { Pricing } from '@/components/Pricing';
import { Footer } from '@/components/Footer';
import { CheckoutModal } from '@/components/CheckoutModal';

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{ name: string; price: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelectPackage = (name: string, price: number) => {
    setSelectedPackage({ name, price });
    setIsModalOpen(true);
  };

  const handleCheckoutSubmit = async (formData: { fullName: string; email: string; phone: string }) => {
    if (!selectedPackage) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          product: selectedPackage.name,
          amount: selectedPackage.price,
          name: formData.fullName // Map fullName to name for the API
        }),
      });

      const data = await response.json();

      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        alert("Erreur lors de la création de la transaction : " + (data.error || "Inconnu"));
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Une erreur est survenue lors de la connexion au service de paiement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-pink/30">
      <Navbar />
      
      <main>
        <Hero />
        <Vision />
        <Pricing onSelectPackage={handleSelectPackage} />
      </main>

      <Footer />

      <CheckoutModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedPackage={selectedPackage}
        onSubmit={handleCheckoutSubmit}
      />

      {loading && (
        <div className="fixed inset-0 z-[200] bg-brand-dark/80 backdrop-blur-md flex flex-col items-center justify-center">
          <div className="w-20 h-20 border-4 border-brand-pink border-t-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-xl font-black uppercase tracking-widest animate-pulse">Initialisation du paiement...</p>
        </div>
      )}
    </div>
  );
}