import fs from 'node:fs/promises'
import mkcert from 'vite-plugin-mkcert'

const files = await fs.readdir('./src/scripts', {})
const entryPoints = files.reduce((obj, file) => {
  if (!file.endsWith('.js')) {
    return obj
  }

  obj[file.replace('.js', '')] = `./src/scripts/${file}`
  return obj
}, {})

export default {
  root: './src',
  base: 'https://localhost:3000/',
  server: {
    https: true,
    hmr: {
      host: 'localhost'
    },
    watch: ['./**/*.phtml']
  },
  plugins: [
    mkcert(),
    {
      name: 'template-reload',
      enforce: 'post',
      handleHotUpdate({ file, server }) {
        if (file.endsWith('.phtml')) {
          server.ws.send({
            type: 'full-reload',
            path: '*'
          })
        }
      }
    }
  ],
  build: {
    manifest: true,
    outDir: '../web/dist',
    emptyOutDir: true,
    rollupOptions: {
      input: entryPoints
    }
  }
}
