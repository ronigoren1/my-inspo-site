import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Shrinks your photos when the site is built, so big phone photos still load fast.
    // (Location data and other hidden photo info is removed automatically.)
    imagetools(),
  ],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
