<template>
  <section class="flex-col">
    <div class="header-box">
      <layot-search
        title="LotusBridge边缘计算"
        class="width-full padding-30 margin-bottom-10"></layot-search>
      <pv-menu :items="pages.menusList"></pv-menu>
    </div>

    <div class="flex flex-col overflowy-auto">
      <router-view class="flex padding-20 overflowy-auto"></router-view>
    </div>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: 'layout'
});

const pages = reactive({
  title: '',
  icon: '',
  visible: false,
  headers: null,
  isCollapse: false,
  menusList: []
});

const { options } = useRouter();
const plat = inject('plat');

onBeforeMount(() => {
  const routes = options.routes;
  routes.map((item: any) => {
    if (item.meta.root) {
      pages.menusList = item.children;
      document.title = item.meta.title;
    }
  });
});
</script>
