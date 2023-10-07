<template>
  <el-select
    v-model="data"
    :class="item.className"
    clearable
    :filterable="item.filterable"
    :disabled="item.disabled"
    :multiple="item.multiple"
    :placeholder="item.placeholder"
    @change="onTapChange">
    <el-option
      v-for="(sitem, skey) in item.list"
      :key="skey"
      :label="sitem.label"
      :value="sitem.value"></el-option>
  </el-select>
</template>
<script setup lang="ts" name="pv-select">
const emit = defineEmits(['change']);

const props: any = defineProps<{ item: any }>();
const data = ref();
const onTapChange = (val: any) => {
  data.value = val;
  emit('change', { data: val, item: props.item });
};

defineExpose({ data });
</script>
