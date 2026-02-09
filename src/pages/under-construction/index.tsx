import React, { useState } from 'react';
import { ArrowRight, X, Loader2, CheckCircle2 } from 'lucide-react';

function UnderConstruction() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // This calls the serverless function we will create in Step 2
      const res = await fetch('/api/join-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setPhone('');
    } catch (error) {
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white font-sans selection:bg-white selection:text-black">
      
      {/* Background & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2670&auto=format&fit=crop"
          alt="Background"
          className="h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 w-full p-8 md:p-12 z-20 flex justify-between items-center">
        <span className="text-sm md:text-base font-bold tracking-[0.25em] uppercase text-white">
          Vehico.
        </span>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <h1 className="max-w-4xl text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-white leading-[0.95] mb-8">
          Seamless.<br />
          <span className="text-white/40">Secure.</span>
        </h1>

        <p className="max-w-lg text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-12">
          Vehicle Registration & Renewal via WhatsApp.<br />
          The new standard for Nigerian mobility.
        </p>

        {/* Trigger Button */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center gap-3 text-sm font-medium tracking-widest uppercase transition-all hover:text-white/80"
        >
          <span className="border-b border-white/30 pb-1 transition-colors group-hover:border-white">
            Join the Waitlist
          </span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full p-8 md:p-12 z-20 flex justify-center md:justify-end">
        <p className="text-[10px] font-medium tracking-[0.2em] text-white/30 uppercase">
          Lagos — 2026
        </p>
      </footer>

      {/* --- THE MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop Blur */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-neutral-900 border border-white/10 p-10 shadow-2xl">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in duration-300">
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-6" />
                <h3 className="text-2xl font-medium tracking-tight text-white mb-2">You're on the list.</h3>
                <p className="text-neutral-400">We'll message you when we launch.</p>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="mt-8 text-sm text-white/60 hover:text-white border-b border-transparent hover:border-white transition-all"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div>
                  <h3 className="text-2xl font-medium tracking-tight text-white mb-2">Get Early Access</h3>
                  <p className="text-neutral-400 text-sm">Be the first to skip the queue.</p>
                </div>

                <div className="relative group">
                  <input 
                    type="tel" 
                    required
                    placeholder="WhatsApp Number (e.g. 080...)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-xl text-white outline-none placeholder:text-neutral-700 focus:border-white transition-colors"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-white text-black font-bold py-4 hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "NOTIFY ME"}
                </button>
                
                {status === 'error' && (
                  <p className="text-red-500 text-xs text-center">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default UnderConstruction;