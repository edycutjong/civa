import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/Footer';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('Footer', () => {
  it('renders the brand name', () => {
    render(<Footer />);
    expect(screen.getByText('CIVA')).toBeDefined();
  });

  it('renders the About link pointing to /about', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /about/i });
    expect(link.getAttribute('href')).toBe('/about');
  });

  it('renders the GitHub link', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /github/i })).toBeDefined();
  });

  it('renders the Twitter/X handle', () => {
    render(<Footer />);
    expect(screen.getByText(/@edycutjong/i)).toBeDefined();
  });

  it('renders the hackathon credit', () => {
    render(<Footer />);
    expect(screen.getByText(/Colosseum Frontier 2026/i)).toBeDefined();
  });
});
