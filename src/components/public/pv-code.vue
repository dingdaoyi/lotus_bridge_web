<template>
  <pv-input :item="item" v-model="pvcode.data">
    <template #append>
      <pv-image
        :option="{ className: 'width-150 height-53 margin-left-16 radius-5' }"
        :icon="pvcode.codePath"
        @change="getItemLoad"></pv-image>
    </template>
  </pv-input>
</template>

<script setup lang="ts" name="pv-code">
const props = defineProps<{ item: any; option: any }>();
const pvcode = reactive({
  codePath: '',
  data: ''
});
const getItemLoad = async () => {
  const data = await request(beforeAxiosEnter(props.item, props.option));
  pvcode.codePath = await findObjectValue(data, props.item.request);
};

// onBeforeMount(() => getItemLoad());
defineExpose({ data: pvcode.data });
</script>
