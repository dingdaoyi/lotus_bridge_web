<template>
  <div class="flex-col">
    <el-tabs v-model="pagejson.pageType" class="demo-tabs">
      <el-tab-pane
        :label="item.label"
        :name="item.value"
        v-for="item in pagejson.tabslist"></el-tab-pane>
    </el-tabs>
    <pv-form
      class=""
      v-model="pagejson.queryForm"
      :option="pagejson.queryParams"
      @change="onTapChange"></pv-form>
    <itemList
      :datas="pagejson.listData"
      :pagejson="pagejson"
      :options="pagejson.listParams"
      @change="onTapItemChange"
      @load="getListData"></itemList>
    <pv-dialog
      v-model="pagejson.dialogJson.visible"
      :option="pagejson.dialogJson">
      <addForm :option="pagejson.fromData" @change="onDialogChange"></addForm>
    </pv-dialog>
  </div>
</template>

<script setup lang="ts" name="plugin">
import { queryParams, listParams, tabslist } from '@/scripts/plugin';
import addForm from './addForm.vue';
const pagejson: any = reactive({
  queryParams,
  listParams,
  tabslist,
  fromData: null,
  pageType: '',
  dialogJson: {
    visible: false,
    width: '50%',
    title: '新增',
    direction: 'center'
  },
  listData: [],
  queryForm: {},
  total: 0,
  size: 1,
  current: 10
});
const getListData = () => {
  const params = beforeAxiosEnter(queryParams, pagejson.queryForm);
  request(params).then(({ data }) => {
    pagejson.total = data.length;
    pagejson.listData = data;
  });
};
const onTapChange = ({ data, item }: any) => {
  if (item.text == '新增') {
    pagejson.dialogJson.visible = true;
    pagejson.fromData = {};
    pagejson.fromData.pluginType = pagejson.pageType;
  } else {
    pagejson.queryForm = Object.assign({}, data, {});
    getListData();
  }
};
const onTapItemChange = ({ item, data }: any) => {
  if (item.text == '编辑') {
    pagejson.fromData = data;
    pagejson.fromData.pluginType = pagejson.pageType;
    pagejson.dialogJson.visible = true;
  }
};
const onDialogChange = ({ data, item }: any) => {
  pagejson.dialogJson.visible = false;
  pagejson.pageType = '';
  if (item.load) {
    getListData();
  }
};
onBeforeMount(() => {
  getListData();
});
</script>
