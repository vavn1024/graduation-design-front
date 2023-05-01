<template>
  <a-popover :title="title" :trigger="trigger" :position="position" content-class="popover-content" arrow-class="popover-arrow">
    <slot></slot>
    <template #content>
      <slot name="content"></slot>
    </template>

  </a-popover>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: "",
    },
    trigger:{
      type:String,
      default:"",
    },
    position:{
      type:String,
      default:"",
    },
  },

  setup(_) {


    return {

    };
  },
});
</script>

<style lang="less">
.arco-popover-popup-content{
  padding: 8px 0;
}
.popover-content{
  border: none;
  background: rgb(41, 51, 48);
  border-radius: 12px;
  max-width: 200px;
  overflow: hidden;
  overscroll-behavior: contain;
  contain: content;
  .item{
    display: block;
    position: relative;
    padding: 6px 16px;
    width: 100%;
    box-sizing: border-box;
    white-space: nowrap;
    font-size: .9em;
    line-height: 20px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgb(222,231,228);
  }
  a:hover{
    color: #b4e900;
    background: #b4e90026;
    border-radius: 6px;
    cursor:pointer;
  }
}
.popover-arrow{
  display: none;
}
</style>
