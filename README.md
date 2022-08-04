## Vue 3 + TypeScript + Vite + Element Plus + Pinia

## 左侧菜单和路由表数据结构的区别
1. 路由表数据 由 服务端获取的菜单数据转换而成(src/store/modules/router.ts:66). 
2. 左侧菜单数据 由 路由表数据转换而成(src/store/modules/router.ts:68).
3. 左侧菜单是多级(大于2级),但页面结构其实只有2级:布局页面和右侧子页面.所以需要把路由表数据的多级数组的转为二级数组(src/store/modules/router.ts:71),只保留一级路由(对应菜单数据里的一级菜单,用来打开布局页面)和最底层的页面路由(对应菜单数据里的最底层的页面菜单,用来打开右侧的二级页面)
4. 点击左侧菜单,用路由的name进行页面跳转(由于把多级路由转为二级,拼接path,用path跳转就不适用了)

## 缓存右侧打开的页面组件
1. vue-router使用<router-view />上的keep-alive属性缓存组件,keep-alive属性的值必须为组件的name
2. 组件的name保存在路由表数据route中的meta属性中(src/router/helpers/generator.ts:28)
3. 在路由全局后置守卫中判断是否缓存页面组件(src/router/guard.ts:73)
4. 开发右侧页面组件时,需在组件内定义组件的name属性,才能和keep-alive属性的值匹配上.
   安装 `unplugin-vue-define-options`开发依赖,然后在组件中使用:
```javascript
defineOptions({
  name: 'business_secondary1_tertiary12',
})
```