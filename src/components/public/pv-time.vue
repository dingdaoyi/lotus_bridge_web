<template>
  <el-time-picker
    :is-range="item.isRange"
    :popper-class="item.className"
    v-model="data"
    :arrow-control="item.arrowControl"
    :editable="item.editable"
    :range-separator="pvtime.rangeSeparator"
    :clearable="item.clearable"
    :picker-options="item.pickerOptions"
    :start-placeholder="pvtime.startPlaceholder"
    :end-placeholder="pvtime.endPlaceholder"
    :prefix-icon="item.prefixIcon"
    :placeholder="pvtime.placeholder"></el-time-picker>
</template>

<script setup lang="ts" name="pv-time">
const data = ref();
const props = defineProps<{ item: any }>();
const pvtime = reactive({
  placeholder: '',
  endPlaceholder: '',
  startPlaceholder: '',
  rangeSeparator: ''
});

onBeforeMount(() => {
  if (!props.item.isRange) {
    pvtime.placeholder = props.item.placeholder;
  } else {
    pvtime.endPlaceholder = props.item.endPlaceholder;
    pvtime.rangeSeparator = props.item.rangeSeparator;
    pvtime.startPlaceholder = props.item.startPlaceholder;
  }
});
defineExpose({
  data
});
</script>
