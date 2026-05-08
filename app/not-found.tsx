import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center p-6">
      <div className="text-center max-w-lg space-y-8">
        <div className="space-y-4">
          <p className="text-8xl font-black text-gradient">404</p>
          <h1 className="text-3xl font-bold text-brand-navy">Page introuvable</h1>
          <p className="text-brand-gray text-lg">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>
        <Link 
          href="/" 
          className="inline-block px-10 py-4 bg-brand-pink text-white font-bold rounded-full shadow-lg shadow-brand-pink/30 hover:scale-105 transition-all uppercase tracking-widest text-sm"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
