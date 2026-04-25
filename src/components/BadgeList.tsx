import React, { useState } from 'react';
import type { Badge } from '../utils/api';
import { Award, CheckCircle, Search, Filter, Send } from 'lucide-react';

interface BadgeListProps {
  badges: Badge[];
  onTransfer: (id: string, destinationAddress: string) => Promise<void>;
}

export const BadgeList: React.FC<BadgeListProps> = ({ badges, onTransfer }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [transferringId, setTransferringId] = useState<string | null>(null);
  const [destinationAddress, setDestinationAddress] = useState('');

  const categories = Array.from(new Set(badges.map(b => b.category || 'Other')));

  const filteredBadges = badges
    .filter(b => b.skillName.toLowerCase().includes(searchTerm.toLowerCase()) || b.issuer.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(b => selectedCategory ? (b.category || 'Other') === selectedCategory : true)
    .sort((a, b) => b.timestamp - a.timestamp);

  const handleTransferClick = (id: string) => {
    setTransferringId(id);
    setDestinationAddress('');
  };

  const submitTransfer = async (id: string) => {
    if (!destinationAddress.trim()) return;
    await onTransfer(id, destinationAddress.trim());
    setTransferringId(null);
    setDestinationAddress('');
  };

  if (badges.length === 0) {
    return (
      <div className="empty-state">
        <Award size={64} className="empty-icon" />
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>No badges yet</h3>
        <p style={{ color: 'var(--text-muted)' }}>Mint your first skill badge to start building your on-chain portfolio.</p>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="toolbar glass-panel" style={{ padding: '1rem 1.5rem' }}>
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search skills or issuers..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <Filter size={18} style={{ color: 'var(--text-muted)', margin: 'auto 0.5rem auto 0' }} />
          <button 
            className={`filter-chip ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {categories.map(cat => (
            <button 
              key={cat}
              className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredBadges.length === 0 ? (
        <div className="empty-state">
          <p>No badges found matching your criteria.</p>
        </div>
      ) : (
        <div className="badges-grid">
          {filteredBadges.map((badge) => (
            <div key={badge.id} className="badge-card" data-testid="badge-item">
              <div className="badge-header">
                <div className="badge-icon-wrapper">
                  <Award size={28} color="var(--primary)" />
                </div>
                <span className="category-tag">{badge.category || 'Other'}</span>
              </div>
              <h3 className="badge-skill">{badge.skillName}</h3>
              <p className="badge-issuer">
                <CheckCircle size={14} color="var(--accent-2)" />
                {badge.issuer}
              </p>
              
              <div className="badge-footer">
                <span>Minted on</span>
                <span>{new Date(badge.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </div>
              
              <div style={{ marginTop: '1rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
                {transferringId === badge.id ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <input 
                      type="text" 
                      placeholder="Destination Address" 
                      value={destinationAddress}
                      onChange={(e) => setDestinationAddress(e.target.value)}
                      style={{ padding: '0.5rem', fontSize: '0.85rem' }}
                    />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => submitTransfer(badge.id)} 
                        className="btn-primary" 
                        style={{ padding: '0.5rem', fontSize: '0.85rem', flex: 1 }}
                      >
                        Confirm
                      </button>
                      <button 
                        onClick={() => setTransferringId(null)} 
                        className="wallet-btn" 
                        style={{ padding: '0.5rem', fontSize: '0.85rem', flex: 1, justifyContent: 'center' }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleTransferClick(badge.id)} 
                    className="wallet-btn" 
                    style={{ width: '100%', justifyContent: 'center', gap: '0.5rem' }}
                  >
                    <Send size={16} /> Share Badge
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
