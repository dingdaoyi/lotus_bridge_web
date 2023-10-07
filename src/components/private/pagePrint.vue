<template>
  <iframe :src="src" width="100%" height="100%"></iframe>
</template>

<script setup lang="ts" name="pagePrint">

defineProps<{
  src: string;
}>();
</script>
