<template>
  <el-rate
    ref="rateHtml"
    v-model="data"
    :allow-half="item.allowHalf"
    :high-threshold="item.highThreshold"
    :low-threshold="item.lowThreshold"
    :disabled-void-color="item.disabledVoidColor"
    :colors="item.colors"
    :max="item.maxlength"
    :show-text="item.showText"
    :show-score="item.showScore"
    :text-color="item.showText"
    :texts="item.texts"></el-rate>
</template>

<script setup lang="ts" name="pv-rate">
const data = ref();
const rateHtml: any = ref(null);
defineProps<{ item: any }>();

onBeforeUnmount(() => rateHtml.value.resetCurrentValue());
defineExpose({
  rateHtml,
  data
});
</script>
