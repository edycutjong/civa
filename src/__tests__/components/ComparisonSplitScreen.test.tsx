import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ComparisonSplitScreen } from '@/components/ComparisonSplitScreen';

describe('ComparisonSplitScreen', () => {
  it('renders the public explorer panel', () => {
    render(<ComparisonSplitScreen />);
    expect(screen.getByText(/PUBLIC EXPLORER/i)).toBeDefined();
  });

  it('renders the Civa dark desk panel', () => {
    render(<ComparisonSplitScreen />);
    expect(screen.getByText(/CIVA DARK DESK/i)).toBeDefined();
  });

  it('shows encrypted state blob in public view', () => {
    render(<ComparisonSplitScreen />);
    expect(screen.getByText(/ENCRYPTED_STATE_BLOB/i)).toBeDefined();
  });

  it('shows decrypted order details in private view', () => {
    render(<ComparisonSplitScreen />);
    expect(screen.getByText(/SELL 12,000 SOL/i)).toBeDefined();
  });

  it('shows the ZKP visible band in public view', () => {
    render(<ComparisonSplitScreen />);
    expect(screen.getByText(/Liquidity Band: \$1M - \$5M/i)).toBeDefined();
  });

  it('shows the execution price in private view', () => {
    render(<ComparisonSplitScreen />);
    expect(screen.getByText(/\$175\.50/)).toBeDefined();
  });

  it('shows counterparty labels in private view', () => {
    render(<ComparisonSplitScreen />);
    expect(screen.getByText(/Maker Alpha/i)).toBeDefined();
    expect(screen.getByText(/Taker Delta/i)).toBeDefined();
  });
});
