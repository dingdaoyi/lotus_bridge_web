<template>
  <div class="flex-row flex-wrap gap-20 justify-start flex" ref="itemList">
    <div
      class="flex-col border radius-15 slice-15 item-body flex"
      v-for="item in listData">
      <div class="flex flex-row padding-bottom-10">
        <div class="flex-col width-180">
          <div class="text-color text-center">线上</div>
          <img
            class="flex"
            :src="item.images"
            alt="" />
        </div>
        <div class="flex flex-col" :class="item.itemClassName">
          <article class="flex-col flex">
            <h2 class="item-title">{{ item.datas[item.title] }}</h2>
            <dl class="flex-row text-color flex" v-for="sitem in item.items">
              <dd>{{ sitem.label }}</dd>
              <dd class="flex">{{ item.datas[sitem.value] }}</dd>
            </dl>
          </article>
          <dl
            v-if="item.counts"
            class="flex-row item-title padding-top-bottom-10 flex">
            <dd class="flex text-center" v-for="sitem in item.counts">
              <p class="font-weight font-30">{{ item.datas[sitem.value] }}</p>
              <p>{{ sitem.label }}</p>
            </dd>
          </dl>
        </div>
      </div>
      <div class="flex-row border-top padding-top-20 text-center">
        <span
          class="padding-top-bottom-2 flex"
          :class="[sitem.className, skey && 'border-left']"
          @click="onTapChange(sitem, item)"
          v-for="(sitem, skey) in item.list">
          {{ sitem.text }}
        </span>
      </div>
    </div>
  </div>
  <div class="flex-row justify-end padding-20">
    <pv-pagin :option="pagejson"></pv-pagin>
  </div>
</template>

<script setup lang="ts" name="itemList">
const props = defineProps<{ options: any; datas: Array<any>; pagejson: any }>();
const emit = defineEmits(['change', 'load']);
const listData: any = computed(() => {
  return props.datas.map((item) => {
    return Object.assign({}, { datas: item }, props.options);
  });
});
const theme: any = computed(() => getAppTheme());

const setTheme = () => {
  const el = document.documentElement;
  const themejson: any = {
    Moon: {
      '--item-bg': '180deg, #c0e6ff, #eaf3ff',
      '--item-border': 'top, #ffffff, #dce7f1',
      '--item-color': '#6e859a',
      '--item-title': '#496279',
      '--el-messagebox-title-color': '#ffffff',
      '--el-border-color': '#c1d1e1'
    },
    Sunny: {
      '--item-bg': '180deg, #14344b, #0b0f17',
      '--item-border': 'top, #3d6378, #32383c',
      '--item-title': '#ffffff',
      '--el-messagebox-title-color': '#0b0d15',
      '--item-color': '#ffffff',
      '--el-border-color': '#363b40'
    }
  };
  const themes = themejson[theme.value.status];
  Object.keys(themes).map((name) => {
    el.style.setProperty(name, themes[name]);
  });
};
watch(theme, () => setTheme());
onBeforeMount(() => {
  setTheme();
});
const itemList = ref(null);
const router = useRouter();

const elheight = computed(() => {
  const height = getHtmlStyle(itemList.value, 'height');
  return Math.abs(Number(height.replace('px', '')) / 2 + 10) + 'px';
});
const elwidth = computed(() => {
  const width = getHtmlStyle(itemList.value, 'width');
  return Math.abs(Number(width.replace('px', '')) / 4 - 12.5) + 'px';
});
const onTapChange = async (sitem: any, item: any) => {
  if (sitem.path) {
    const params = jsonToGetData(getParams(sitem, item.datas));
    router.push(sitem.path + params);
  } else if (sitem.load) {
    const params = beforeAxiosEnter(sitem, item.datas);
    const confirm = await ElMessageBox({
      title: '温馨提示',
      message: '确认该操作么？',
      showCancelButton: true,
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    });

    confirm &&
      request(params).then(() => {
        emit('load');
      });
  } else {
    emit('change', { item: sitem, data: item.datas });
  }
};
</script>
<style lang="scss" scoped>
.item-body {
  @include bgramp('line', (var(--item-bg)));
  @include bdramp('line', (var(--item-border)));
  min-width: v-bind(elwidth);
  max-width: v-bind(elwidth);
  max-height: v-bind(elheight);
  min-height: v-bind(elheight);
  padding: unit(22);
}
.item-title {
  color: var(--item-title);
}
.text-color {
  color: var(--item-color);
}
</style>
