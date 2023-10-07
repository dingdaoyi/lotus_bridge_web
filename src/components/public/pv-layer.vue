<template>
  <el-cascader
    v-model="data"
    :options="item.list"
    :clearable="item.clearable || true"
    :placeholder="item.placeholder"
    :popper-class="item.className"
    :disabled="item.disabled"
    :size="item.size"
    :props="cascaderProp"
    :show-all-levels="item.showAllLevels || true"
    :separator="item.separator"
    :filterable="item.filterable"
    @change="onChange"></el-cascader>
</template>
<script setup lang="ts" name="pv-layer">
const data = ref();
const emit = defineEmits(['change']);
const props = defineProps<{ item: any }>();

const cascaderProp = computed(() => {
  const { lazy, multiple, checkStrictly, expandTrigger, children } = props.item;
  const tempjson: any = {
    multiple,
    checkStrictly,
    expandTrigger,
    children
  };
  if (lazy) {
    tempjson.lable = lazy.lable;
    tempjson.value = lazy.value;
    tempjson.lazy = true;
    tempjson.lazyLoad = async (node: any, resolve: any) => {
      const tempjson: any = beforeAxiosEnter(lazy, node.data);
      const data: any = findObjectValue(await request(tempjson), 'data');

      data.map((item: any) => {
        const { label, value } = lazy;
        item.label = findObjectValue(item, label);
        item.value = findObjectValue(item, value);
        return item;
      });
      resolve(data);
    };
  }
  return tempjson;
});

const onChange = (item: any) => emit('change', data);
defineExpose({
  data
});
</script>
