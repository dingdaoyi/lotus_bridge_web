<template>
  <el-sub-menu :index="item.path">
    <template #title>
      <el-icon :size="18">
        <component v-if="item.meta.icon" :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </template>
    <template v-for="(sitem, key) in item.children">
      <el-menu-item v-if="!sitem.children" :key="key" :index="sitem.path">
        {{ sitem.meta.title }}
      </el-menu-item>
      <pv-submenu :key="key" v-if="sitem.children" :item="sitem"></pv-submenu>
    </template>
  </el-sub-menu>
</template>

<script setup lang="ts" name="pv-submenu">
defineProps<{
  item: any;
}>();
</script>
<style lang="scss" scoped>
.flex-row {
  padding: unit(10) unit(20);
}
.menu-active {
  transform: rotate(180deg);
}
</style>
