import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { HeroSection } from '@/components/HeroSection';

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

describe('HeroSection', () => {
  it('renders the CIVA heading', () => {
    render(<HeroSection />);
    expect(screen.getByText('CIVA')).toBeDefined();
  });

  it('renders CipherVault Protocol subtitle', () => {
    render(<HeroSection />);
    expect(screen.getByText(/CipherVault Protocol/i)).toBeDefined();
  });

  it('renders the main tagline', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Encrypted OTC Dark Pool/i)).toBeDefined();
  });

  it('renders the ENTER DARK POOL CTA', () => {
    render(<HeroSection />);
    expect(screen.getByText(/ENTER DARK POOL/i)).toBeDefined();
  });

  it('renders sponsor badges', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Encrypt SDK/i)).toBeDefined();
    expect(screen.getByText(/Ika Custody/i)).toBeDefined();
    expect(screen.getByText(/Adevar Audited/i)).toBeDefined();
  });

  it('renders stats labels', () => {
    render(<HeroSection />);
    expect(screen.getByText(/OTC Market Size/i)).toBeDefined();
    expect(screen.getByText(/MEV Extracted/i)).toBeDefined();
    expect(screen.getByText(/Settlement Time/i)).toBeDefined();
    expect(screen.getByText(/On-Chain Privacy/i)).toBeDefined();
  });

  it('renders the Civa logo image', () => {
    render(<HeroSection />);
    const img = screen.getByAltText('Civa');
    expect(img.getAttribute('src')).toBe('/icon.svg');
  });

  it('runs AnimatedStat counters when time advances', async () => {
    vi.useFakeTimers();
    render(<HeroSection />);
    expect(screen.getAllByText('0').length).toBeGreaterThan(0); // Initial state
    await act(async () => {
      vi.advanceTimersByTime(2000); // Trigger the initial setTimeout (delay)
    });
    await act(async () => {
      vi.advanceTimersByTime(2000); // Run the setInterval animations
    });
    expect(screen.getAllByText('100').length).toBeGreaterThan(0); // For 100B+ and 100%
    expect(screen.getByText('B+')).toBeDefined();
    expect(screen.getByText('10')).toBeDefined();
    expect(screen.getByText('s')).toBeDefined();
    expect(screen.getByText('%')).toBeDefined();
    vi.useRealTimers();
  });

  it('runs canvas particle animations', () => {
    vi.useFakeTimers();
    // Mock canvas context
    const mockContext = {
      scale: vi.fn(),
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
      fillStyle: '',
      strokeStyle: '',
      lineWidth: 0,
    };
    const getContextSpy = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(mockContext as unknown as CanvasRenderingContext2D);
    
    // Mock RAF
    let rafCallback: ((time: number) => void) | null = null;
    const rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      rafCallback = cb;
      return 1;
    });
    
    const { unmount } = render(<HeroSection />);
    
    // Advance timers
    vi.advanceTimersByTime(100);
    
    // Trigger RAF to run animate loop
    if (rafCallback) {
      (rafCallback as (time: number) => void)(100);
    }
    
    // Unmount to trigger cleanup
    unmount();
    
    expect(getContextSpy).toHaveBeenCalledWith('2d');
    expect(mockContext.clearRect).toHaveBeenCalled();
    
    getContextSpy.mockRestore();
    rafSpy.mockRestore();
    vi.useRealTimers();
  });
});
