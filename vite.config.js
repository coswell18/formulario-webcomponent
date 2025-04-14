import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(({  command }) => {
  const isLib = command === 'build';

  return {
    plugins: [
      react({
        // Desactiva React Refresh para el build del Web Component
        fastRefresh: !isLib,
        jsxRuntime: 'automatic',
      }),
    ],
    build: isLib
      ? {
          lib: {
            entry: path.resolve(__dirname, 'src/form-component.jsx'),
            name: 'DynamicFormComponent',
            fileName: 'dynamic-form',
            formats: ['iife'],
          },
          rollupOptions: {
            output: {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
              },
            },
          },
        }
      : undefined,
    define: isLib
      ? {
          'process.env.NODE_ENV': JSON.stringify('production'),
          'process.env': {},
        }
      : {},
  };
});