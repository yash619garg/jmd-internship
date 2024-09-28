// jai mata di
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // "/api/": "http://localhost:5000/",
      // "/api/": "https://intern-assign-gfvq.onrender.com",
      "/api/": "https://intern-assignment-u9m9.onrender.com/",
      // it will replace api from http://localhost:5000/ in url
    }
  }
})
