import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: true, // 监听所有地址
    port: 8080,
    strictPort: true, // 端口被占用时抛出错误
  },
  preview: {
    host: true,
    port: 8080,
    strictPort: true,
  }
});
