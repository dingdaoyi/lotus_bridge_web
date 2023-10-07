<template>
  <canvas
    :width="option.width"
    :height="option.height"
    ref="canvas"
    @click="onCanvasChange"
    @contextmenu.prevent="onCanvasChange"></canvas>
</template>

<script setup lang="ts" name="pv-flying">

defineProps<{ option: any }>();
const onCanvasChange = () => {};
</script>
