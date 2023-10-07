<template>
  <el-color-picker
    v-model="data"
    :disabled="item.disabled"
    :color-format="item.colorFormat"
    :popper-class="item.popperClass"
    :predefine="item.predefine"
    :label="item.label" />
</template>

<script setup lang="ts" name="pv-color">
defineProps<{ item: any }>();
const data = ref('#409EFF');
defineExpose({
  data
});
</script>
