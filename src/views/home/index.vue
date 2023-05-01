<template>
  <Header class="header" @itemClick="handleItemClick">
<!--    <a-tooltip content="首页" position="bottom" mini>-->
<!--      <a-menu-item key="0_2">-->
<!--        <IconHome />-->
<!--      </a-menu-item>-->
<!--    </a-tooltip>-->
    <a-tooltip content="本地" position="bottom" mini>
      <a-menu-item key="0_1">
        <icon-message />
      </a-menu-item>
    </a-tooltip>
  </Header>
  <Content class="content">
    <Lists v-if="data.index == '0_1'"></Lists>
  </Content>
</template>

<script setup lang="ts">
import Header from "@/components/Header/index.vue";
import Content from "@/components/Content/index.vue";
import Lists from "@/components/List/index.vue";
import { IconHome, IconMessage } from "@arco-design/web-vue/es/icon";
import { reactive, ref } from "vue";
const data = reactive({
  index: "0_1",
});
const handleItemClick = (key: any) => {
  data.index = key;
};
</script>

<style scoped lang="less">
.header {
  position: sticky;
  top: 0;
  background: rgba(12, 18, 16, 0.85) !important;
  z-index: 1000;
}
.header :deep(.arco-menu.arco-menu-light) {
  background: none;
}
.header :deep(.arco-menu .arco-menu-item .arco-icon) {
  margin: 0;
  width: 30px;
}
.header :deep(.arco-menu .arco-menu-item) {
  background: none;
  margin: 0;
}
.header :deep(.arco-menu .arco-menu-item.arco-menu-selected .arco-icon) {
  color: rgb(222, 231, 228);
}
.header .arco-menu .arco-menu-item.arco-menu-selected:hover {
  background: none !important;
}
.content{
  width: 100%;
  max-width: 849px;
  text-align: center;
  margin: auto;
}
.content :deep(.arco-layout-content) {
  justify-content: start !important;
  padding: 0 !important;
  padding: 24px 0 150px 0 !important;
  //overflow: hidden;
}
</style>
