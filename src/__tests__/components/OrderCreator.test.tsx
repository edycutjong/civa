import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { OrderCreator } from '@/components/OrderCreator';

const mockSubmit = vi.hoisted(() => vi.fn());

vi.mock('@/lib/adevar', () => ({
  adevarService: {
    submitEncryptedOrder: mockSubmit,
  },
}));

describe('OrderCreator', () => {
  beforeEach(() => {
    mockSubmit.mockReset();
    mockSubmit.mockResolvedValue('ORD-MOCK-1234');
  });

  it('renders the panel heading', () => {
    render(<OrderCreator />);
    expect(screen.getByText(/NEW OTC OFFER/i)).toBeDefined();
  });

  it('renders asset input with default value SOL', () => {
    render(<OrderCreator />);
    expect(screen.getByDisplayValue('SOL')).toBeDefined();
  });

  it('renders amount input with default value', () => {
    render(<OrderCreator />);
    expect(screen.getByDisplayValue('12,000')).toBeDefined();
  });

  it('renders the liquidity band selector', () => {
    render(<OrderCreator />);
    expect(screen.getByDisplayValue('$1M - $5M')).toBeDefined();
  });

  it('renders the submit button', () => {
    render(<OrderCreator />);
    expect(screen.getByRole('button', { name: /ENCRYPT & SUBMIT/i })).toBeDefined();
  });

  it('shows ZK proof generation message on submit', async () => {
    render(<OrderCreator />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/GENERATING ZK PROOF/i)).toBeDefined();
  });

  it('disables button while submitting', async () => {
    render(<OrderCreator />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect((button as HTMLButtonElement).disabled).toBe(true);
  });

  it('shows submitted order ID after successful submission', async () => {
    render(<OrderCreator />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByText(/SUBMITTED: ORD-MOCK-1234/i)).toBeDefined();
    });
  });

  it('calls submitEncryptedOrder with correct default params', async () => {
    render(<OrderCreator />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith('SOL', '12,000', '$1M - $5M');
    });
  });

  it('resets button text after 3 seconds', async () => {
    vi.useFakeTimers();
    render(<OrderCreator />);
    const button = screen.getByRole('button');
    
    await act(async () => {
      fireEvent.click(button);
    });

    // Flush the mock promise microtask queue
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    
    expect(screen.getByText(/SUBMITTED: ORD-MOCK-1234/i)).toBeDefined();
    
    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000);
    });
    
    expect(screen.getByText(/ENCRYPT & SUBMIT/i)).toBeDefined();
    expect((button as HTMLButtonElement).disabled).toBe(false);
    vi.useRealTimers();
  });
});
