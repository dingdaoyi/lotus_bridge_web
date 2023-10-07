<template>
  <ul ref="grid" class="flex-row width-full flex-wrap align-center">
    <li
      class="padding"
      v-for="(item, key) in pvgrid.items"
      :key="key"
      :class="item.className"
      :style="itemStyle(item)"
      align="center"
      @click="onChange(item)">
      <template v-if="item.component">
        <component
          :is="item.component"
          :option="item"
          @change="onChange"></component>
      </template>
      <template v-else>
        <el-image
          v-if="item.icon"
          class="margin-bottom"
          fit="cover"
          :class="item.iconClassName"
          :src="item.icon"></el-image>

        <p :class="item.textClassName" v-html="item.label"></p>
      </template>
    </li>
  </ul>
</template>

<script setup lang="ts" name="pv-grid">
const emit = defineEmits(['change']);
const gridHtml: any = ref(null);
const props = defineProps<{ option: any }>();
const pvgrid: any = reactive({
  items: props.option.items || [],
  props: props.option.props || {},
  column: props.option.column
});

const itemStyle = ({ column, minWidth, index, totalRow, row, border }: any) => {
  const stylejson: any = {
    'min-width': `${minWidth}px`,
    'border-top': '0',
    'border-right': '0'
  };
  // 最后一列
  if (index % column == column) {
    stylejson['border-right'] = '0';
  }
  // 第一列
  else if (index % column == 0) {
    stylejson['border-left'] = '0';
  }
  // 减去边框宽度
  else {
    stylejson['min-width'] = `${minWidth - (border ? 1 : 0)}px`;
  }
  // 最后一行
  if (row == totalRow) {
    stylejson['border-bottom'] = '0';
  }
  // 第一行
  else if (row == 1) {
    stylejson['border-top'] = '0';
  }
  return stylejson;
};
const gridInitData = () => {
  const minWidth = Math.floor(gridHtml.offsetWidth / pvgrid.column);
  pvgrid.items.map((item: any, i: number): Array<any> => {
    item.index = i;
    item.column = pvgrid.column;
    item.totalRow = Math.ceil(pvgrid.items.length / pvgrid.column);
    item.minWidth = minWidth;
    item.row = parseInt(String(item.index / pvgrid.column)) + 1;
    if (Object.isExtensible(pvgrid.props)) {
      const { label, icon, value } = pvgrid.props;
      item.label = item[label];
      item.icon = item[icon];
      item.value = item[value];
    }
    return item;
  });
};
const onChange = (item: any) =>
  emit('change', { ...item, ...{ eltype: 'grid' } });
onMounted(() => gridInitData());
</script>
