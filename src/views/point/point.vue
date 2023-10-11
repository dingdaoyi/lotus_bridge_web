<template>
  <div>
    <div class="margin-bottom-20">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/southward' }">
          向南链接
        </el-breadcrumb-item>
        <el-breadcrumb-item>分组管理</el-breadcrumb-item>
        <el-breadcrumb-item>点位列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <pv-form
      class=""
      v-model="pagejson.queryForm"
      ref="pvpages"
      :option="pagejson.queryParams"
      @change="onTapChange"></pv-form>
    <pv-table
      :paginjson="pagejson"
      :option="pagejson.listParams"
      @change="onTapItemChange"
      @load="getListData"></pv-table>
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

<script setup lang="ts" name="point">
import { queryParams, listParams } from '@/scripts/point';
import addForm from './addForm.vue';
const route = useRoute();
const pagejson: any = reactive({
  queryParams,
  listParams,
  dialogJson: {
    visible: false,
    width: '50%',
    title: '新增',
    direction: 'center',
    datas: null
  },
  total: 0,
  size: 1,
  current: 10,
  queryForm: {}
});
const getListData = () => {
  const params = beforeAxiosEnter(queryParams, pagejson.queryForm);
  request(params).then(({ data }) => {
    pagejson.total = data.length;
    pagejson.listParams.datas = data;
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
    pagejson.fromData = {};
    pagejson.fromData.datas = data;
    pagejson.dialogJson.visible = true;
  }
};
const onDialogChange = ({ data, item }: any) => {
  pagejson.dialogJson.visible = false;

  if (item.load) {
    getListData();
  }
};
onBeforeMount(() => {
  pagejson.queryForm = {
    page: {
      page: 1,
      limit: 10
    },
    groupId: Number(route.query.id)
  };
  getListData();
});
</script>
