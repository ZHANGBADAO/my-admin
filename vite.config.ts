import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

  return {
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
      viteMockServe({
        ignore: /^_/,
        mockPath: "mock",
        localEnabled: true, //本地开发环境启用mock
        prodEnabled: mode === "test", //生产环境启用mock(build模式为test时才启用)
        injectCode: `
          import { setupProdMockServer } from '/mock/_createProductionServer';
          setupProdMockServer();
        `,
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
  }
})
