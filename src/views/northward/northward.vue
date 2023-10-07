<template>
  <div class="flex-col">
    <pv-form
      class=""
      v-model="pagejson.queryForm"
      :option="pagejson.queryParams"
      @change="onTapChange"></pv-form>
    <itemList
      :datas="pagejson.listData"
      :options="pagejson.listParams"
      :pagejson="pagejson"
      @change="onTapItemChange"
      @load="getListData"></itemList>

    <pv-dialog
      v-model="pagejson.dialogJson.visible"
      :option="pagejson.dialogJson">
      <addForm :option="pagejson.fromData" @change="onDialogChange"></addForm>
    </pv-dialog>
  </div>
</template>

<script setup lang="ts" name="northward">
import { queryParams, listParams, rustapi } from '@/scripts/northward';
import addForm from './addForm.vue';
const pagejson: any = reactive({
  queryParams,
  listParams,
  fromData: null,
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
    pagejson.fromData = null;
  } else {
    pagejson.queryForm = Object.assign({}, data, {});
    getListData();
  }
};
const onTapItemChange = ({ item, data }: any) => {
  if (item.text == '编辑') {
    pagejson.fromData = data;
    pagejson.dialogJson.visible = true;
  }
};
const onDialogChange = ({ data, item }: any) => {
  pagejson.dialogJson.visible = false;

  if (item.load) {
    const params = beforeAxiosEnter(
      {
        load: rustapi.exportGroup,
        params: [
          {
            label: 'export_id',
            value: 'id'
          },
          {
            label: 'group_ids',
            value: 'plugin_id'
          }
        ]
      },
      data
    );
    request(params).then(({ data }) => {
      getListData();
    });
  }
};
onBeforeMount(() => {
  getListData();
});
</script>
