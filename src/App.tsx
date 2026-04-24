import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BadgeForm } from './components/BadgeForm';
import { BadgeList } from './components/BadgeList';
import { connectWallet } from './utils/wallet';
import { getBadges, saveBadge, getStats } from './utils/api';
import type { Badge } from './utils/api';
import { CheckCircle2, Award, Users, ShieldCheck } from 'lucide-react';

function App() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  
  const [stats, setStats] = useState({ totalBadges: 0, uniqueUsers: 0 });

  useEffect(() => {
    getStats().then(setStats);
  }, []);

  useEffect(() => {
    if (walletAddress) {
      getBadges(walletAddress).then(setBadges);
    }
  }, [walletAddress]);

  const handleConnect = async () => {
    setIsConnecting(true);
    const address = await connectWallet();
    if (address) {
      setWalletAddress(address);
    }
    setIsConnecting(false);
  };

  const handleAddBadge = async (skillName: string, issuer: string, category: string) => {
    if (!walletAddress) return;
    setIsAdding(true);
    
    const newBadge = await saveBadge(walletAddress, { skillName, issuer, category: category || 'Development' } as any);
    if (newBadge) {
      setBadges(prev => [...prev, newBadge]);
      setSuccessMsg('Badge minted successfully!');
      setTimeout(() => setSuccessMsg(''), 4000);
      getStats().then(setStats);
    }
    
    setIsAdding(false);
  };

  return (
    <>
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="app-wrapper">
        <Navbar 
          walletAddress={walletAddress} 
          onConnect={handleConnect} 
          isConnecting={isConnecting} 
        />

        {!walletAddress ? (
          <main className="hero">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(79, 70, 229, 0.2)', padding: '0.5rem 1rem', borderRadius: '2rem', marginBottom: '2rem', color: 'var(--text-main)', fontSize: '0.9rem' }}>
              <ShieldCheck size={16} color="var(--primary)" />
              Powered by Freighter & Node.js Backend
            </div>
            
            <h1 className="hero-title">Proof of Skill</h1>
            <p className="hero-subtitle">Mint, verify, and showcase your professional achievements on-chain with beautiful, verifiable digital credentials.</p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '4rem' }}>
              <button className="btn-primary" onClick={handleConnect} disabled={isConnecting} style={{ width: 'auto' }}>
                {isConnecting ? 'Connecting...' : 'Connect Wallet to Start'}
              </button>
              <button className="wallet-btn" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })} style={{ width: 'auto' }}>
                Learn More
              </button>
            </div>

            <div className="dashboard-layout" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', width: '100%', maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}>
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <Award size={32} color="var(--accent-1)" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{stats.totalBadges}+ Badges Minted</h3>
                <p style={{ color: 'var(--text-muted)' }}>Join a growing ecosystem of professionals authenticating their skills globally.</p>
              </div>
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <Users size={32} color="var(--accent-2)" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{stats.uniqueUsers} Active Users</h3>
                <p style={{ color: 'var(--text-muted)' }}>Wallets connected and actively expanding their on-chain portfolios.</p>
              </div>
            </div>
          </main>
        ) : (
          <main className="dashboard-layout">
            <aside className="sidebar">
              <div className="glass-panel profile-card">
                <div className="avatar">
                  {walletAddress.slice(1, 3)}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Your Identity</h3>
                <p style={{ color: 'var(--accent-2)', fontSize: '0.9rem', marginBottom: '1rem', fontFamily: 'monospace' }}>
                  {`${walletAddress.slice(0, 8)}...${walletAddress.slice(-6)}`}
                </p>
                <div className="profile-stats">
                  <div className="stat">
                    <span className="stat-val">{badges.length}</span>
                    <span className="stat-label">Badges</span>
                  </div>
                  <div className="stat">
                    <span className="stat-val">
                      Lv.{Math.floor(badges.length / 5) + 1}
                    </span>
                    <span className="stat-label">Level</span>
                  </div>
                </div>
              </div>
              
              <BadgeForm onAddBadge={handleAddBadge} isAdding={isAdding} />
            </aside>
            
            <section>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white' }}>Portfolio</h2>
                <span className="category-tag" style={{ background: 'rgba(236, 72, 153, 0.2)', color: '#fbcfe8' }}>
                  Network Stats: {stats.totalBadges} Global Badges
                </span>
              </div>
              <BadgeList badges={badges} />
            </section>
          </main>
        )}
      </div>

      {successMsg && (
        <div className="toast">
          <CheckCircle2 size={20} />
          {successMsg}
        </div>
      )}
    </>
  );
}

export default App;
