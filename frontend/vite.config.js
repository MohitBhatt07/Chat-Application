import { defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({
  server: {
    proxy: {
      // '/socket.io/': {
      //   target: 'http://localhost:8000',
      //   changeOrigin: true,
      //   secure: false,
      //   ws: true,
      // },
      "/api": {
        target: "http://localhost:8000",
        secure: false,
      },
    },
  },
  plugins: [react()],
})
