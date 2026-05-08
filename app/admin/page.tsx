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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProduct, setFilterProduct] = useState('All');

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/tickets');
      
      if (response.status === 401) {
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

  // Logic pour filtrer et rechercher localement
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.phone.includes(searchTerm) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterProduct === 'All' || ticket.product === filterProduct;
    
    return matchesSearch && matchesFilter;
  });

  const toggleCheckIn = async (ticketId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    
    // Optimistic UI update
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, checked_in: newStatus } as any : t));

    try {
      const response = await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde du pointage');
      }
    } catch (err: any) {
      alert(err.message);
      // Revert UI on failure
      setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, checked_in: currentStatus } as any : t));
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 lg:p-8 font-sans">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-[1400px] h-[90vh] flex overflow-hidden border border-gray-100">
        
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-100 flex flex-col py-8 px-6 flex-shrink-0 bg-white z-10 hidden lg:flex">
          <div className="flex items-center gap-3 mb-10">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-pink blur-md opacity-20"></div>
              <img src="/logo.png" alt="Logo" className="h-8 w-8 object-contain relative z-10" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">DEClic Digital</span>
          </div>
          
          <p className="text-[10px] font-bold text-gray-400 mb-4 px-2 tracking-widest uppercase">Menu Principal</p>
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
          <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Dashboard Admin</h1>
              <p className="text-sm text-gray-500 font-medium">Contrôlez vos ventes et gérez les entrées.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="relative group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-pink transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input 
                  type="text" 
                  placeholder="Chercher un nom, email..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-11 pr-6 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium focus:ring-2 focus:ring-brand-pink/20 focus:border-brand-pink outline-none transition-all w-64 shadow-sm"
                />
              </div>
              <select 
                value={filterProduct}
                onChange={(e) => setFilterProduct(e.target.value)}
                className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-semibold outline-none focus:ring-2 focus:ring-brand-pink/20 shadow-sm"
              >
                <option value="All">Tous les packs</option>
                <option value="Standard">Standard</option>
                <option value="VIP">VIP</option>
              </select>
              <a href="/api/export" className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                CSV
              </a>
              <button onClick={fetchDashboardData} className="px-5 py-2.5 bg-[#0F172A] text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors shadow-md flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                Refresh
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
              <p className="text-sm font-medium text-white/90 relative z-10">Total Inscrits</p>
              <h2 className="text-4xl font-bold tracking-tight relative z-10">{stats?.total_count || 0}</h2>
              <div className="text-[10px] text-white/80 bg-white/10 inline-flex px-2 py-1 rounded w-fit relative z-10 uppercase font-bold tracking-widest">Confirmés</div>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-40">
              <p className="text-sm font-semibold text-gray-500">Chiffre d'Affaires</p>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{(stats?.total_amount || 0).toLocaleString()} <span className="text-sm font-normal text-gray-400">FCFA</span></h2>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Cumul FedaPay</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-40">
              <p className="text-sm font-semibold text-gray-500">Pack Standard</p>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{stats?.by_product['Standard'] || 0}</h2>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider text-brand-pink font-bold">{((stats?.by_product['Standard'] || 0) * 10000).toLocaleString()} FCFA</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-40">
              <p className="text-sm font-semibold text-gray-500">Pack VIP</p>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{stats?.by_product['VIP'] || 0}</h2>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider text-brand-navy font-bold">{((stats?.by_product['VIP'] || 0) * 50000).toLocaleString()} FCFA</p>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col flex-1 min-h-[400px]">
            <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Liste des Participants <span className="text-sm font-medium text-gray-400 ml-2">({filteredTickets.length})</span></h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-[11px] font-bold uppercase tracking-wider border-b border-gray-100 bg-gray-50/50">
                    <th className="px-8 py-4">Participant</th>
                    <th className="px-8 py-4">Pack</th>
                    <th className="px-8 py-4">Montant</th>
                    <th className="px-8 py-4">Statut / Check-in</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="text-center py-20">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-200 border-r-brand-pink"></div>
                        <p className="mt-4 text-sm font-medium text-gray-400">Synchronisation...</p>
                      </td>
                    </tr>
                  ) : filteredTickets.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-20 text-gray-400 font-medium">Aucun participant ne correspond à votre recherche.</td>
                    </tr>
                  ) : (
                    filteredTickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-4">
                          <div className="font-bold text-gray-900">{ticket.name}</div>
                          <div className="text-xs text-gray-500 font-medium">{ticket.email}</div>
                          <div className="text-[10px] text-gray-400 font-mono mt-1">{ticket.id}</div>
                        </td>
                        <td className="px-8 py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                            ticket.product === 'VIP' ? 'bg-brand-navy/10 text-brand-navy' : 
                            'bg-brand-pink/10 text-brand-pink'
                          }`}>
                            {ticket.product}
                          </span>
                        </td>
                        <td className="px-8 py-4 font-bold text-gray-700">{ticket.amount.toLocaleString()} <span className="text-[10px] text-gray-400 font-normal">XOF</span></td>
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-3">
                            <span className={`w-2.5 h-2.5 rounded-full ${ (ticket as any).checked_in ? 'bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]' : 'bg-gray-300' }`}></span>
                            <span className={`text-xs font-bold uppercase tracking-wider ${ (ticket as any).checked_in ? 'text-green-600' : 'text-gray-400' }`}>
                              { (ticket as any).checked_in ? 'Présent' : 'Attendu' }
                            </span>
                          </div>
                          <div className="text-[10px] text-gray-400 mt-1">{new Date(ticket.timestamp).toLocaleDateString('fr-FR')} à {new Date(ticket.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div>
                        </td>
                        <td className="px-8 py-4 text-right">
                          <button 
                            onClick={() => toggleCheckIn(ticket.id, (ticket as any).checked_in)}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                              (ticket as any).checked_in 
                                ? 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500' 
                                : 'bg-brand-navy text-white hover:bg-brand-pink shadow-md'
                            }`}
                          >
                            { (ticket as any).checked_in ? 'Annuler' : 'Pointer' }
                          </button>
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