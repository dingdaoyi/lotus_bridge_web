<template>
  <div class="flex-col">
    <pv-form
      class=""
      v-model="pagejson.queryForm"
      ref="pvpages"
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
      <addForm
        v-if="pagejson.dialogJson.visible"
        :option="pagejson.fromData"
        @change="onDialogChange"></addForm>
    </pv-dialog>
  </div>
</template>

<script setup lang="ts" name="southward">
import { queryParams, listParams, rustapi } from '@/scripts/southward';
import addForm from './addForm.vue';
const pagejson: any = reactive({
  queryParams,
  listParams,
  fromData: null,
  dialogJson: {
    visible: false,
    width: '50%',
    title: '新增',
    direction: 'center',
    datas: null
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
    const params = beforeAxiosEnter(
      {
        load: rustapi.deviceDetail,
        rreq: {
          label: 'id'
        }
      },
      data
    );
    request(params).then(({ data }) => {
      pagejson.dialogJson.visible = true;
      pagejson.fromData = data;
    });
  } 
};
const onDialogChange = ({ data, item }: any) => {
  pagejson.dialogJson.visible = false;
  if (item.load) {
    getListData();
  }
  // pagejson.dialogJson.visible
};
onBeforeMount(() => {
  getListData();
});
</script>
