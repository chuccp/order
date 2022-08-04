import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import path from "path";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
    // requireTransform({
    //   fileRegex: /.js$|.vue$/
    // }),

  ],
  resolve:{
    alias:[//配置别名
      { find: '@', replacement: path.resolve(__dirname, 'src') }
    ],
  }
})


