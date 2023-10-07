<template>
  <section class="flex-col">
    <template v-for="(item, key) in pvlayout.options">
      <component
        :class="item.className"
        :is="item.component"
        ref="componenter"
        v-if="pvlayout.refresh && item.default"
        :option="item"
        :key="key"
        @change="onChange"></component>
    </template>
  </section>
</template>

<script setup lang="ts" name="pv-layout">
const componentHtml: any = ref(null);
const props = defineProps<{ option: any }>();
const pvlayout: any = reactive({
  options: Array<any> || [],
  refresh: true
});

const setInitReady = () => {
  pvlayout.options = [];
  const columns = props.option.column || null;
  const handles = props.option.handle || null;

  // 分发各个组件
  for (const cname in props.option) {
    const item: any = props.option[cname];

    // 跳过操作按钮、数据列
    if (!['handle', 'column'].includes(cname) && item) {
      item.items = [];
      item.ctype = cname;
      columns.map((citem: any, skey: number, array: Array<any>) => {
        const titem = Object.assign({}, citem);
        Object.keys(titem).map((name) => {
          if (name == 'visible') {
            if (isObject(titem[name])) {
              Object.keys(titem[name]).map((cname) => {
                if (item.ctype == cname && titem[name][cname]) {
                  titem[name] = titem[name][cname];
                  item.items.push(titem);
                }
              });
            } else {
              titem.visible && item.ctype != 'find' && item.items.push(titem);
            }
          }
        });
      });
      pvlayout.options.push(item);
    }
  }

  pvlayout.options.map((item: any, key: number, array: Array<any>) => {
    const items = JSON.parse(JSON.stringify(item.items));
    items.map((sitem: any) => {
      Object.keys(sitem).map((name) => {
        if (isObject(sitem[name])) {
          Object.keys(sitem[name]).map((cname) => {
            if (item.ctype == cname) {
              sitem[name] = sitem[name][cname];
            }
          });
        }
      });
      return sitem;
    });
    // 分发各个组件按钮
    const hitem = handles.find((hitem: any) => {
      if (item.ctype == hitem.ctype) {
        hitem.eltype = 'button';
        return hitem;
      }
    });
    hitem && items.push({ ...hitem });

    // 分发并处理各个组件component
    Object.keys(item).map((name) => {
      if (name != 'ctype') {
        array.map((oitem: any, skey: number) => {
          // 查找关联共用的组件
          if (oitem.ctype == item[name] && oitem[name]) {
            item[name] = oitem[name];
          }
        });
      }
    });
    item.items = items;
    return item;
  });
};

// 初始化页面
const setLayoutPage = async () => {
  await setInitReady();
  if (props.option.data) {
    pvlayout.options.map((sitem: any) => {
      if (sitem.ctype == 'view') {
        sitem.params = props.option.data || {};
      }
      return sitem;
    });
  }
};

// 处理事件
const onChange = async ({ data, item, eltype }: any) => {
  const componenteHtml = componentHtml.find((sitem: any) => {
    if (sitem.$options) {
      const {
        propsData: { option }
      } = sitem.$options;
      if (['dialog'].includes(option.ctype)) {
        return sitem;
      }
    }
  });
  switch (item.ctype) {
    case 'dialog':
      if (item.submit) {
        pvlayout.options.map((sitem: any) => {
          if (sitem.ctype == 'view') {
            sitem.params = '';
          }
          return sitem;
        });
      }
      pvlayout.refresh = !pvlayout.refresh;
      nextTick(() => {
        pvlayout.refresh = !pvlayout.refresh;
      });
      break;
    default:
      // 删除或者查询
      if (!item.option || item.submit) {
        pvlayout.options.map((sitem: any) => {
          if (sitem.ctype == 'view') {
            sitem.params = data || {};
          }
          return sitem;
        });
        pvlayout.refresh = !pvlayout.refresh;
        nextTick(() => {
          pvlayout.refresh = !pvlayout.refresh;
        });
      } else {
        // 查找弹窗组件
        const options: any = pvlayout.options.find(
          (sitem: any) => sitem.ctype == 'dialog'
        );
        options.title = item.text;
        options.data = data;

        // 赋值弹窗组件内容对应的组件
        pvlayout.options.map((citem: any) => {
          if (item.option == citem.ctype) {
            options.option = citem;
          }
        });
        // 弹窗内容赋值
        if (Array.isArray(item.params)) {
          const temjson: any = {};
          item.params.map(({ label, value }: any) => {
            temjson[label] = findObjectValue(data, value);
          });
          options.option.data = temjson;
        } else {
          options.option.data = data;
        }

        componenteHtml.open();
      }
      break;
  }
};

onBeforeMount(() => setLayoutPage());
defineExpose({
  componentHtml
});
</script>
