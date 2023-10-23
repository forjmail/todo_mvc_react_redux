import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 3003 },
  build: { outDir: 'docs' },
  base: '/todo_mvc_react_redux',
});
