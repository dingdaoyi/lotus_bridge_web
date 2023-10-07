<template>
  <section class="padding-2 height-full flex-col">
    <div class="margin-bottom-2 bgc-linen padding-1">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <router-view class="height-full flex overflowy-auto"></router-view>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: 'main'
});
const route = useRoute();
</script>
