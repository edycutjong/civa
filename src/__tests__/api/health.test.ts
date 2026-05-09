import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockJsonFn = vi.fn();

vi.mock('next/server', () => ({
  NextResponse: {
    json: (data: unknown) => {
      mockJsonFn(data);
      return { _data: data };
    },
  },
}));

import { GET } from '@/app/api/health/route';

describe('GET /api/health', () => {
  beforeEach(() => {
    mockJsonFn.mockClear();
  });

  it('returns status ok', async () => {
    const res = await GET() as unknown as { _data: Record<string, unknown> };
    expect(res._data.status).toBe('ok');
  });

  it('returns a valid ISO timestamp', async () => {
    const res = await GET() as unknown as { _data: Record<string, unknown> };
    expect(typeof res._data.timestamp).toBe('string');
    expect(new Date(res._data.timestamp as string).toISOString()).toBe(res._data.timestamp);
  });

  it('returns numeric uptime', async () => {
    const res = await GET() as unknown as { _data: Record<string, unknown> };
    expect(typeof res._data.uptime).toBe('number');
    expect(res._data.uptime as number).toBeGreaterThanOrEqual(0);
  });

  it('returns environment', async () => {
    const res = await GET() as unknown as { _data: Record<string, unknown> };
    expect(res._data.environment).toBeDefined();
  });
});
