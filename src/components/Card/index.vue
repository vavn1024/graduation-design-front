<template>
  <div :style="{ display: 'flex' }">
    <a-card :style="{ width: '360px' }" :title="title" :bordered="false">
      <template #extra v-if="showExtra">
        <a-link>{{ extra }}</a-link>
      </template>
      <slot></slot>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    extra: {
      type: String,
      default: "",
    },
    showExtra:{
      type:Boolean,
      default:false,
    },
  },
  setup(_) {
    return {};
  },
});
</script>

<style>
.arco-card{
  background: rgb(25, 35, 32);
  margin-bottom: 16px;
  padding: 16px 0;
  border-radius: 12px;
  font-size:14px;
}
.arco-card-body{
  padding: 0!important;
  color: rgb(222, 231, 228);
}
</style>
