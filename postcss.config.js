module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // 可选配置用于生产优化
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
}
