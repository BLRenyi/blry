import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],

    // Development server configuration
    server: {
      port: parseInt(env.VITE_DEV_PORT) || 5173,
      host: env.VITE_DEV_HOST || 'localhost',
      open: true,
      // Future Django API proxy configuration
      // proxy: {
      //   '/api': {
      //     target: env.VITE_API_URL || 'http://localhost:8000',
      //     changeOrigin: true,
      //     secure: false,
      //   },
      // },
    },

    // Build configuration
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      // Optimize for production
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
          },
        },
      },
    },

    // Environment variables prefix
    envPrefix: 'VITE_',

    // Define global constants
    define: {
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION || '1.0.0'),
    },
  };
});
