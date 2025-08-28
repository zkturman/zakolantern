import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~assets": path.resolve(__dirname, "assets"),
      "~data": path.resolve(__dirname, "data")
    },
  }
})
