import React from 'react';
import { Wallet, Hexagon } from 'lucide-react';
import { Loader } from './Loader';

interface NavbarProps {
  walletAddress: string | null;
  onConnect: () => void;
  isConnecting: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ walletAddress, onConnect, isConnecting }) => {
  return (
    <header className="header glass-panel">
      <div className="logo">
        <Hexagon size={32} className="logo-icon" />
        Proof of Skill
      </div>
      <div>
        {walletAddress ? (
          <button className="wallet-btn active" disabled>
            <Wallet size={16} />
            {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
          </button>
        ) : (
          <button className="wallet-btn" onClick={onConnect} disabled={isConnecting}>
            {isConnecting ? <Loader /> : (
              <>
                <Wallet size={16} />
                Connect Wallet
              </>
            )}
          </button>
        )}
      </div>
    </header>
  );
};
