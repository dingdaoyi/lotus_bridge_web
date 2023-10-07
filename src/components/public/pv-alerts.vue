<template>
  <el-alert
    :type="option.type"
    :show-icon="option.showIcon ?? true"
    :closable="option.closable"
    :close-text="option.closeText ?? false">
    <template #title v-if="option.slot">
      <div v-html="option.title" class="font-weight"></div>
    </template>
    <template v-if="option.slot">
      <div v-html="option.description"></div>
    </template>
  </el-alert>
</template>

<script setup lang="ts" name="pv-alerts">
const router = useRouter();
const props = defineProps<{ option: any }>();
const pvalert: any = reactive({
  settime: null,
  count: 10
});
const setPageTitle = () => {
  pvalert.count--;
  if (pvalert.count) {
    pvalert.option.description = `剩余${fillNumber(
      pvalert.count
    )}s，将自动跳转`;
  } else {
    clearInterval(pvalert.settime);
    router.push(props.option.path);
  }
};
onBeforeMount(() => {
  if (props.option.autoskip) {
    setPageTitle();
    clearInterval(pvalert.settime);
    pvalert.settime = setInterval(setPageTitle, 1000);
  }
});
</script>
