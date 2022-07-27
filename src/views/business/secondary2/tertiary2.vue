<template>
  <div>
    <div>/secondary2/tertiary2</div>
  </div>
</template>

<script setup lang="ts">
import { fetchUserRoutes } from '@/api'

defineOptions({
  name: 'business_secondary2_tertiary22',
})

fetchUserRoutes().then(({ data }) => {
  console.log('business_secondary2_tertiary22', data)
})
</script>

<style scoped></style>
