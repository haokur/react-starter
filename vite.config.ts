import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const env = process.env.NODE_ENV;
const isProduction = env === 'production'

export default defineConfig(() => {
  return {
    base: isProduction ? '/react-starter' : '',
    build: {
      outDir: "dist",
    },
    plugins: [react()],
  }
})

// export default defineConfig({
//   base: isProduction ? '/react-starter' : '',
//   build: {
//     outDir: "dist",
//   },
//   plugins: [react()],
// })
