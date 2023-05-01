<template>
  <Modal
    width="520"
    :visible="postConfig.visible"
    @cancel="handleCancel"
    @ok="handlePublish"
    :unmount_on_close="false"
  >
    <a-form :model="postData" @submit="handlePublish">
      <a-form-item
        field="content"
        :hide-asterisk="true"
        :hide-label="true"
        :rules="[{ required: true, message: '请写点什么吧' }]"
        :validate-trigger="['blur']"
      >
        <a-textarea
          placeholder="请写下来吧"
          :max-length="3000"
          show-word-limit
          v-model="postData.content"
        />
      </a-form-item>
      <a-upload
        action="http://127.0.0.1:1012/api/users/upload"
        list-type="picture-card"
        :headers="headers"
        limit="9"
        @success="imageUploaded"
        style="margin: 15px 0"
      />
      <a-form-item :hide-asterisk="true" :hide-label="true">
        <a-button
          :loading="postConfig.loading"
          html-type="submit"
          type="primary"
          >发帖</a-button
        >
      </a-form-item>
    </a-form>
  </Modal>
  <Modal
    :visible="searchConfig.visible"
    @cancel="handleCancel"
    title="搜索"
    :unmount_on_close="true"
  >
    <a-input-search
      autofocus="true"
      @search="handleSearch"
      v-model="searchConfig.key"
      style=""
    ></a-input-search>
    <div style="max-height: 255px; color: #dee7e4">
      <div v-for="item in searchData" style="display: flex; margin: 15px 0">
        <a-avatar>
          <img alt="avatar" :src="item.user.avatar" />
        </a-avatar>
        <div
          style="
            display: flex;
            flex-direction: column;
            margin-left: 5px;
            width: calc(100% - 45px);
          "
        >
          <div style="display: flex; width: 100%">
            <a :href="'/@' + item.name">{{
              item.user.nick_name == "" ? item.user.name : item.user.nick_name
            }}</a>
            <div style="opacity: 0.4">@{{ item.name }}</div>
            <time :title="getTime(item.created_at)" style="margin-left: auto">
              {{ getDuration(item.created_at) }}
            </time>
          </div>
          <a :href="'/notes/'+item.note_id" target="note">{{ item.content }}</a>
        </div>
      </div>
      <div v-if="searchData.length" style="text-align: center;margin-bottom: 50px;opacity: .5">共计{{searchData.length}}条记录</div>
    </div>
  </Modal>
  <a-layout class="layout-demo" :has-sider="true">
    <a-layout-sider
      theme="dark"
      breakpoint="xl"
      :width="250"
      :collapsed="collapsed"
      @collapse="onCollapse"
      class="sider-left"
    >
      <div class="top">
        <div v-if="!collapsed" class="banner"></div>
        <button class="instance">
          <img
            src="@/assets/logo1.png"
          />
        </button>
      </div>

      <a-menu
        :default-selected-keys="activeIndex"
        @menuItemClick="changeMenu"
        class="menu-left"
      >
        <a-menu-item key="/home">
          <IconHome />
          <span>时间线</span>
        </a-menu-item>
        <a-divider />
<!--        <a-menu-item key="4">-->
<!--          <icon-wifi />-->
<!--          <span>公告</span>-->
<!--        </a-menu-item>-->
        <a-menu-item @click="handleOpen">
          <icon-search />
          <span>搜索</span>
        </a-menu-item>
        <a-divider />
        <a-menu-item key="/settings">
          <icon-settings />
          <span>设置</span>
        </a-menu-item>
      </a-menu>
      <div class="bottom">
        <button class="post" @click="handlePost">
          <icon-pen-fill />
          <span class="text">帖子</span>
        </button>
        <Popover trigger="click" position="top">
          <template v-slot:default>
            <button class="account">
              <a class="avatar">
                <img :src="data.user.avatar" class="inner" />
              </a>
              <span class="name">@{{ data.user.name }}</span>
            </button>
          </template>
          <template v-slot:content>
            <a class="item" :href="'/@' + data.user.name">
              <a class="avatar">
                <img class="inner" :src="data.user.avatar" />
              </a>
              <span>个人资料</span>
            </a>
            <a class="item" @click="handleLogout"><icon-import />登出</a>
          </template>
        </Popover>
      </div>
    </a-layout-sider>
    <a-layout @scroll="scrollEvent">
      <slot></slot>
    </a-layout>
    <!-- 侧边栏-右   -->
    <a-layout-sider :width="333" class="sider-right">
      <!-- 时间 -->
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
      <!-- 通知 -->
      <Card class="notifications">
        <div class="header"><icon-notification />通知</div>
        <div class="main">
          <div class="items">
            <div class="item" v-for="item in notifications">
              <div class="left">
                <img class="ava" :src="item.user.avatar" />
              </div>
              <div class="right">
                <div class="item_header">
                  <a class="nick_name" :href="'/@' + item.user.name">{{
                    item.user.nick_name == ""
                      ? item.user.name
                      : item.user.nick_name
                  }}</a>
                  <time :title="getTime(item.created_at)">{{
                    getDuration(item.created_at)
                  }}</time>
                </div>
                <div class="content">
                  <div v-if="item.type == 'follow'">您有新的关注者</div>
                  <div v-if="item.type == 'like'">
                    点赞了您的<a
                      :href="'/notes/' + item.target_id"
                      style="color: #b4e900"
                      >帖子</a
                    >
                  </div>
                  <div v-if="item.type == 'reply'">
                    评论了您的<a
                      :href="'/notes/' + item.target_id"
                      style="color: #b4e900"
                      >帖子</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </a-layout-sider>
  </a-layout>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { Message } from "@arco-design/web-vue";
