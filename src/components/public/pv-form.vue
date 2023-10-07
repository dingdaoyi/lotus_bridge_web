<template>
  <el-form
    ref="formHtml"
    :model="pvform.data"
    :inline="pvform.inline"
    :rules="pvform.rules"
    hide-required-asterisk
    :class="option.className"
    scroll-to-error
    :disabled="option.disabled"
    :label-position="option.labelPosition ?? 'right'"
    :status-icon="option.statusIcon"
    :label-width="option.labelWidth"
    :show-message="option.showMessage"
    :inline-message="option.inlineMessage">
    <slot
      v-if="option.prepend"
      :name="option.prepend"
      :row="pvform.data"></slot>
    <!-- 表单多列显示 -->
    <template v-if="pvform.span">
      <el-row :gutter="option.gutter ?? 20">
        <template v-for="(item, key) in pvform.items">
          <el-col
            :span="item.span ? item.span : pvform.span"
            :key="key"
            v-if="item.visible">
            <pv-form-item
              :option="pvform.data"
              :item="item"
              v-model="pvform.data"
              @change="onChange"
              @submit="onSubmit">
              <template #[item.slotName]="{ row, option }">
                <slot :name="row.slotName" :option="option" :row="row"></slot>
              </template>
            </pv-form-item>
          </el-col>
        </template>
      </el-row>
    </template>
    <!-- 表单非多列显示 -->
    <template v-else>
      <template v-for="(item, key) in pvform.items">
        <pv-form-item
          :option="pvform.data"
          v-if="item.visible"
          :key="key"
          :item="item"
          v-model="pvform.data"
          @change="onChange"
          @submit="onSubmit">
          <template #[item.slotName]="{ row, option }">
            <slot :name="row.slotName" :option="option" :row="row"></slot>
          </template>
        </pv-form-item>
      </template>
    </template>
    <slot v-if="option.append" :name="option.append" :row="pvform.data"></slot>
  </el-form>
</template>

<script setup lang="ts" name="pv-form">
import { it } from 'element-plus/es/locale';

const emit = defineEmits(['change', 'submit', 'beforeSubmit']);
const formHtml: any = ref();
const router = useRouter();
const props: any = defineProps<{ option: any }>();
const pvform = reactive({
  loading: false,
  items: props.option.items.length ? props.option.items : [],
  rules: props.option.rules || null,
  span: props.option.span || 0,
  inline: props.option.span ? false : props.option.inline,
  data: props.option.datas || {},
  loads: []
});

// 获取列表数据
const getSeletList = async (item: any) => {
  const { data } = await request(beforeAxiosEnter(item, pvform.data));
  return data.flat().map((sitem: any) => {
    const { label, value } = item.props;
    sitem.label = sitem[label];
    sitem.value = findObjectValue(sitem, value);
    return sitem;
  });
};
const setDynamicItem = (datas: any, name: string) => {
  const items = [].concat(props.option.items);
  let list: any = [];
  if (datas && Array.isArray(datas)) {
    list = datas.map((ditem: any) => {
      ditem.visible = true;
      ditem[name] = true;
      return ditem;
    });
  } else if (datas && typeof datas == 'string') {
    list = JSON.parse(datas).map((ditem: any) => {
      ditem.visible = true;
      ditem[name] = true;
      return ditem;
    });
  }
  items.map((sitem: any, key: number, array: Array<any>) => {
    if (sitem.insert) {
      array.splice(key, 1, sitem, ...list);
    }
  });
  pvform.items = items;
};

