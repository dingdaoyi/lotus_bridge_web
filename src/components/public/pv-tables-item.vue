<template>
  <el-table-column
    v-if="['selection', 'index'].includes(item.type)"
    :align="item.align || 'center'"
    :label="item.label"
    :type="item.type"
    :min-width="item.minWidth"
    :width="item.width"></el-table-column>
  <el-table-column
    v-else
    :align="item.align || 'center'"
    :label="item.label"
    :fixed="item.fixed"
    :prop="item.name"
    :type="item.type"
    :min-width="item.minWidth"
    :width="item.width"
    :header-align="item.headerAlign"
    :selectable="item.selectable"
    :show-overflow-tooltip="item.showOverflowTooltip"
    :reserve-selection="item.reserveSelectable"
    :filters="item.filters"
    :filter-placement="item.filterPlacement"
    :filtered-value="item.filteredValue"
    :resizable="item.resizable"
    :sort-orders="item.sortOrders"
    :sort-by="item.sortBy"
    :sortable="item.sortable"
    :column-key="item.columnKey"
    :index="item.index">
    <template #default="{ row }">
      <template v-if="item.eltype == 'scope'">
        <span v-html="setHtml(row, item)"></span>
      </template>

      <template v-else-if="item.eltype == 'switch'">
        <el-switch
          v-model="row[item.name]"
          :disabled="item.disabled"></el-switch>
      </template>
      <template v-else-if="item.eltype == 'image'">
        <images :icon="setLableText(row, item)" :option="item"></images>
      </template>
      <!-- 操作按钮 -->
      <template v-else-if="item.eltype == 'button'">
        <template v-for="(sitem, key) in item.list">
          <el-button
            v-if="sitem.visible"
            :key="key"
            :type="sitem.type"
            :data-item="row"
            :size="sitem.size"
            :icon="sitem.icon"
            :circle="sitem.circle"
            :disabled="sitem.disabled"
            :class="sitem.className"
            :plain="sitem.plain"
            :round="sitem.round"
            @click="onSubmit(sitem, row)">
            {{ sitem.text }}
          </el-button>
        </template>
      </template>

      <template v-else-if="item.eltype == 'link'">
        <template v-for="(sitem, key) in item.list">
          <el-link
            v-if="sitem.visible"
            :key="key"
            :type="sitem.type"
            :disabled="sitem.disabled"
            :underline="sitem.underline || false"
            :class="sitem.className"
            :icon="sitem.icon"
            @click="onSubmit(sitem, row)">
            {{ sitem.text }}
          </el-link>
        </template>
      </template>
      <template v-else-if="item.eltype == 'popover'">
        <el-popover
          :placement="item.placement || 'right-start'"
          :title="item.label"
          :popper-class="item.popperClass || 'popover-width'"
          :width="item.popoverWidth"
          v-if="setPopoverIsShow(row, item, false)"
          trigger="hover">
          <div class="" v-html="setLableText(row, item)"></div>
          <template #reference>
            <div
              class="line-clamp-1"
              ref="popover"
              v-html="setLableText(row, item)"></div>
          </template>
        </el-popover>
        <span
          v-else
          class="line-clamp-1"
          v-html="setPopoverIsShow(row, item, true)"
          :class="item.className"></span>
      </template>
      <template v-else>
        <span v-html="setLableText(row, item)" :class="item.className"></span>
      </template>
    </template>
  </el-table-column>
</template>

<script setup lang="ts" name="pv-table-item">
const props: any = defineProps<{ item: any }>();
const emit = defineEmits(['submit']);
const onSubmit = (item: object, row: object) => {
  emit('submit', {
    item,
    row
  });
};
const setHtml = (row: any, item: any) => {
  let htmlText = '';
  if (Array.isArray(item.list)) {
    const tempList: any = [];
    item.list.map((sitem: any) => {
      const vals = findObjectValue(row, item.request || item.name);
      if (Object.isExtensible(item.props)) {
        const { label, value } = item.props;
        if (item.multiple && vals.match(/\,/g)) {
          vals.split(',').map((key: string) => {
            if (key == sitem[value]) {
              tempList.push(findObjectValue(sitem, label));
            }
          });
        } else if (vals == sitem[value]) {
          tempList.push(findObjectValue(sitem, label));
        }
      } else if (vals == sitem.value) {
        tempList.push(sitem.label || '');
      }

      htmlText = tempList.join(',');
    });
  } else {
    htmlText = '';
  }
  return htmlText;
};

const setPopoverIsShow = (row: object, item: any, text: boolean) => {
  const conetent = findObjectValue(row, item.request || item.name);
  const length = Math.ceil(Number(item.width || item.minWidth) / 14);
  if (conetent) {
    if (text) {
      if (conetent.length > length) {
        return conetent.substring(0, length);
      } else {
        return conetent;
      }
    } else {
      return conetent.length > length;
    }
  }
};
const setLableText = (row: object, item: any) => {
  const conetent = findObjectValue(row, item.request || item.name);

  if (item.eltype == 'popover') {
    return conetent.replace(/\s+/g, '<br/>');
  } else {
    // return conetent || item.placeholder;
    return conetent;
  }
};
</script>
