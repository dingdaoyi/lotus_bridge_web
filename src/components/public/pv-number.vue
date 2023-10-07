<template>
  <el-input-number
    v-model.trim="data"
    :disabled="item.disabled"
    :step="item.step"
    :min="item.minlength"
    :max="item.maxlength"
    :step-strictly="item.stepStrictly"
    :controls-position="item.controlsPosition"
    :controls="item.controls"
    :precision="item.precision"
    :placeholder="item.placeholder"></el-input-number>
</template>

<script setup lang="ts" name="pv-number">
const data = ref();
defineProps<{ item: any }>();
defineExpose({
  data
});
</script>
