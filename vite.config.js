import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api/proxy-register": {
        target: "http://sarahne.eu-4.evennode.com",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/proxy-register/, "/auth/register"),
      },
    },
  },
});
