<template>
  <el-date-picker
    v-model="data"
    :type="item.type"
    :disabled="item.disabled"
    :class="item.className"
    :unlink-panels="item.unlinkPanels"
    :default-value="item.defaultValue"
    :align="item.align"
    :placeholder="item.placeholder"
    :value-format="item.valueFormat ?? 'YYYY-MM-DD'"
    :popper-class="item.popperClass"
    :end-placeholder="item.endPlaceholder"
    :start-placeholder="item.startPlaceholder"
    :range-separator="item.rangeSeparator"
    @change="onChange"></el-date-picker>
</template>
<script setup lang="ts" name="pv-date">

const data = ref();
defineProps<{ item: any }>();
const emit = defineEmits(['change']);
const onChange = (val: any) => emit('change', val);
defineExpose({
  data
});
</script>
