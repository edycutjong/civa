import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

vi.mock('@/components/HeroSection', () => ({
  HeroSection: () => <div data-testid="hero-section" />,
}));
vi.mock('@/components/ComparisonSplitScreen', () => ({
  ComparisonSplitScreen: () => <div data-testid="comparison-split" />,
}));
vi.mock('@/components/OrderCreator', () => ({
  OrderCreator: () => <div data-testid="order-creator" />,
}));
vi.mock('@/components/LiquidityBoard', () => ({
  LiquidityBoard: () => <div data-testid="liquidity-board" />,
}));
vi.mock('@/components/StatusBar', () => ({
  StatusBar: () => <div data-testid="status-bar" />,
}));
vi.mock('@/components/Footer', () => ({
  Footer: () => <div data-testid="footer" />,
}));

import Home from '@/app/page';

describe('Home page', () => {
  it('renders all major sections', () => {
    render(<Home />);
    expect(screen.getByTestId('hero-section')).toBeDefined();
    expect(screen.getByTestId('order-creator')).toBeDefined();
    expect(screen.getByTestId('liquidity-board')).toBeDefined();
    expect(screen.getByTestId('status-bar')).toBeDefined();
    expect(screen.getByTestId('footer')).toBeDefined();
  });

  it('renders the trading terminal heading', () => {
    render(<Home />);
    expect(screen.getByText(/Trading Terminal/i)).toBeDefined();
  });

  it('renders the HOW IT WORKS section', () => {
    render(<Home />);
    expect(screen.getByText('HOW IT WORKS')).toBeDefined();
  });

  it('renders all four process steps', () => {
    render(<Home />);
    expect(screen.getByText('Encrypt Order')).toBeDefined();
    expect(screen.getByText('Blind Match')).toBeDefined();
    expect(screen.getByText('Atomic Settle')).toBeDefined();
    expect(screen.getByText('Private Close')).toBeDefined();
  });

  it('renders the THE PRIVACY GAP section', () => {
    render(<Home />);
    expect(screen.getByText('THE PRIVACY GAP')).toBeDefined();
  });

  it('renders the Connect Wallet button', () => {
    render(<Home />);
    expect(screen.getByRole('button', { name: /Connect Wallet/i })).toBeDefined();
  });

  it('handles mouse events on feature cards (TiltCard and FeatureCard)', () => {
    // Mock getBoundingClientRect to return non-zero dimensions
    const originalGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect;
    HTMLElement.prototype.getBoundingClientRect = () => ({
      width: 200,
      height: 200,
      left: 10,
      top: 10,
      bottom: 210,
      right: 210,
      x: 10,
      y: 10,
      toJSON: () => {}
    });

    render(<Home />);
    
    // Triggering event on an inner element will bubble up to TiltCard and FeatureCard
    const stepElement = screen.getByText('Encrypt Order');
    
    // Fire mouse move
    fireEvent.mouseMove(stepElement, { clientX: 100, clientY: 100 });
    
    // Fire mouse leave
    fireEvent.mouseLeave(stepElement);

    // Restore mock
    HTMLElement.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  });
});
