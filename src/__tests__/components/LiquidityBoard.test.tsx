import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LiquidityBoard } from '@/components/LiquidityBoard';

describe('LiquidityBoard', () => {
  it('renders the panel heading', () => {
    render(<LiquidityBoard />);
    expect(screen.getByText(/DARK POOL LIQUIDITY/i)).toBeDefined();
  });

  it('renders all three order rows', () => {
    render(<LiquidityBoard />);
    expect(screen.getByText('ORD-001')).toBeDefined();
    expect(screen.getByText('ORD-002')).toBeDefined();
    expect(screen.getByText('ORD-003')).toBeDefined();
  });

  it('renders table column headers', () => {
    render(<LiquidityBoard />);
    expect(screen.getByText(/Order ID/i)).toBeDefined();
    expect(screen.getByText(/Asset/i)).toBeDefined();
    expect(screen.getByText(/Status/i)).toBeDefined();
  });

  it('shows both SELL and BUY order types', () => {
    render(<LiquidityBoard />);
    expect(screen.getAllByText('SELL').length).toBeGreaterThan(0);
    expect(screen.getAllByText('BUY').length).toBeGreaterThan(0);
  });

  it('shows ACTIVE status badges', () => {
    render(<LiquidityBoard />);
    expect(screen.getAllByText('ACTIVE').length).toBe(3);
  });

  it('shows liquidity band labels', () => {
    render(<LiquidityBoard />);
    expect(screen.getByText(/Visible Band/i)).toBeDefined();
  });
});
