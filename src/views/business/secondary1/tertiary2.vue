<template>
  <div>
    <div>/secondary1/tertiary2</div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'business_secondary1_tertiary12',
}
</script>
<script setup lang="ts">
import { fetchUserRoutes } from '@/api'

fetchUserRoutes().then(({ data }) => {
  console.log('business_secondary1_tertiary12', data)
})
</script>

<style scoped></style>
