import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// BASE_PATH is set by the GitHub Pages workflow ("/portfolio/" for a project repo,
// "/" for sxntnx.github.io). Vercel and local dev use "/".
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
})
