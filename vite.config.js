import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' 讓 build 出來的檔案可以直接放到 GitHub Pages 子路徑
export default defineConfig({
  plugins: [react()],
  base: './',
});
