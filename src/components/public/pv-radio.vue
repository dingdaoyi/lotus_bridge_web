<template>
  <el-radio-group
    v-model="data"
    :text-color="item.textColor"
    :disabled="item.disabled"
    :fill="item.fill"
    :size="item.size">
    <template v-for="(sitem, skey) in item.list">
      <el-radio-button v-if="item.type" :key="skey" :label="sitem.value">
        {{ sitem.label }}
      </el-radio-button>
      <template v-else>
        <el-radio :label="sitem.value" :key="skey">{{ sitem.label }}</el-radio>
      </template>
    </template>
  </el-radio-group>
</template>

<script setup lang="ts" name="pv-radio">
const data = ref();
defineProps<{ item: any }>();
defineExpose({
  data
});
</script>
