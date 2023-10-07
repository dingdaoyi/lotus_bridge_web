<template>
  <div class="flex-col">
    <pv-form
      class=""
      v-model="datas"
      :option="pagejson.dialogParams"
      @change="onTapChange"></pv-form>
  </div>
</template>

<script setup lang="ts" name="addForm">
import { dialogParams } from '@/scripts/plugin';
const emit = defineEmits(['change']);
const props: any = defineProps<{ option: any }>();
const datas = ref();
const pagejson: any = reactive({
  dialogParams,
  selectlist: []
});
const onTapChange = ({ data, item }: any) => {
  if (item.text) {
    emit('change', { data, item });
    return false;
  }
};
onBeforeMount(() => {
  pagejson.dialogParams.datas = props.option || {};
});
</script>
