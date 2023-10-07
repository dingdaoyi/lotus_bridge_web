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
      @load="getListData"></itemList>
  </div>
</template>

<script setup lang="ts" name="plugins">
import { queryParams, listParams, rustapi } from '@/scripts/plugins';
const pagejson: any = reactive({
  queryParams,
  listParams,
  listData: [
    {
      name: 'string',
      deviceType: 'type1',
      customData: {
        additionalProp1: 'string',
        additionalProp2: 'string',
        additionalProp3: 'string'
      },
      protocolName: 'string'
    },
    {
      name: 'string',
      deviceType: 'type1',
      customData: {
        additionalProp1: 'string',
        additionalProp2: 'string',
        additionalProp3: 'string'
      },
      protocolName: 'string'
    },
    {
      name: 'string',
      deviceType: 'type1',
      customData: {
        additionalProp1: 'string',
        additionalProp2: 'string',
        additionalProp3: 'string'
      },
      protocolName: 'string'
    },
    {
      name: 'string',
      deviceType: 'type1',
      customData: {
        additionalProp1: 'string',
        additionalProp2: 'string',
        additionalProp3: 'string'
      },
      protocolName: 'string'
    },
    {
      name: 'string',
      deviceType: 'type1',
      customData: {
        additionalProp1: 'string',
        additionalProp2: 'string',
        additionalProp3: 'string'
      },
      protocolName: 'string'
    },
    {
      name: 'string',
      deviceType: 'type1',
      customData: {
        additionalProp1: 'string',
        additionalProp2: 'string',
        additionalProp3: 'string'
      },
      protocolName: 'string'
    },
    {
      name: 'string',
      deviceType: 'type1',
      customData: {
        additionalProp1: 'string',
        additionalProp2: 'string',
        additionalProp3: 'string'
      },
      protocolName: 'string'
    },
    {
      name: 'string',
      deviceType: 'type1',
      customData: {
        additionalProp1: 'string',
        additionalProp2: 'string',
        additionalProp3: 'string'
      },
      protocolName: 'string'
    }
  ],
  queryForm: {},
  total: 1000,
  size: '1',
  current: ''
});
const getListData = () => {
  const params = beforeAxiosEnter(queryParams, pagejson.queryForm);
  request(params).then(({ data }) => {
    pagejson.total = data.length;
    pagejson.listData = data;
  });
};
const onTapChange = (data: any) => {
  console.log(data);
  getListData();
};
onBeforeMount(() => {
  getListData();
});
</script>
