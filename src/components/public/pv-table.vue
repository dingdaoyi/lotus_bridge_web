<template>
  <div class="flex-col height-full">
    <el-table
      ref="tableHtml"
      class="flex"
      :max-height="pagejson.maxHeight"
      :height="pagejson.height || '100%'"
      :stripe="pagejson.stripe || true"
      :border="pagejson.border || true"
      :row-key="pagejson.rowKey || 'id'"
      :lazy="pagejson.lazy"
      :fit="pagejson.fit"
      :current-row-key="pagejson.rowKey || 'id'"
      :show-header="pagejson.showHeader"
      :highlight-current-row="pagejson.highlightCurrentRow || false"
      :data="pagejson.tableList"
      @cell-click="onCellClick"
      @selection-change="onSelectChange">
      <template v-for="(item, key) in pagejson.items">
        <pv-tables-item
          v-if="item.visible"
          :key="key"
          :item="item"
          @submit="onTapSubmit"></pv-tables-item>
      </template>
    </el-table>
    <div class="flex-row justify-end padding-10">
      <pv-pagin
        v-if="pagejson.paginjson && pagejson.tableList.length"
        :option="pagejson"
        @change="initLoadsData"></pv-pagin>
    </div>
  </div>
</template>

<script setup lang="ts" name="pv-table">
const emit = defineEmits(['change']);
const router = useRouter();
const props: any = defineProps<{ option: any; paginjson: any }>();
const tableHtml = ref();
const pagejson = reactive({
  ...props.option,
  tableList: props.option.datas || []
});
const initLoadsData = (data: any) => {
  pagejson.tableList = data;
};
const onSelectChange = () => {};
const onTapSubmit = ({ item, row }: any) => {
  if (item.load) {
    // emit('beforeSubmit', { data: pagejson.data, item });
    const params = beforeAxiosEnter(item, row);
    if (pagejson.loading) return;
    pagejson.loading = true;
    request(params)
      .then(({ data }: any) => {
        pagejson.loading = false;
        if (item.pinia) {
          item.pinia(data);
        }
        if (item.path) {
          const params = jsonToGetData(getParams(item, row));
          router.push(item.path + params);
        } else {
          emit('change', { data: row, item });
        }
      })
      .catch(() => {
        pagejson.loading = false;
      });
  } else {
    if (item.pinia) {
      item.pinia(row);
    }
    if (item.path) {
      const params = jsonToGetData(getParams(item, row));
      router.push(item.path + params);
    } else {
      emit('change', { data: row, item });
    }
  }
};
const onCellClick = () => {};
onBeforeMount(() => {
  pagejson.paginjson = {
    className: '',
    align: ''
  };
});
onMounted(() => {
  console.log(props.option.datas);
});
defineExpose({
  tableHtml,
  initLoadsData
});
</script>
