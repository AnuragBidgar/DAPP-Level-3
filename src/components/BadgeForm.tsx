import React, { useState } from 'react';
import { Loader } from './Loader';
import { PlusCircle } from 'lucide-react';

interface BadgeFormProps {
  onAddBadge: (skillName: string, issuer: string, category: string) => Promise<void>;
  isAdding: boolean;
}

export const BadgeForm: React.FC<BadgeFormProps> = ({ onAddBadge, isAdding }) => {
  const [skillName, setSkillName] = useState('');
  const [issuer, setIssuer] = useState('');
  const [category, setCategory] = useState('Development');

  const categories = ['Development', 'Design', 'Marketing', 'Product', 'Community', 'Other'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillName.trim() || !issuer.trim()) return;
    await onAddBadge(skillName.trim(), issuer.trim(), category);
    setSkillName('');
    setIssuer('');
    setCategory('Development');
  };

  return (
    <div className="glass-panel form-card">
      <h2 className="form-title">
        <PlusCircle size={24} color="var(--primary)" />
        Issue New Badge
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="skillName">Skill Name</label>
          <input
            id="skillName"
            type="text"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            placeholder="e.g. Advanced React Patterns"
            disabled={isAdding}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select 
            id="category" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            disabled={isAdding}
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="issuer">Issuer Identity</label>
          <input
            id="issuer"
            type="text"
            value={issuer}
            onChange={(e) => setIssuer(e.target.value)}
            placeholder="e.g. Meta Certification"
            disabled={isAdding}
            required
          />
        </div>
        <button type="submit" className="btn-primary" disabled={isAdding || !skillName.trim() || !issuer.trim()}>
          {isAdding ? <Loader /> : 'Mint Badge'}
        </button>
      </form>
    </div>
  );
};
