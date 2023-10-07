<template>
  <template v-if="isImage(icon)">
    <el-image
      v-for="(item, key) in previewImageList(icon)"
      :key="key"
      :src="item"
      :class="option.className"
      :lazy="option.lazy"
      :fit="option.fit || 'cover'"
      :alt="option.alt"
      :preview-src-list="previewImageList(icon)">
      <template #error>
        <div class="image-error" @click="onChange"></div>
      </template>
      <template #placeholder>
        <div class="image-placeholder"></div>
      </template>
    </el-image>
  </template>
  <template v-else>
    <span :class="[icon, option.className]" @click="onChange"></span>
  </template>
</template>

<script setup lang="ts" name="pv-image">
const emit = defineEmits(['change']);
const props = defineProps<{ option: any; icon: string }>();
const router = useRouter();
const imagePlaceholder =
  'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg';
const onChange = () => {
  const path = props.option.path;
  if (path) {
    router.push(path);
  } else {
    emit('change');
  }
};
const previewImageList = (data: any) => {
  if (Array.isArray(data)) {
    return data;
  } else {
    return data.split(',');
  }
};
const isImage = (icon: any) => {
  let loop = false;
  if (Array.isArray(icon)) {
    icon.map((name) => {
      loop = name.match(/\.(png|jpeg|gif|svg)$/g) ? true : false;
    });
  } else if (typeof icon == 'string') {
    loop = icon.match(/\.(png|jpeg|gif|svg)$/g) ? true : false;
  } else {
    loop = false;
  }
  if (icon == '') {
    loop = true;
  }
  return loop;
};
</script>
<style lang="scss" scoped>
.image-error {
  background-color: #fff;
  text-align: center;
  &:before {
    content: '加载失败';
  }
}
.image-placeholder {
  background-image: url(v-bind(imagePlaceholder));
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
