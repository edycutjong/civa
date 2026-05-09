import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusBar } from '@/components/StatusBar';

describe('StatusBar', () => {
  it('renders the devnet live indicator', () => {
    render(<StatusBar />);
    expect(screen.getByText(/Devnet Live/i)).toBeDefined();
  });

  it('renders the tech stack info', () => {
    render(<StatusBar />);
    expect(screen.getByText(/Next\.js 16/i)).toBeDefined();
  });

  it('renders protocol names', () => {
    render(<StatusBar />);
    expect(screen.getByText(/Solana.*Encrypt.*Ika.*Adevar/i)).toBeDefined();
  });
});
