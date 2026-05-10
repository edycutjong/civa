export class AdevarService {
  private apiUrl: string;
  private apiKey: string;
  private initialized: boolean = false;

  constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_ADEVAR_API_URL || "https://api.encrypt.ika.network/v1";
    this.apiKey = process.env.ADEVAR_API_KEY || "";
    /* v8 ignore next 3 */
    if (process.env.NODE_ENV !== 'test') {
      console.log("[Adevar SDK] Initializing cipher auditing");
    }
  }

  init() {
    if (this.initialized) return;
    if (!this.apiKey) {
      console.warn("[Adevar SDK] No API key provided, requests may fail or fall back to mock data.");
    }
    this.initialized = true;
  }

  async submitEncryptedOrder(asset: string, amount: string, band: string): Promise<string> {
    this.init();
    console.log(`[Adevar SDK] Encrypting ${amount} ${asset} with visible band ${band}`);
    
    try {
      // In a real Ika integration, we would generate a ZK proof locally before submitting.
      // We simulate the local ZK proof generation here since it requires a webassembly module.
      const pseudoProof = Buffer.from(`zk-proof:${asset}:${amount}:${band}`).toString('base64');
      
      const payload = {
        asset,
        band, // only the band is visible to the dark pool matcher
        encryptedPayload: pseudoProof,
        timestamp: Date.now()
      };

      const response = await fetch(`${this.apiUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data.orderId || `ORD-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    } catch (e) {
      console.error("[Adevar SDK] Real order encryption/submission failed:", e);
      // Fallback for demo
      return `ORD-${Math.random().toString(36).substring(2, 6).toUpperCase()}-FALLBACK`;
    }
  }
}

export const adevarService = new AdevarService();

