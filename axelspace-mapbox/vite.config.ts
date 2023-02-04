///<reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
	  watch: false,//the watch parameter defaults to true, which can be annoying when you only want to run the tests once
  },
})
