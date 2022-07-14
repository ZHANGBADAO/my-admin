import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/declare/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // 指定组件位置，默认是src/components
      dirs: ['src/components'],
      // 搜索子目录
      deep: true,
      // 配置文件生成位置
      dts: 'src/declare/components.d.ts',
      resolvers: [ElementPlusResolver()],
    }),
  ],
  envDir: './env',
  server: {
    host: true
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
})