const getDynamicFormItem = ({ data, item }: any) => {
  const params = beforeAxiosEnter(item.dynamic, pvform.data);

  if (item.dynamic.load) {
    request(params).then(({ data }) => {
      const datas = findObjectValue(data, item.dynamic.request);
      if (Array.isArray(datas)) {
        setDynamicItem(datas, item.dynamic.name);
      }
    });
  } else {
    const datas = item.list.find((fitem: any) => {
      if (fitem[item.props.value] == data || fitem[item.props.label] == data) {
        return fitem;
      }
    });
    setDynamicItem(
      findObjectValue(datas, item.dynamic.request),
      item.dynamic.name
    );
  }
};
const onChange = ({ data, item }: any) => {
  if (isObject(item.dynamic)) {
    getDynamicFormItem({ data, item });
  } else {
    emit('change', { data: pvform.data, item });
  }
};
// 关联请求数据处理
const formFindCascader = ({ cascader }: any, data: any) => {
  pvform.items.map((item: any) => {
    if (cascader) {
      cascader.map(({ label, value, request }: any) => {
        if (label == item.name) {
          if (item.list) {
          } else {
            pvform.data[label] = request ? data[request] : value || '';
          }
        }
      });
    }

    return item;
  });
};
// 控制字段显示
const formFindControl = async (item: any, array: any) => {
  if (Array.isArray(item.control) && item.control.length) {
    await item.control.map(async (citem: any) => {});
  }
};
const setInitFormItem = () => {
  pvform.items.map((item: any) => {
    if (item.name && item.visible) {
      const svalue = findObjectValue(pvform.data, getName(item));
      pvform.data[item.name] = isNull(svalue, item);
      if (!pvform.rules && ((!item.rules && item.pattern) ?? item.required)) {
        item.rules = [
          {
            required: item.required ?? false,
            trigger: 'change',
            message: item.placeholder,
            pattern: validation[item.pattern ?? 'content'] ?? item.pattern
          }
        ];
      }
    }
    return item;
  });
};
const getFormsJson = () => {
  pvform.items.map(async (item: any) => {
    if (item.name && item.load && item.list) {
      item.list = await getSeletList(item);
    }
    if (isObject(item.dynamic) && item.name) {
      pvform.data = Object.assign(
        {},
        pvform.data,
        pvform.data[item.dynamic.name]
      );
      getDynamicFormItem({
        data: pvform.data[item.name],
        item
      });
    }
  });
};
const setFormInit = ({ data, items }: any) => {
  pvform.data = Object.assign({}, pvform.data, data);
  pvform.items = items;
  getFormsJson();
};
// 重组动态参数
const setDynamicParams = () => {
  const items = [].concat(pvform.items);
  const params = Object.assign({}, pvform.data);
  const tempjson: any = {};
  const sitem: any = items.find((item: any) => {
    if (isObject(item.dynamic) && item.dynamic.name) {
      return item;
    }
  });
  if (sitem) {
    tempjson[sitem.dynamic.name] = {};
    items.map((item: any) => {
      if (item[sitem.dynamic.name]) {
        tempjson[sitem.dynamic.name][item.name] = params[item.name];
        delete params[item.name];
      }
    });
  }
  return Object.assign({}, params, tempjson);
};
const getLoadOrParams = (item: any) => {
  let sitem = item;
  if (Array.isArray(item.load) && item.loadType == 'or') {
    sitem = pvform.data[item.nodekey] ? item.load[1] : item.load[0];
  }
  return sitem;
};

const httpRequest = ({ item, datas }: any) => {
  const params = beforeAxiosEnter(getLoadOrParams(item), datas);
  if (pvform.loading) return;
  pvform.loading = true;
  request(params)
    .then(({ data }: any) => {
      pvform.loading = false;
      if (Array.isArray(item.load) && item.loadType == 'and') {
        pvform.loads.length && httpRequest({ item, datas });
        pvform.loads.splice(0, 1);
      } else {
        if (item.pinia) {
          item.pinia(data);
        }
        if (item.path) {
          const params = jsonToGetData(getParams(item, datas));
          router.push(item.path + params);
        } else {
          emit('change', { data: datas, item });
        }
      }
    })
    .catch(() => {
      pvform.loading = false;
    });
};
const onSubmit = (item: any) => {
  const datas = setDynamicParams();
  emit('beforeSubmit', { data: pvform.data, item });
  if (item.load) {
    pvform.loads = Array.isArray(item.load) ? item.load : [];
    formHtml.value.validate((valid: any) => {
      if (valid) {
        httpRequest({ item, datas });
      }
    });
  } else {
    if (item.pinia) {
      item.pinia(pvform.data);
    }
    if (item.path) {
      const params = jsonToGetData(getParams(item, datas));
      router.push(item.path + params);
    } else {
      emit('change', { data: pvform.data, item });
    }
  }
};
onBeforeMount(() => setInitFormItem());
onMounted(() => getFormsJson());
onBeforeUnmount(() => formHtml.value.resetFields());
defineExpose({
  data: pvform.data,
  setFormInit
});
</script>
<style lang="scss" scoped>
.el-form :deep(.el-row) {
  .el-input,
  .el-select,
  .el-input__wrapper {
    width: 100%;
  }
}
</style>
