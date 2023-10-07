<template>
  <pv-alerts class="padding" :option="notfound"></pv-alerts>
</template>

<script setup lang="ts" name="NotFound">
const notfound = ref({
  title: '未找到页面',
  path: '/home',
  slot: true,
  autoskip: true,
  type: 'error',
  description: '非常抱歉，未找到页面'
});
</script>
