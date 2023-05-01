<template>
  <a-layout class="layout-demo">
    <a-layout-sider
      theme="dark"
      breakpoint="xl"
      :width="250"
      :collapsed="collapsed"
      @collapse="onCollapse"
      class="sider-left"
    >
      <div class="top" >
        <div v-if="!collapsed" class="banner"></div>
        <button class="instance">
          <img src="https://s3.arkjp.net/misskey/webpublic-0c66b1ca-b8c0-4eaa-9827-47674f4a1580.png">
        </button>
      </div>
      <a-menu
        :defaultSelectedKeys="['0']"
        @menuItemClick="onClickMenuItem"
        class="menu-left"
      >
        <a-menu-item key="0">
          <IconHome />
          <span>时间线</span>
        </a-menu-item>

        <a-menu-item key="1">
          <icon-notification />
          <span>通知</span>
        </a-menu-item>
        <a-menu-item key="2">
          <icon-star-fill />
          <span>收藏</span>
        </a-menu-item>
        <a-divider />
        <a-menu-item key="3">
          <icon-location />
          <span>发现</span>
        </a-menu-item>
        <a-menu-item key="4">
          <icon-wifi />
          <span>公告</span>
        </a-menu-item>
        <a-menu-item key="5">
          <icon-search />
          <span>搜索</span>
        </a-menu-item>
        <a-divider />
        <a-menu-item key="6">
          <icon-settings />
          <span>设置</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header>
        <a-menu
          :defaultSelectedKeys="['0_1']"
          @menuItemClick="onClickMenuItem"
          mode="horizontal"
          class="menu-top"
        >
          <a-tooltip content="首页" position="bottom" mini>
            <a-menu-item key="0_1">
              <IconHome />
            </a-menu-item>
          </a-tooltip>
          <a-tooltip content="本地" position="bottom" mini>
            <a-menu-item key="0_2">
              <icon-message />
            </a-menu-item>
          </a-tooltip>
        </a-menu>
      </a-layout-header>
      <a-layout style="padding: 0 24px">
        <a-layout-content></a-layout-content>
      </a-layout>
    </a-layout>
    <a-layout-sider :width="333" class="sider-right">
      <Card>
        <div class="panel-date">
          <div class="calendar">
            <p class="month-and-year">
              <span class="year">{{ timeInfo.year }}年</span>&nbsp;
              <span class="month">{{ timeInfo.month }}月</span>
            </p>
            <p class="day">{{ timeInfo.date }}日</p>
            <p class="week-day">{{ timeInfo.week }}</p>
          </div>
          <div class="info">
            <div>
              <p>今天:{{ (timeInfo.dayPersent * 100).toFixed(1) }}%</p>
              <Progress
                :percent="timeInfo.dayPersent"
                color="#f7796c"
                :style="{ width: '104px' }"
              ></Progress>
            </div>
            <div>
              <p>本月:{{ (timeInfo.monthPersent * 100).toFixed(1) }}%</p>
              <Progress
                :percent="timeInfo.monthPersent"
                color="#a1De41"
                :style="{ width: '104px' }"
              ></Progress>
            </div>
            <div>
              <p>今年:{{ (timeInfo.yearPersent * 100).toFixed(1) }}%</p>
              <Progress
                :percent="timeInfo.yearPersent"
                color="#41DDDE"
                :style="{ width: '104px' }"
              ></Progress>
            </div>
          </div>
        </div>
      </Card>
    </a-layout-sider>
  </a-layout>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { Message } from "@arco-design/web-vue";
import { useUserStore } from "@/stores/modules/user";
import Card from "@/components/Card/index.vue";
import Progress from "@/components/Progress/index.vue";

import {
  IconHome,
  IconStarFill,
  IconNotification,
  IconLocation,
  IconWifi,
  IconSearch,
  IconSettings,
  IconMessage,
} from "@arco-design/web-vue/es/icon";
import { getCurrentDate } from "@/utils/date";

