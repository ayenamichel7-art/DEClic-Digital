"use client";

import React, { useState, useEffect } from 'react';
import { Pricing } from '@/components/Pricing';
import { CheckoutModal } from '@/components/CheckoutModal';

interface HomeClientWrapperProps {
  // Any server-rendered content passed as children if needed, 
  // but here we just wrap the interactive parts.
}

export function HomeClientWrapper() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{ name: string; price: number } | null>(null);
  const [loading, setLoading] = useState(false);

  // Activation des animations reveal au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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
          name: formData.fullName
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
    <>
      <Pricing onSelectPackage={handleSelectPackage} />
      
      <CheckoutModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedPackage={selectedPackage}
        onSubmit={handleCheckoutSubmit}
      />

      {loading && (
        <div className="fixed inset-0 z-[200] bg-white/80 backdrop-blur-md flex flex-col items-center justify-center">
          <div className="w-20 h-20 border-4 border-brand-pink border-t-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-xl font-black uppercase tracking-widest animate-pulse text-brand-navy">Initialisation du paiement...</p>
        </div>
      )}
    </>
  );
}
