<template>
  <div style="padding: 2rem">
    <pv-form ref="pvform" :option="homejson" v-model="pvform"></pv-form>
  </div>
</template>

<script setup lang="ts">
import HomeJson from '@/scripts/home';
const homejson = computed(() => HomeJson);
const pvform = ref();

defineOptions({
  name: 'home'
});
</script>
