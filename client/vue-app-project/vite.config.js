// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueRouter from 'vue-router';

export default defineConfig({
  plugins: [vue(), vueRouter()],
  // Pilihan konfigurasi lainnya
});
