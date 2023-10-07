<template>
  <el-checkbox-group
    ref="checkbox"
    v-model="data"
    :text-color="item.textColor"
    :fill="item.fill"
    :min="item.minlength"
    :max="item.maxlength"
    :disabled="item.disabled"
    :size="item.size"
    @change="onChange">
    <template v-for="(sitem, skey) in item.list">
      <el-checkbox-button
        v-if="item.type"
        :key="skey"
        :disabled="sitem.disabled"
        :label="sitem.value">
        {{ sitem.label }}
      </el-checkbox-button>
      <template v-else>
        <el-checkbox
          :key="skey"
          :disabled="sitem.disabled"
          :label="sitem.value">
          {{ sitem.label }}
        </el-checkbox>
      </template>
    </template>
  </el-checkbox-group>
</template>

<script setup lang="ts" name="pv-checkbox">
const emit = defineEmits(['change']);
const data = ref();
const onChange = (val: any) => emit('change', val);
defineProps<{ item: any }>();
defineExpose({
  data
});
</script>
