import path from "path"
import react from "@vitejs/plugin-react"
import contentCollections from "@content-collections/vite"
import { defineConfig } from "vite"

const generatedContentPath = path.resolve(__dirname, "./.content-collections/generated")

export default defineConfig({
  plugins: [contentCollections(), react()],
  build: {
    chunkSizeWarningLimit: 900,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "content-collections": generatedContentPath,
    },
  },
})

