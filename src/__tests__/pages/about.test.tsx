import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/about/page';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('AboutPage', () => {
  it('renders the page heading', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { name: 'CipherVault' })).toBeDefined();
  });

  it('renders the subtitle', () => {
    render(<AboutPage />);
    expect(screen.getByText('Encrypted OTC Dark Pool')).toBeDefined();
  });

  it('renders the WHAT IT DOES section', () => {
    render(<AboutPage />);
    expect(screen.getByText('WHAT IT DOES')).toBeDefined();
  });

  it('renders the TECH STACK section', () => {
    render(<AboutPage />);
    expect(screen.getByText('TECH STACK')).toBeDefined();
  });

  it('renders all tech stack badges', () => {
    render(<AboutPage />);
    expect(screen.getByText('Next.js 16')).toBeDefined();
    expect(screen.getByText('React 19')).toBeDefined();
    expect(screen.getByText('Tailwind v4')).toBeDefined();
    expect(screen.getByText('TypeScript')).toBeDefined();
    expect(screen.getByText('Solana')).toBeDefined();
  });

  it('renders the HACKATHON section', () => {
    render(<AboutPage />);
    expect(screen.getByText('HACKATHON')).toBeDefined();
    expect(screen.getByText(/Colosseum Frontier Hackathon 2026/i)).toBeDefined();
  });

  it('has a back link to the dashboard', () => {
    render(<AboutPage />);
    const backLink = screen.getByRole('link', { name: /Back to Dashboard/i });
    expect(backLink.getAttribute('href')).toBe('/');
  });

  it('has a launch dashboard link', () => {
    render(<AboutPage />);
    const launchLink = screen.getByRole('link', { name: /Launch Dashboard/i });
    expect(launchLink.getAttribute('href')).toBe('/');
  });
});
