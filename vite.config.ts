import { defineConfig } from 'vite';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import dts from 'vite-plugin-dts';
import banner from 'vite-plugin-banner';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [
      libInjectCss(),
      dts(),
      banner(`/*!
 * DarkEditable.js v${process.env.npm_package_version}
 * License: MIT
 */`)
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