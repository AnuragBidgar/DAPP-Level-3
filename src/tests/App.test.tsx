import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import * as WalletUtils from '../utils/wallet';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the wallet utils
vi.mock('../utils/wallet', () => ({
  connectWallet: vi.fn(),
}));

describe('Proof of Skill App', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders landing page initially', () => {
    render(<App />);
    expect(screen.getByText('Mint, verify, and showcase your professional achievements on-chain with beautiful, verifiable digital credentials.')).toBeInTheDocument();
  });

  it('connects wallet and shows dashboard', async () => {
    (WalletUtils.connectWallet as any).mockResolvedValue('GDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
    
    render(<App />);
    
    const connectButton = screen.getAllByText(/Connect Wallet to Start/i)[0];
    fireEvent.click(connectButton);

    await waitFor(() => {
      expect(screen.getByText('Issue New Badge')).toBeInTheDocument();
      expect(screen.getByText('Portfolio')).toBeInTheDocument();
    });
  });

  it('adds a badge successfully', async () => {
    (WalletUtils.connectWallet as any).mockResolvedValue('GDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
    
    render(<App />);
    
    // Connect wallet
    const connectButton = screen.getAllByText(/Connect Wallet to Start/i)[0];
    fireEvent.click(connectButton);

    await waitFor(() => {
      expect(screen.getByText('Issue New Badge')).toBeInTheDocument();
    });

    // Fill form
    const skillInput = screen.getByLabelText(/Skill Name/i);
    const issuerInput = screen.getByLabelText(/Issuer Identity/i);
    const submitButton = screen.getByRole('button', { name: /Mint Badge/i });

    fireEvent.change(skillInput, { target: { value: 'React' } });
    fireEvent.change(issuerInput, { target: { value: 'Meta' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Badge minted successfully!')).toBeInTheDocument();
      const badgeSkill = screen.getByText('React');
      expect(badgeSkill).toBeInTheDocument();
      const badgeIssuer = screen.getByText(/Meta/i);
      expect(badgeIssuer).toBeInTheDocument();
    });
  });
});
