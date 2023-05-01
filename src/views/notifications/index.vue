<template>
  <Header class="header">
    <a-tooltip content="全部" position="bottom" mini>
      <a-menu-item key="0_1">
        <span>全部</span>
      </a-menu-item>
    </a-tooltip>
    <a-tooltip content="未读" position="bottom" mini>
      <a-menu-item key="0_2">
        <span>未读</span>
      </a-menu-item>
    </a-tooltip>
    <a-tooltip content="提及" position="bottom" mini>
      <a-menu-item key="0_3">
        <icon-at />
        <span>提及</span>
      </a-menu-item>
    </a-tooltip>
    <a-tooltip content="私信" position="bottom" mini>
      <a-menu-item key="0_4">
        <icon-email />
        <span>私信</span>
      </a-menu-item>
    </a-tooltip>
  </Header>
  <Content>我是通知页面</Content>
</template>

<script setup lang="ts">
import Header from "@/components/Header/index.vue";
import Content from "@/components/Content/index.vue";
import { IconAt, IconEmail,IconNotification } from "@arco-design/web-vue/es/icon";
</script>

<style scoped>
/*.header :deep(.arco-icon){*/
/*  color: rgba(222, 231, 228);*/
/*  font-size: 16px;*/
/*  font-weight: 700;*/
/*}*/
/*.title{*/
/*  color: rgba(222, 231, 228);*/
/*  font-size: 14px;*/
/*  font-weight: 700;*/
/*  margin-left: 4px;*/
/*}*/
.header :deep(.arco-menu) {
  background: #0c1210;
}
.header :deep(.arco-menu .arco-menu-item span) {
  display: inline-block;
  margin: 0;
  width: 30px;
}
.header :deep(.arco-menu .arco-menu-item) {
  background: none;
  margin: 0;
}
.header :deep(.arco-menu .arco-menu-item.arco-menu-selected span) {
  color: rgb(222, 231, 228);
}
.header .arco-menu .arco-menu-item.arco-menu-selected:hover {
  background: none !important;
}
.header :deep(.arco-menu .arco-menu-item .arco-icon) {
  margin: 0;
  width: 30px;
}
.header :deep(.arco-menu .arco-menu-item.arco-menu-selected .arco-icon) {
  color: rgb(222, 231, 228);
}
span{
  color: rgba(222, 231, 228,.7);
}
</style>
