<template>
  <el-dialog
    v-if="option.direction == 'center'"
    :title="option.title"
    destroy-on-close
    v-model="dialogVisible"
    :width="option.width"
    append-to-body>
    <slot></slot>
  </el-dialog>
  <el-drawer
    v-else
    :title="option.title"
    destroy-on-close
    v-model="dialogVisible"
    :direction="option.direction"
    :size="option.width"
    append-to-body>
    <slot></slot>
  </el-drawer>
</template>

<script setup lang="ts" name="pv-dialog">
const props = defineProps<{ option: any }>();
const dialogVisible = ref();

defineExpose({
  data: dialogVisible
});
</script>
