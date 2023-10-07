<template>
  <VueCountTo :startVal="0" :endVal="data" />
</template>

<script setup lang="ts" name="count">
const data = ref();
</script>
