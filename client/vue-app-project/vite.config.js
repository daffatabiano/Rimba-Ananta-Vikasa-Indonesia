// vite.config.js
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [vue()],
    define: {
      __APP_ENV__: env.APP_ENV,
      __IS_PRODUCTION__: isProduction,
    },
    // Pilihan konfigurasi lainnya
  };
});