import { useUserStore } from "@/stores/modules/user";
import { useNoteStore } from "@/stores/modules/note";
import Card from "@/components/Card/index.vue";
import Progress from "@/components/Progress/index.vue";
import Modal from "@/components/Modal/index.vue";
import Popover from "@/components/Popover/index.vue";
import "@arco-design/web-vue/es/message/style/css.js";
import {
  IconHome,
  IconStarFill,
  IconNotification,
  IconLocation,
  IconWifi,
  IconSearch,
  IconSettings,
  IconPenFill,
  IconPlus,
  IconUser,
  IconImport,
} from "@arco-design/web-vue/es/icon";
const headers: Record<string, string> = {
  Authorization: "Bearer " + getToken(),
};
import { getCurrentDate } from "@/utils/date";
import { getDuration, getTime } from "@/utils/date";
import { router } from "@/router";
import { useEventStore } from "@/stores/modules/event";
import { getToken } from "@/utils/auth";

let activeIndex = ref(sessionStorage.getItem("select"));
const userStore = useUserStore();
const noteStore = useNoteStore();
const eventStore = useEventStore();
//帖子的表单数据
const postData = reactive({
  content: "",
});

//帖子Modal的相关配置
const postConfig = reactive({
  visible: false,
  loading: false,
});

const searchConfig = reactive({
  visible: false,
  key: "",
});

const searchData = reactive<Array<String>>([]);

//当前登录用户信息
let data = reactive({
  user: {
    name: "",
    avatar: "",
  },
});

let urls = reactive<Array<string>>([]);

//通知信息
let notifications = reactive<Array<string>>([]);

const getNotifications = async () => {
  const res = await eventStore.getNotifications();
  if (res) {
    // notifications=reactive<Array<string>>([])
    notifications.length = 0;
    notifications.push(...res.events);
  }
};

const imageUploaded = (file: any) => {
  urls.push(file.response.url);
};

onMounted(async () => {
  //获取当前登录用户信息
  let res = await userStore.show({ username: "" });
  if (res) {
    data.user = res.user;
  }
  //获取通知
  getNotifications();
  // localStorage.setItem("isBottom","false")
});
//退出登录
const handleLogout = () => {
  userStore.logout();
};

//打开搜索框
const handleOpen = () => {
  searchConfig.visible = true;
};

const handleSearch = async () => {
  if(searchConfig.key==""){
    Message.info("请输入搜索关键词")
    return
  }
  const res = await noteStore.search(searchConfig.key);
  searchData.length = 0;
  if (res) {
    if(res.notes==null){
      Message.success("无任何搜索结果")
      return
    }
    searchData.push(...res.notes);
    console.log(searchData);

    return
  }
  Message.error("出错了~")
};

//打开发表帖子Modal
const handlePost = () => {
  postConfig.visible = true;
};
//关闭发表帖子Modal
const handleCancel = () => {
  postConfig.visible = false;
  searchConfig.visible = false;
};
//清空postData
const clearPostData = () => {
  postData.content = "";
  urls.length = 0;
};
//发帖操作
const handlePublish = async ({ values, errors }) => {
  console.log("values:", values, "\nerrors:", errors);
  if (!errors) {
    postConfig.loading = true;
    const res = await noteStore.publish({
      content: postData.content,
      urls: urls.toString(),
    });
    postConfig.loading = false;
    if (res) {
      const timer1 = setTimeout(function () {
        // 关闭帖子Modal
        handleCancel();
        // 清空postData
        clearPostData();
        router.go(0);
        clearTimeout(timer1);
      }, 1000);
      return;
    }
    Message.error({ content: "发布失败！" });
  }
};
//控制左侧菜单栏伸缩
const collapsed = ref(false);
const onCollapse = (val: any, type: any) => {
  collapsed.value = val;
};

//更新时间
let timeInfo = ref(getCurrentDate());
let updateTime = () => {
  timeInfo.value = getCurrentDate();
};
setInterval(updateTime, 1000);

//更新通知
setInterval(getNotifications, 5000);

const changeMenu = (key: any) => {
  if (key.search("__arco_menu") != -1) {
    return;
  }
  sessionStorage.setItem("select", key);
  router.push(key);
};

