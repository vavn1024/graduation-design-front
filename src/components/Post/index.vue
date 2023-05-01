<template>
  <a-modal
    :width="520"
    :visible="visible"
    @cancel="handleCancel"
    :footer="null"
    :unmount-on-close="false"
    title-align="start"
  >
    <template #title>
      <span class="font18">{{ title }}</span>
    </template>

    <a-textarea placeholder="请写下来吧" :max-length="3000" show-word-limit v-model="formData.content"/>



    <a-button
      :loading="loading"
      @click="handleSubmit"
      html-type="submit"
      type="primary"
      >发帖</a-button
    >
  </a-modal>
</template>
<script lang="ts" setup>
import {reactive} from "vue";

const formData=reactive({
  content:""
})

const handleSubmit = () => {
  console.log(formData)
}
</script>
<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
  props: {
    title: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["cancel", "ok"],
  setup(_, { emit }) {
    const handleCancel = () => emit("cancel");
    const handleSubmit = () => emit("ok");

    return {
      handleCancel,
      // handleSubmit,
    };
  },
});
</script>
<style lang="less">
.arco-modal {
  background: rgba(0, 0, 0, 0);
  max-width: 520px;
  min-width: 200px;
  width: 87%!important;
}
.arco-modal-header {
  background: rgba(25, 35, 32, 0.85);
  flex-shrink: 0;
  border-bottom: none;
  border-radius: 12px 12px 0 0 !important;
}
.arco-modal-body {
  background: rgb(25, 35, 32);
  border-radius: 0 0 12px 12px !important;
}
.arco-modal-close-btn {
  color: #dee7e4;
  font-size: 14px;
}
.arco-modal-close-btn:hover {
  color: rgba(25, 35, 32, 0.85);
}
.arco-modal-mask {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}
.arco-textarea-wrapper {
  background: none;
}
.arco-textarea-wrapper:hover {
  background: none;
  border-color: #b4e900;
}
.arco-textarea {
  background: rgb(25, 35, 32);
  color: #dee7e4;
}
.arco-textarea-focus {
  background: none;
  border-color: #b4e900!important;
}
</style>
