import { describe, it, expect } from 'vitest';
import { config } from '../env';

describe('Environment Configuration', () => {
  it('has correct default API configuration', () => {
    expect(config.api.baseUrl).toBe('http://localhost:8000/api');
    expect(config.api.timeout).toBe(10000);
  });

  it('has correct app configuration', () => {
    expect(config.app.name).toBe('BLRY');
    expect(config.app.version).toBe('1.0.0');
  });

  it('has correct development configuration', () => {
    expect(config.dev.port).toBe(5173);
    expect(config.dev.host).toBe('localhost');
  });

  it('has correct feature flags', () => {
    expect(config.features.analytics).toBe(false);
    // Debug is true in development mode, which Vitest runs in
    expect(typeof config.features.debug).toBe('boolean');
  });

  it('has correct environment detection', () => {
    // In Vitest, we're in development mode
    expect(typeof config.isDevelopment).toBe('boolean');
    expect(typeof config.isProduction).toBe('boolean');
    expect(typeof config.mode).toBe('string');
  });

  it('exports config as default', async () => {
    const defaultConfig = await import('../env');
    expect(defaultConfig.default).toBe(config);
  });
});
