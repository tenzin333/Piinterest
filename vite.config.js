```
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/docs', // Use a specific directory or file path
  build: {
    outDir: 'dist',
  },
});
```