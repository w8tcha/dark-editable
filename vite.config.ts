import { defineConfig } from 'vite';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import dts from 'vite-plugin-dts';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [
      libInjectCss(),
      dts()
  ],
  css: {
	  postcss: {
		  plugins: [
			  autoprefixer({}) // add options if needed
		  ],
	  }
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: './src/dark-editable.ts',
      name: 'DarkEditable',
      // the proper extensions will be added
      fileName: 'dark-editable',
      formats: ['es', 'iife', 'umd']
    },
    rollupOptions: {
      external: ['bootstrap'],
      output: {
        globals: {
              bootstrap: 'bootstrap'
        }
      }
    },
    sourcemap: true
  }
});