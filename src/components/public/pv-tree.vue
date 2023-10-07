<template>
  <el-tree
    ref="treeHtml"
    class="width-full"
    :data="data"
    :props="item.props"
    :empty-text="item.emptyText"
    :icon-class="item.iconClass"
    :indent="item.indent"
    :accordion="item.accordion || true"
    :highlight-current="item.highlightCurrent"
    :node-key="item.nodeKey"
    :load="treeLoadList"
    :lazy="item.lazy"
    @node-click="handleNodeClick"></el-tree>
</template>
<script setup lang="ts" name="pv-tree">
const emit = defineEmits(['change']);
const props = defineProps<{ option: any; item: any }>();
const data = ref();
onBeforeMount(() => {
  props.item.list && (data.value = props.item.list);
});
const handleNodeClick = (node: any) => {
  emit('change', node);
};
const treeLoadList = async (node: any, resolve: any) => {
  // const { data } = await request(beforeAxiosEnter(props.item, props.option));
  // if (!props.item.lazy) {
  //   return false;
  // }
  // const { level } = node;
  // if (level) {
  // } else {
  //   console.log(data)
  //   data.flat();
  //   resolve(data);
  // }
};
defineExpose({
  data
});
</script>
