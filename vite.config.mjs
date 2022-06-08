import fs from 'node:fs/promises';

const files = await fs.readdir('./src/scripts', {})
const entryPoints = files.reduce((obj, file) => {
  if (!file.endsWith('.js')) {
    return obj
  }

  obj[file.replace('.js', '')] = `./src/scripts/${file}`
  return obj
}, {});


export default {
  root: './src',
  build: {
    manifest: true,
    outDir: '../web',
    emptyOutDir: false,
    rollupOptions: {
      input: entryPoints
    }
  }
}
