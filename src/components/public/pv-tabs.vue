<template>
  <el-tabs
    v-model="data"
    :tab-position="option.position || 'top'"
    :type="option.type || 'border-card'">
    <el-tab-pane
      v-for="(item, key) in pvtabs.tabsList"
      :key="key"
      :name="item.value">
      <template #label>
        <images :icon="item.icon" v-if="item.icon"></images>
        <span v-text="item.label" v-if="item.label"></span>
      </template>
      <component
        :style="pvtabs.styleValue"
        :is="item.component"
        :params="option.datas"
        :option="item.option"></component>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts" name="pv-tabs">
const props = defineProps<{ option: any }>();

const pvtabs: any = reactive({
  tabsList: props.option.items,
  styleValue: {
    height: props.option.height
  }
});
const data = ref(pvtabs.tabsList[0].value);

defineExpose({
  data
});
</script>
