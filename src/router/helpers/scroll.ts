import type { RouterScrollBehavior } from 'vue-router'

export const scrollBehavior: RouterScrollBehavior = () => {
  return new Promise((resolve) => {
    const scrollPosition = {
      left: 0,
      top: 0,
    }
    setTimeout(() => {
      resolve(scrollPosition)
    }, 350)
  })
}
