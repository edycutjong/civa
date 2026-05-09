import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AdevarService } from '@/lib/adevar';

describe('AdevarService', () => {
  let service: AdevarService;

  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    delete process.env.NEXT_PUBLIC_ADEVAR_API_URL;
    delete process.env.ADEVAR_API_KEY;
    service = new AdevarService();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('constructor', () => {
    it('initializes with default API URL', () => {
      expect(service['apiUrl']).toBe('https://api.encrypt.ika.network/v1');
    });

    it('uses NEXT_PUBLIC_ADEVAR_API_URL env var when provided', () => {
      process.env.NEXT_PUBLIC_ADEVAR_API_URL = 'https://custom.api.test/v1';
      const s = new AdevarService();
      expect(s['apiUrl']).toBe('https://custom.api.test/v1');
    });

    it('starts uninitialized', () => {
      expect(service['initialized']).toBe(false);
    });
  });

  describe('init', () => {
    it('sets initialized to true', () => {
      service.init();
      expect(service['initialized']).toBe(true);
    });

    it('is idempotent when called multiple times', () => {
      service.init();
      service.init();
      expect(service['initialized']).toBe(true);
      expect(console.warn).toHaveBeenCalledTimes(1);
    });

    it('warns when no API key is set', () => {
      service.init();
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('No API key'),
      );
    });

    it('does not warn when API key is present', () => {
      process.env.ADEVAR_API_KEY = 'test-key-123';
      const s = new AdevarService();
      s.init();
      expect(console.warn).not.toHaveBeenCalled();
    });
  });

  describe('submitEncryptedOrder', () => {
    it('returns orderId from API on success', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ orderId: 'ORD-API-XYZ' }),
      });

      const result = await service.submitEncryptedOrder('SOL', '1000', '$1M - $5M');
      expect(result).toBe('ORD-API-XYZ');
    });

    it('returns generated ORD- ID when API response has no orderId', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({}),
      });

      const result = await service.submitEncryptedOrder('SOL', '1000', '$1M - $5M');
      expect(result).toMatch(/^ORD-/);
    });

    it('returns fallback ID on non-ok API response', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
        statusText: 'Service Unavailable',
      });

      const result = await service.submitEncryptedOrder('SOL', '1000', '$1M - $5M');
      expect(result).toMatch(/FALLBACK$/);
    });

    it('returns fallback ID on network error', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network failure'));

      const result = await service.submitEncryptedOrder('SOL', '1000', '$1M - $5M');
      expect(result).toMatch(/FALLBACK$/);
    });

    it('sends asset and band but not raw amount in visible payload', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ orderId: 'ORD-OK' }),
      });

      await service.submitEncryptedOrder('BTC', '99999', '$5M - $10M');

      const [, options] = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
      const body = JSON.parse(options.body);

      expect(body.asset).toBe('BTC');
      expect(body.band).toBe('$5M - $10M');
      expect(body.encryptedPayload).toBeDefined();
      expect(body.timestamp).toBeTypeOf('number');
      expect(body.amount).toBeUndefined();
    });

    it('posts to the configured API URL', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ orderId: 'ORD-1' }),
      });

      await service.submitEncryptedOrder('SOL', '100', '$100K - $1M');

      const [url] = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
      expect(url).toContain('/orders');
    });

    it('calls init before sending', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ orderId: 'ORD-1' }),
      });
      const initSpy = vi.spyOn(service, 'init');

      await service.submitEncryptedOrder('SOL', '100', '$100K - $1M');

      expect(initSpy).toHaveBeenCalled();
    });
  });
});
