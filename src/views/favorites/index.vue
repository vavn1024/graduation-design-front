<template>
  <Header class="header">
<!--    <a-tooltip content="首页" position="bottom" mini>-->
<!--      <a-menu-item key="0_1">-->
<!--        <IconHome />-->
<!--      </a-menu-item>-->
<!--    </a-tooltip>-->
<!--    <a-tooltip content="本地" position="bottom" mini>-->
<!--      <a-menu-item key="0_2">-->
<!--        <icon-message />-->
<!--      </a-menu-item>-->
<!--    </a-tooltip>-->
  </Header>
  <Content>我是收藏页面</Content>
</template>

<script setup lang="ts">
import Header from '@/components/Header/index.vue';
import Content from '@/components/Content/index.vue';
import {
  IconHome,
  IconMessage,
} from "@arco-design/web-vue/es/icon";
</script>

<style scoped>
.header :deep(.arco-menu) {
  background: #0c1210;
}
.header :deep(.arco-menu .arco-menu-item .arco-icon) {
  margin: 0;
  width: 30px;
}
.header :deep(.arco-menu .arco-menu-item) {
  background: none;
}
.header :deep(.arco-menu .arco-menu-item.arco-menu-selected .arco-icon) {
  color: rgb(222, 231, 228);
}
.header .arco-menu .arco-menu-item.arco-menu-selected:hover {
  background: none !important;
}
</style>
