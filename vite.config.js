import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// En local, sirve /api/youtube igual que la función serverless de Vercel.
const youtubeApiDev = () => ({
  name: 'youtube-api-dev',
  configureServer(server) {
    server.middlewares.use('/api/youtube', async (req, res) => {
      const { default: handler } = await server.ssrLoadModule('/api/youtube.js')
      const shim = {
        setHeader: (k, v) => res.setHeader(k, v),
        status(code) { res.statusCode = code; return shim },
        json(body) {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(body))
        },
      }
      await handler(req, shim)
    })
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), youtubeApiDev()],
})
