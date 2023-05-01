<template>
  <a-modal
    :width="width"
    :visible="visible"
    @cancel="handleCancel"
    :footer="null"
    :unmount-on-close="unmount_on_close"
    title-align="start"

  >
    <template #title>
      <span class="font18">{{ title }}</span>
    </template>

    <slot></slot>
<!--    <a-row>-->
<!--      <a-col style="width: 110px" />-->
<!--      <a-col :span="16" class="rowE">-->
<!--        <a-space>-->
<!--          <a-button @click="handleCancel">取消</a-button>-->
<!--          <a-button :loading="loading" @click="handleSubmit" html-type="submit" type="primary">{{-->
<!--            okText-->
<!--          }}</a-button>-->
<!--        </a-space>-->
<!--      </a-col>-->
<!--    </a-row>-->
  </a-modal>
</template>

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
    okText: {
      type: String,
      default: "创建",
    },
    width:{
      type: Number,
      default: 370,
    },
    showCancel: {
      type: Boolean,
      default: true,
    },
    unmount_on_close:{
      type: Boolean,
      default: true,
    }
  },
  emits: ["cancel", "ok"],
  setup(_, { emit }) {
    const handleCancel = () => emit("cancel");
    const handleSubmit = () => emit("ok");

    return {
      handleCancel,
      handleSubmit,
    };
  },
});
</script>
<style>
.arco-modal{
  background: rgba(0,0,0,0);
  /*width: 370px!important;*/
}
.arco-modal-header{
  background: rgba(25, 35, 32, 0.85);
  flex-shrink: 0;
  border-bottom: none;
  border-radius:12px 12px 0 0!important;
}
.arco-modal-body{
  background: rgb(25, 35, 32);
  border-radius:0 0 12px 12px!important;
}
.arco-modal-close-btn{
  color: #dee7e4;
  font-size: 14px;
}
.arco-modal-close-btn:hover{
  color: rgba(25, 35, 32, 0.85);
}
.arco-modal-mask{
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter:blur(4px);
}
</style>
