<template>
  <div>
    <div>/secondary2/tertiary2</div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'business_secondary2_tertiary22',
}
</script>
<script setup lang="ts">
import { fetchUserRoutes } from '@/api'

fetchUserRoutes().then(({ data }) => {
  console.log('business_secondary2_tertiary22', data)
})
</script>

<style scoped></style>