const userStore = useUserStore();
const handleLogout = () => {
  userStore.logout();
};
const collapsed = ref(false);
const onCollapse = (val: any, type: any) => {
  collapsed.value = val;
};
const timeInfo = getCurrentDate();
console.log(timeInfo);
</script>
<style lang="less" scoped>
.sider-right {
  @media screen and (max-width: 1090px) {
    display: none;
  }
}
//.sider-left{
//  @media screen and (max-width: 500px){
//    display: none;
//  }
//}
</style>
<style scoped>
.menu-left {
  background: rgb(25, 35, 32);
  caret-color: transparent;
}
.menu-left .arco-menu-item {
  background: rgb(25, 35, 32);
  border-radius: 999px;
  width: calc(100% - 10px);
  height: 40px;
  margin: auto;
  line-height: 40px;
  padding-left: 30px;
  color: rgb(222, 231, 228);
}
.menu-left .arco-menu-item .arco-icon {
  color: rgb(222, 231, 228);
  font-size: 1.1em;
}

.menu-left .arco-menu-item:hover {
  background: #b4e90026 !important;
  color: #b4e900;
}
.menu-left .arco-menu-item:hover .arco-icon {
  color: #b4e900;
}
.menu-left .arco-menu-selected {
  background: #b4e90026 !important;
  color: #b4e900;
}
.menu-left .arco-menu-selected .arco-icon {
  color: #b4e900;
}
.sider-left {
  background: rgb(25, 35, 32);
}
.sider-right {
  background: #0c1210;
  padding: 16px;
  box-shadow: none;
  border-left: solid 0.5px rgba(231, 255, 251, 0.14);
}
.layout-demo {
  height: 100vh;
  background: var(--color-fill-2);
  /*border: 1px solid var(--color-border);*/
}
.layout-demo :deep(.arco-layout-sider) .top {
  height: 83px;
  text-align: center;
  position: relative;
}
.layout-demo :deep(.arco-layout-sider) .banner{
  height: 100%;
  width: 100%;
  background: url("https://s3.arkjp.net/misskey/65b25d3c-2ae4-474f-b1c0-050c8c8962e1.jpg");
  background-size: cover;
  background-position: center center;
  position: absolute;
  mask-image: linear-gradient(0deg,rgba(0,0,0,0) 15%,rgba(0,0,0,.75) 100%);
}
.layout-demo :deep(.arco-layout-sider) .instance {
  display: block;
  position: relative;
  width: 100%;
  line-height: inherit;
  cursor: pointer;
  text-align: center;
  top: 20%;
}
.layout-demo :deep(.arco-layout-sider) .instance img{
  width: 38px;
  height: 38px;
  background-size: 38px;
  display: inline-block;
}
.layout-demo :deep(.arco-layout-header) {
  /*height: 64px;*/
  /*line-height: 64px;*/
  background: #0c1210;
  border-bottom: solid 0.5px rgba(231, 255, 251, 0.14);
}
.layout-demo :deep(.arco-layout-footer) {
  height: 48px;
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
}
.layout-demo :deep(.arco-layout-content) {
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  background: #0c1210;
}
.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}
.menu-top {
  background: #0c1210;
}
.menu-top :deep(.arco-menu-item .arco-icon) {
  margin: 0;
  width: 30px;
}
.menu-top :deep(.arco-menu-item) {
  background: none;
}
.menu-top :deep(.arco-menu-item.arco-menu-selected .arco-icon) {
  color: rgb(222, 231, 228);
}
.menu-top .arco-menu-item.arco-menu-selected:hover {
  background: none !important;
}

.menu-left.arco-menu-collapsed :deep(.arco-menu-item) {
  background: none;
}
.menu-left.arco-menu-collapsed :deep(.arco-menu-item.arco-menu-selected) {
  background: #b4e90026;
  border-radius: 50%;
}
.panel-date {
  display: flex;
  justify-content: center;
}
.calendar {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 60%;
  text-align: center;
  height: 88px;
}
.month-and-year {
  display: flex;
  justify-content: center;
}
.day {
  line-height: 32px;
  font-size: 1.75em;
}
.info {
  width: 40%;
  font-size: 0.75em;
  padding-top: 5px;
}
.info div {
  margin: 0 0 3px;
}

.arco-layout {
  background: #0c1210;
}
.arco-layout-header {
  background: #0c1210;
}
</style>
<style>
.arco-menu-inner .arco-menu-selected .arco-menu-selected-label {
  background: rgb(180, 233, 0) !important;
  border-radius: 15px;
}
</style>
