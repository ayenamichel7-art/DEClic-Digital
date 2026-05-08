import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Vision } from '@/components/Vision';
import { Footer } from '@/components/Footer';
import { HomeClientWrapper } from '@/components/HomeClientWrapper';

export default function Page() {
  return (
    <div className="min-h-screen bg-brand-light text-brand-navy selection:bg-brand-pink/20">
      <Navbar />
      
      <main>
        <Hero />
        <Vision />
        <HomeClientWrapper />
      </main>

      <Footer />
    </div>
  );
}