<template>
  <el-menu :ellipsis="false" :default-active="defaultActive" mode="horizontal">
    <template v-for="(item, key) in items" :key="key">
      <el-menu-item
        v-if="item.meta.disabled"
        @click="onHandleSelect(item)"
        :index="item.path">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup lang="ts" name="pv-menu">
const route: any = useRoute();
const router = useRouter();
const defaultActive: any = ref(route.path);
const onHandleSelect = (item: any) => {
  router.push(item.path);
};
defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  },
  items: {
    type: Array<any>
  }
});
onBeforeMount(() => {});
</script>
