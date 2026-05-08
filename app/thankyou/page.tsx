"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface TicketData {
  id: string;
  name: string;
  product: string;
  amount: number;
}

function ThankYouContent() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get('id');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [ticket, setTicket] = useState<TicketData | null>(null);

  useEffect(() => {
    if (!transactionId) {
      setStatus('error');
      return;
    }

    let attempts = 0;
    const maxAttempts = 12; // 1 minute (5s * 12)

    const poll = async () => {
      try {
        const response = await fetch(`/api/verify?id=${transactionId}`);
        if (response.ok) {
          const data = await response.json();
          setTicket(data);
          setStatus('success');
          return;
        }
      } catch (e) {
        console.error("Polling error:", e);
      }

      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(poll, 5000); // Check every 5 seconds
      } else {
        setStatus('error');
      }
    };

    poll();
  }, [transactionId]);

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
        <div className={`p-12 text-center text-white relative ${status === 'error' ? 'bg-red-500' : 'bg-brand-dark'}`}>
          <div className="relative z-10">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20">
              {status === 'loading' && <span className="text-4xl animate-bounce">⏳</span>}
              {status === 'success' && <span className="text-4xl animate-pulse">✅</span>}
              {status === 'error' && <span className="text-4xl">❌</span>}
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {status === 'loading' && "Vérification en cours"}
              {status === 'success' && "Paiement Confirmé !"}
              {status === 'error' && "Un problème est survenu"}
            </h1>
            <p className="text-white/60">
              {status === 'loading' && "Nous validons votre transaction auprès de FedaPay..."}
              {status === 'success' && `Merci ${ticket?.name}, votre inscription est validée.`}
              {status === 'error' && "Nous n'avons pas pu confirmer votre paiement automatiquement."}
            </p>
          </div>
        </div>

        <div className="p-12">
          {status === 'success' && ticket && (
            <>
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 mb-10 text-center">
                <div className="flex flex-col items-center">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(ticket.id)}`} 
                    alt="Ticket QR Code"
                    className="mb-6 rounded-xl shadow-lg bg-white p-4 w-48 h-48"
                  />
                  <p className="text-brand-pink font-bold text-sm tracking-widest uppercase">{ticket.id}</p>
                  <div className="text-center mt-4 font-black text-brand-dark uppercase tracking-tight">
                    PASS {ticket.product} • {ticket.amount.toLocaleString()} XOF
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 text-blue-700 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <p>Un email de confirmation contenant votre ticket a été envoyé à l'adresse fournie lors de l'inscription.</p>
                </div>
                <Link href="/" className="w-full py-4 bg-brand-pink text-white font-bold rounded-2xl shadow-lg block text-center uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform">
                  Retour à l'accueil
                </Link>
              </div>
            </>
          )}

          {status === 'error' && (
            <div className="text-center space-y-6">
              <p className="text-gray-500">Si vous avez été débité, ne vous inquiétez pas. Notre équipe vérifie manuellement chaque transaction.</p>
              <div className="flex flex-col gap-3">
                <Link href="/" className="w-full py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl block text-center uppercase tracking-widest text-xs">
                  Retour à l'accueil
                </Link>
                <a href="https://wa.me/2290152292630" className="w-full py-4 bg-green-500 text-white font-bold rounded-2xl block text-center uppercase tracking-widest text-xs shadow-lg">
                  Contacter le support (WhatsApp)
                </a>
              </div>
            </div>
          )}

          {status === 'loading' && (
            <div className="py-20 text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-brand-pink border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-8 text-sm font-bold text-gray-400 uppercase tracking-widest">Attente de confirmation...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-dark flex items-center justify-center text-white font-black uppercase tracking-[0.5em] animate-pulse">Chargement...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}