"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Ticket {
  id: string;
  feda_id: string;
  product: string;
  amount: number;
  email: string;
  name: string;
  phone: string;
  timestamp: string;
}

interface Stats {
  total_count: number;
  total_amount: number;
  by_product: Record<string, number>;
}

export default function AdminPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/tickets');
      
      if (response.status === 401) {
        // Browser handles Basic Auth via WWW-Authenticate header
        // If we're here, it means the user cancelled or failed auth
        setError("Authentification requise");
        return;
      }

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }

      const data = await response.json();
      setTickets(data.tickets);
      setStats(data.stats);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 lg:p-8">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-[1400px] h-[90vh] flex overflow-hidden border border-gray-100">
        
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-100 flex flex-col py-8 px-6 flex-shrink-0 bg-white z-10 hidden lg:flex">
          <div className="flex items-center gap-3 mb-10">
            <img src="/logo.png" alt="Logo" className="h-8 w-8 object-contain" />
            <span className="text-xl font-bold tracking-tight text-gray-900">DEClic Digital</span>
          </div>
          
          <p className="text-[10px] font-bold text-gray-400 mb-4 px-2 tracking-widest uppercase">Menu</p>
          <nav className="space-y-1 flex-1">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-brand-pink/10 text-brand-pink rounded-2xl font-semibold relative transition-all">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-brand-pink rounded-r-full"></div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              Dashboard
            </Link>
            <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-2xl font-medium transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              Voir le site
            </Link>
          </nav>

          <div className="mt-auto space-y-4">
            <button 
              onClick={() => {
                // Trick pour se déconnecter du Basic Auth
                const url = window.location.origin.replace('//', '//logout:logout@');
                window.location.href = url + '/admin';
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-2xl font-medium transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Se déconnecter
            </button>

            <div className="bg-gray-900 rounded-2xl p-5 text-white relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-brand-pink/20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80]"></div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-green-400">Live</span>
                </div>
                <p className="text-xs font-medium text-gray-300">Supabase Sync</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50/50 p-6 lg:p-10 overflow-y-auto relative">
          
          {/* Header */}
          <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Dashboard Admin</h1>
              <p className="text-sm text-gray-500 font-medium">Gérez vos ventes de tickets en temps réel.</p>
            </div>
            <div className="flex gap-3">
              <a href="/api/export" className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Export CSV
              </a>
              <button onClick={fetchDashboardData} className="px-5 py-2.5 bg-[#0F172A] text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors shadow-md flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                Actualiser
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-8 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {error}
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-brand-pink rounded-3xl p-6 text-white pink-glow relative overflow-hidden flex flex-col justify-between h-40">
              <p className="text-sm font-medium text-white/90 relative z-10">Total Tickets</p>
              <h2 className="text-4xl font-bold tracking-tight relative z-10">{stats?.total_count || 0}</h2>
              <div className="text-[10px] text-white/80 bg-white/10 inline-flex px-2 py-1 rounded w-fit relative z-10 uppercase font-bold tracking-widest">Inscriptions</div>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-40">
              <p className="text-sm font-semibold text-gray-500">Revenus Totaux</p>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{(stats?.total_amount || 0).toLocaleString()} <span className="text-sm font-normal text-gray-400">FCFA</span></h2>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Cumul des ventes</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-40">
              <p className="text-sm font-semibold text-gray-500">Pack Standard</p>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{stats?.by_product['Standard'] || 0}</h2>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Ventes</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-40">
              <p className="text-sm font-semibold text-gray-500">Pack VIP</p>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{stats?.by_product['VIP'] || 0}</h2>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Ventes</p>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col flex-1 min-h-[400px]">
            <div className="px-8 py-5 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Dernières Inscriptions</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-[11px] font-bold uppercase tracking-wider border-b border-gray-100 bg-gray-50/50">
                    <th className="px-8 py-4">Client</th>
                    <th className="px-8 py-4">Produit</th>
                    <th className="px-8 py-4">Montant</th>
                    <th className="px-8 py-4">Contact</th>
                    <th className="px-8 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="text-center py-20">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-200 border-r-brand-pink"></div>
                        <p className="mt-4 text-sm font-medium text-gray-400">Chargement des données...</p>
                      </td>
                    </tr>
                  ) : tickets.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-20 text-gray-400">Aucun ticket trouvé.</td>
                    </tr>
                  ) : (
                    tickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-4">
                          <div className="font-bold text-gray-900">{ticket.name}</div>
                          <div className="text-[10px] text-gray-400 font-mono uppercase">{ticket.id}</div>
                        </td>
                        <td className="px-8 py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                            ticket.product === 'VIP' ? 'bg-brand-navy/10 text-brand-navy' : 
                            ticket.product === 'Premium' ? 'bg-purple-100 text-purple-600' :
                            'bg-brand-pink/10 text-brand-pink'
                          }`}>
                            {ticket.product}
                          </span>
                        </td>
                        <td className="px-8 py-4 font-bold text-gray-700">{ticket.amount.toLocaleString()} <span className="text-[10px] text-gray-400">XOF</span></td>
                        <td className="px-8 py-4">
                          <div className="text-xs text-gray-600">{ticket.email}</div>
                          <div className="text-xs text-gray-400">{ticket.phone}</div>
                        </td>
                        <td className="px-8 py-4 text-xs text-gray-500">
                          {new Date(ticket.timestamp).toLocaleString('fr-FR')}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}