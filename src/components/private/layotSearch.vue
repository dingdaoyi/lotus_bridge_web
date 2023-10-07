<template>
  <header class="flex-row align-center">
    <div class="align-center flex text-center">
      <div class="header-title" v-html="title"></div>
    </div>
    <div class="gap-10 flex-row align-center">
      <el-icon
        :color="theme.status == 'Sunny' ? '#ffffff' : '#0b0d15'"
        size="24"
        @click="onTapSetTheme">
        <component :is="theme.status"></component>
      </el-icon>
      <el-avatar :size="30" src="" />
      <el-dropdown trigger="click" @command="onTapChange">
        <div class="text-whiter">
          {{ userInfo.name }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="/userInfo">个人信息</el-dropdown-item>
            <el-dropdown-item command="/login">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <slot></slot>
  </header>
</template>

<script setup lang="ts" name="layotSearch">
const userInfo = getUserInfo();
const router = useRouter();
const theme: any = computed(() => getAppTheme());
const onTapSetTheme = () => {
  setAppTheme({
    status: theme.value.status == 'Sunny' ? 'Moon' : 'Sunny'
  });
};

const setTheme = () => {
  const el = document.documentElement;
  const themejson: any = {
    Moon: {
      '--head-color': ' #f5faff 5%, #e1eeff 95%',
      '--el-bg-color': '#eaf3ff',
      '--el-text-color': '#ffffff',
      '--el-messagebox-title-color': '#ffffff',
      '--el-border-color': '#c1d1e1',
      '--title-color': '90deg, #5a7793, #5f84a5',
      '--el-menu-text-color': '#0b0d15',
      '--el-text-color-regular': '#0b0d15',
      '--el-table-color': '#fff'
    },
    Sunny: {
      '--head-color': '#1f4063 5%, #0b0f17 95%',
      '--el-table-color': '#f00',
      '--el-bg-color': '#0b0d15',
      '--el-text-color': '#0b0d15',
      '--el-messagebox-title-color': '#0b0d15',
      '--el-border-color': '#363b40',
      '--title-color': '90deg, #fcfcfe, #bcdde7',
      '--el-menu-text-color': '#ffffff',
      '--el-text-color-regular': '#ffffff'
    }
  };
  const themes = themejson[theme.value.status];
  Object.keys(themes).map((name) => {
    el.style.setProperty(name, themes[name]);
  });
};
watch(theme, () => setTheme());
const onTapChange = (path: string) => {
  router.push(path);
};
onBeforeMount(() => {
  setTheme();
});
defineProps<{
  title: string;
}>();
</script>
