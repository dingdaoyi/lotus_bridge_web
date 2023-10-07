<template>
  <div class="flex-col">
    <pv-form
      class=""
      v-model="datas"
      :option="pagejson.dialogParams"
      @change="onTapChange"></pv-form>
    <div></div>
  </div>
</template>

<script setup lang="ts" name="addForm">
import { dialogParams, rustapi } from '@/scripts/group';

const route = useRoute();
const emit = defineEmits(['change']);
const props: any = defineProps<{ option: any }>();
const datas = ref();
const pagejson: any = reactive({
  dialogParams
});
const onTapChange = ({ data, item }: any, loop = false) => {
  if (item.text) {
    emit('change', { data, item });
    return false;
  }
};
onBeforeMount(() => {
  pagejson.dialogParams.datas = props.option || {};
  pagejson.dialogParams.datas.device_id = Number(route.query.id);
});
</script>
