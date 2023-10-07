<template>
  <el-form-item
    :align="item.align"
    :prop="item.name"
    :rules="item.rules"
    :show-message="item.showMessage"
    :inline-message="item.inlineMessage">
    <template v-if="item.label" #label>
      <div class="inline-block" :class="item.labelClassName">
        <span v-if="item.required" style="color: #f00">*</span>
        <span v-html="`${item.label}:`"></span>
      </div>
    </template>
    <div class="width-full" :class="item.itemClassName">
      <!-- switch -->
      <template v-if="item.eltype == 'switch'">
        <el-switch
          v-model="option[item.name]"
          :active-color="item.activeColor"
          :inactive-color="item.inactiveColor"
          :active-icon-class="item.activeIconClass"
          :inactive-icon-class="item.inactiveIconClass"
          :disabled="item.disabled"
          :inactive-value="item.inactiveValue"
          :active-value="item.activeValue"
          :active-text="item.activeText"
          :inactive-text="item.inactiveText"></el-switch>
      </template>
      <template v-if="item.eltype == 'date'">
        <pv-date v-model="option[item.name]" :item="item"></pv-date>
      </template>

      <template v-if="item.eltype == 'rate'">
        <pv-rate v-model="option[item.name]" :item="item"></pv-rate>
      </template>
      <!-- 时间 -->
      <template v-if="item.eltype == 'time'">
        <pv-time
          v-model="option[item.name]"
          :item="item"
          :option="option"></pv-time>
      </template>
      <template v-if="item.eltype == 'number'">
        <pv-number
          v-model="option[item.name]"
          :item="item"
          :option="option"></pv-number>
      </template>
      <!-- input -->
      <template v-if="item.eltype == 'input'">
        <pv-input v-model="option[item.name]" :item="item"></pv-input>
      </template>
      <template v-if="item.eltype == 'checkbox'">
        <pv-checkbox v-model="option[item.name]" :item="item"></pv-checkbox>
      </template>
      <template v-if="item.eltype == 'radio'">
        <pv-radio v-model="option[item.name]" :item="item"></pv-radio>
      </template>
      <template v-if="item.eltype == 'color'">
        <pv-color v-model="option[item.name]" :item="item"></pv-color>
      </template>
      <template v-if="item.eltype == 'content'">
        <div
          v-html="item.placeholder"
          :class="item.className"
          @click="onSubmit(item)"></div>
      </template>
      <template v-if="item.eltype == 'editor'">
        <pv-editor
          :item="item"
          :option="option"
          v-model="option[item.name]"></pv-editor>
      </template>
      <template v-if="item.eltype == 'select'">
        <pv-select
          :item="item"
          @change="onChange"
          v-model="option[item.name]"></pv-select>
      </template>
      <template v-if="item.eltype == 'upload'">
        <pv-upload :item="item" v-model="option[item.name]"></pv-upload>
      </template>
      <template v-if="item.eltype == 'tree'">
        <pv-tree
          v-model="option[item.name]"
          :item="item"
          :option="option"></pv-tree>
      </template>
      <template v-if="item.eltype == 'authCode'">
        <pv-code
          v-model="option[item.name]"
          :value="option[item.name]"
          :item="item"
          :option="option"></pv-code>
      </template>
      <!-- 组件 -->
      <template v-if="item.eltype == 'component'">
        <component
          v-model="option[item.name]"
          :is="item.component"
          :item="item"
          :option="option"></component>
      </template>
      <template v-if="item.eltype == 'button'">
        <template v-for="(sitem, key) in item.list">
          <el-button
            v-if="sitem.visible"
            :key="key"
            :type="sitem.type"
            :size="sitem.size"
            :icon="sitem.icon"
            :circle="sitem.circle"
            :disabled="sitem.disabled"
            :class="sitem.className"
            :plain="sitem.plain"
            :round="sitem.round"
            @click="onSubmit(sitem)">
            {{ sitem.text }}
          </el-button>
        </template>
      </template>
      <template v-if="item.eltype == 'link'">
        <template v-for="(sitem, key) in item.list">
          <el-link
            v-if="sitem.visible"
            :key="key"
            :type="sitem.type"
            :disabled="sitem.disabled"
            @click="onSubmit(sitem)">
            {{ sitem.text }}
          </el-link>
        </template>
      </template>
      <template v-if="item.slotName">
        <slot :row="item" :name="item.slotName" :option="option"></slot>
      </template>
    </div>
  </el-form-item>
</template>

<script setup lang="ts" name="pv-form-item">
const prosp: any = defineProps<{ option: any; item: any }>();
const emit = defineEmits(['submit', 'change']);
const onChange = async ({ data, item }: any) => {
  emit('change', { data, item });
};
const onSubmit = async (item: any) => {
  emit('submit', item);
};
</script>
