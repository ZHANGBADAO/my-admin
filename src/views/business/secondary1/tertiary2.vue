<template>
  <div>
    <div>/secondary1/tertiary2</div>
  </div>
</template>

<script setup lang="ts">
import { fetchUserRoutes } from '@/api'

defineOptions({
  name: 'business_secondary1_tertiary12',
})

fetchUserRoutes().then(({ data }) => {
  console.log('business_secondary1_tertiary12', data)
})
</script>

<style scoped></style>
