<template>
  <div class="flex-col">
    <pv-form
      class=""
      v-model="datas"
      ref="pvpages"
      :option="pagejson.dialogParams"
      @change="onTapChange"></pv-form>
    <div></div>
  </div>
</template>

<script setup lang="ts" name="addForm">
import { dialogParams } from '@/scripts/southward';
const emit = defineEmits(['change']);
const props: any = defineProps<{ option: any }>();
const datas = ref();
const pagejson: any = reactive({
  dialogParams,
  selectlist: []
});
const onTapChange = ({ data, item }: any, loop = false) => {
  if (item.text) {
    emit('change', { data, item });
  }
};
onBeforeMount(() => {
  pagejson.dialogParams.datas = props.option || {};
});
</script>
