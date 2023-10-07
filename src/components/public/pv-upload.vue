<template>
  <el-upload
    action="#"
    ref="uploadHtml"
    :show-file-list="item.showFileList"
    :http-request="httpRequest"
    :limit="item.limit || 9"
    :file-list="pvupload.fileList"
    :list-type="pvupload.listType"
    :multiple="item.multiple || true"
    :headers="item.headers"
    :on-exceed="onExceed"
    :drag="item.drag"
    :data="item.params"
    :auto-upload="item.autoUpload"
    :on-remove="onChangeRemove"
    :before-upload="onBeforeUpload">
    <template v-if="pvupload.listType != 'picture-card'">
      <el-button size="default" type="primary">点击上传</el-button>
    </template>
    <template v-else>
      <el-icon><Plus /></el-icon>
    </template>
    <template v-if="item.placeholder" #tip>
      <div
        :class="item.placeholderClassName || 'text-danger'"
        v-html="item.placeholder"></div>
    </template>
  </el-upload>
</template>

<script setup lang="ts" name="pv-upload">
const data = ref();
const uploadHtml: any = ref();
const props = defineProps<{ item: any }>();
const emit = defineEmits(['change']);
const pvupload: any = reactive({
  fileList: [],
  listType: props.item.listType ?? 'picture-card'
});
const httpRequest = async (params: any) => {
  const forms = new FormData();
  forms.append('files', params.file);

  if (props.item.load) {
    const { data } = await request(beforeAxiosEnter(props.item, forms));
    data.value = pvupload.fileList.map((item: any) => item.url);
    data.value.push(data);
    emit('change', data);
  }
};

const initFileData = (files: Array<string>) => {
  files.map((item: string) => {
    const file: any = item.match(/\w+\.\w{3}/g);

    pvupload.fileList.push({
      name: file.at(-1),
      url: item,
      uid: new Date().getTime() * Math.random()
    });
  });
};

const onChangeRemove = (file: object, fileList: Array<any>) => {
  pvupload.fileList = fileList;
  emit(
    'change',
    fileList.map((file) => file.url)
  );
};

const onExceed = () => {
  MessageBox({
    type: 'error',
    message: '上传以达到限线'
  });
};
const onBeforeUpload = (file: any) => {
  if (
    !file.name.match(new RegExp(props.item.fileType)) &&
    props.item.fileType
  ) {
    MessageBox({
      type: 'error',
      message: `上传的文件只能是${file.name.match(/\w+$/)}格式`
    });
    return false;
  } else if (file.size == props.item.fileSize) {
    MessageBox({
      type: 'error',
      message: `上传的文件不能超过${props.item.fileSize}`
    });
    return false;
  } else {
    return file;
  }
};

onBeforeMount(() => {
  if (data) {
    if (Array.isArray(data)) {
      initFileData(data);
    }
    if (data instanceof String) {
      initFileData(data.split(','));
    }
  }
});

onBeforeUnmount(() => uploadHtml.value.clearFiles());
defineExpose({
  uploadHtml,
  data
});
</script>