const scrollEvent = (e: any) => {
  const isBotoom =
    e.srcElement.scrollTop + e.srcElement.offsetHeight >
    e.srcElement.scrollHeight - 100;
  localStorage.setItem("isBottom", String(isBotoom));
};
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
<style lang="less" scoped>
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
.layout-demo :deep(.arco-layout-sider) .banner {
  height: 100%;
  width: 100%;
  background: url("https://s3.arkjp.net/misskey/65b25d3c-2ae4-474f-b1c0-050c8c8962e1.jpg");
  background-size: cover;
  background-position: center center;
  position: absolute;
  mask-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 15%,
    rgba(0, 0, 0, 0.75) 100%
  );
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
.layout-demo :deep(.arco-layout-sider) .instance img {
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
.bottom {
  position: absolute;
  bottom: 1.5em;
  width: 100%;
}
.post {
  display: block;
  position: relative;
  width: 100%;
  height: 40px;
  border-radius: 100%;
  margin-bottom: 16px;
  text-align: left;
  color: rgb(25, 35, 32);
  @media screen and (max-width: 1200px) {
    height: 52px;
    text-align: center;
  }
  .text {
    position: relative;
    color: rgb(25, 35, 32);
    text-align: left;
    font-size: 1em;
    font-weight: 900;
    @media screen and (max-width: 1200px) {
      display: none;
    }
  }
}
.post :deep(.arco-icon) {
  position: relative;
  margin-left: 30px;
  margin-right: 6px;
  width: 32px;
  text-align: center;
  line-height: 32px;
  display: inline-block;
  font-size: 1em;
  color: rgb(25, 35, 32);
  @media screen and (max-width: 1200px) {
    margin: 0;
  }
}
.post::before {
  content: "";
  display: block;
  position: absolute;
  inset: 0;
  margin: auto;
  width: calc(100% - 26px);
  height: 40px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgb(180, 233, 0), rgb(102, 233, 0));
  @media screen and (max-width: 1200px) {
    width: 40px;
    height: 40px;
    border-radius: 100%;
  }
}
.account {
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-align: left;
  box-sizing: border-box;
  margin-top: 16px;
  @media screen and (max-width: 1200px) {
    display: block;
    text-align: center;
    width: 100%;
    padding-left: 0;
  }
  .avatar {
    position: relative;
    width: 32px;
    aspect-ratio: 1;
    margin-right: 8px;
    display: inline-block;
    vertical-align: bottom;
    flex-shrink: 0;
    border-radius: 100%;
    line-height: 16px;
    @media screen and (max-width: 1200px) {
      margin: 0;
    }
    .inner {
      position: absolute;
      inset: 0;
      border-radius: 100%;
      z-index: 1;
      overflow: hidden;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
  .name {
    color: rgb(222, 231, 228);
    @media screen and (max-width: 1200px) {
      display: none;
    }
  }
}
.item {
  min-width: 200px;
  .avatar {
    margin-right: 5px;
    width: 20px;
    height: 20px;
    position: relative;
    display: inline-block;
    border-radius: 100%;
    line-height: 16px;
    vertical-align: bottom;
    .inner {
      position: absolute;
      inset: 0;
      border-radius: 100%;
      z-index: 1;
      overflow: hidden;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
  span {
    line-height: 20px;
  }
  :deep(.arco-icon) {
    margin-right: 5px;
    width: 20px;
  }
}

//通知
.notifications {
  height: 300px;
  width: 300px;
  :deep(.arco-card) {
    padding: 0;
    margin: 0;
  }
  .header {
    height: 36px;
    padding: 8px 10px;
    border-bottom: solid 0.5px rgba(231, 255, 251, 0.14);
    :deep(.arco-icon) {
      margin-right: 6px;
    }
  }
  .main {
    height: 263px;
    overflow: auto;
    .items {
      .item {
        display: flex;
        border-bottom: solid 0.5px rgba(231, 255, 251, 0.14);
        font-size: 0.85em;
        padding: 12px;
        .left {
          width: 42px;
          height: 42px;
          margin-right: 5px !important;
          .ava {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .right {
          width: calc(100% - 47px);
          .item_header {
            width: 100%;
            display: flex;
            flex-direction: row;
            time {
              margin-left: auto;
            }
          }
          .content {
            opacity: 0.6;
          }
        }
      }
      .item:nth-last-child(1) {
        border-bottom: none;
      }
    }
  }
}
</style>
<style>
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
  border-color: #b4e900 !important;
}
.arco-menu-inner .arco-menu-selected .arco-menu-selected-label {
  background: rgb(180, 233, 0) !important;
  border-radius: 15px;
}
</style>
<style lang="less">
.arco-input-wrapper {
  background: rgb(25, 35, 32) !important;
  border-color: #dee7e4 !important;
}
.arco-input-wrapper:hover {
  background: rgb(25, 35, 32) !important;
  border-color: #b4e900 !important;
}
.arco-input {
  background: rgb(25, 35, 32) !important;
  color: #dee7e4 !important;
}
.arco-input-focus {
  background: rgb(25, 35, 32) !important;
  border-color: #b4e900 !important;
}
</style>
