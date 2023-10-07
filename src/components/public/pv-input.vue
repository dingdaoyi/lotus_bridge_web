<template>
  <el-input
    class="pv-input"
    :type="item.type"
    v-model="data"
    :minlength="item.minlength"
    :show-password="item.type == 'password' && item.showPassword"
    :maxlength="item.maxlength"
    :disabled="item.disabled"
    :show-word-limit="item.type == 'textarea' && item.showWordLimit"
    :rows="(item.type == 'textarea' && item.rows) || 5"
    :prefix-icon="item.prefixIcon"
    :suffix-icon="item.suffixIcon"
    :clearable="item.clearable || true"
    :placeholder="item.placeholder">
    <template v-if="item.prepend" #prepend>
      <slot name="prepend"></slot>
    </template>
    <template v-if="item.append" #append>
      <slot name="append"></slot>
    </template>
  </el-input>
</template>

<script setup lang="ts" name="pv-input">
const data = ref();
defineProps<{ item: any }>();
defineExpose({
  data
});
</script>
<style lang="scss" scoped>
.el-input :deep(.el-input__wrapper) {
  border-radius: 0.2rem;
}
.el-input :deep(.el-input-group__append, .el-input-group__append) {
  background-color: transparent;
  border: none;
  padding: 0;
  box-shadow: 0px 0px transparent;
}
</style>
