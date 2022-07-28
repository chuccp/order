import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import requireTransform from 'vite-plugin-require-transform';

// https://vitejs.dev/config/
export default {
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),

  ],
};