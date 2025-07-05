/**
 * Environment configuration for the BLRY frontend application
 * Centralizes access to environment variables with fallback defaults
 */

export const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  },

  // Application Configuration
  app: {
    name: import.meta.env.VITE_APP_NAME || 'BLRY',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  },

  // Development Configuration
  dev: {
    port: parseInt(import.meta.env.VITE_DEV_PORT) || 5173,
    host: import.meta.env.VITE_DEV_HOST || 'localhost',
  },

  // Feature Flags
  features: {
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    debug: import.meta.env.VITE_ENABLE_DEBUG === 'true',
  },

  // Environment Detection
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,
};

// Helper function to log configuration in development
if (config.isDevelopment && config.features.debug) {
  console.log('🔧 App Configuration:', config);
}

export default config;
