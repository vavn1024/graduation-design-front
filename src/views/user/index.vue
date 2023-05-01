<template>
  <Header class="header">
    <a-tooltip content="概览" position="bottom" mini>
      <a-menu-item key="0_1">
        <icon-home />
        <span>概览</span>
      </a-menu-item>
    </a-tooltip>
  </Header>
  <div v-if="data.user.name">
    <Content class="content">
      <div class="main">
        <div class="profile">
          <div class="banner-containe">
            <img
                class="banner"
                style="background-position: center calc(50% - 0px)"
                :src="data.user.banner"
            />
            <div class="fade"></div>
            <div class="action" v-if="data.user.name!=getMyName().name">
              <div v-if="data.user.is_following" @click="handleFollow">取消关注</div>
              <div v-else @click="handleFollow">关注Ta</div>
            </div>
            <div class="title">
              <div class="name">{{ data.user.nick_name==""?data.user.name:data.user.nick_name }}</div>
              <div class="bottom">@{{ data.user.name }}@example.com</div>
            </div>
          </div>
          <a class="avatar">
            <img class="inner" :src="data.user.avatar" />
          </a>
          <div class="description">
            <p style="text-align: left">{{data.user.describe==""?"这个人很懒，没有写自我介绍":data.user.describe}}</p>
          </div>
          <div class="system">
            <dl class="field">
              <dt class="name">
                <icon-calendar />
                注册于
              </dt>
              <dd class="value">{{getTime(data.user.created_at)}} ({{getDuration(data.user.created_at)}})</dd>
            </dl>
          </div>
          <div class="status">
            <a :href="'/@'+data.user.name">
              <b>{{ data.user.notes_count }}</b>
              <span>帖子</span>
            </a>
            <a :href="'/@'+data.user.name+'/following'">
              <b>{{ data.user.following_count }}</b>
              <span>关注中</span>
            </a>
            <a :href="'/@'+data.user.name+'/followed'">
              <b>{{ data.user.followed_count }}</b>
              <span>关注者</span>
            </a>
          </div>
        </div>
      </div>
      <Lists :username="data.user.name"></Lists>
    </Content>

  </div>
  <Error v-if="isError"></Error>

</template>

<script setup lang="ts">
import Header from "@/components/Header/index.vue";
import Content from "@/components/Content/index.vue";
import Error from "@/views/error.vue"
import Lists from '@/components/List/index.vue';
import {getTime,getDuration } from "@/utils/date";
import { IconHome, IconCalendar } from "@arco-design/web-vue/es/icon";
import { useUserStore } from "@/stores/modules/user";
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {useEventStore} from "@/stores/modules/event";
import {Message} from "@arco-design/web-vue";
const userStore = useUserStore();
const eventStore =useEventStore();

let data = reactive({
  user: {
    name: "",
    avatar: "",
    notes_count:0,
    following_count:0,
    followed_count:0,
    created_at:0,
    is_following:0,
  },
});
const isError=ref(false)
const getMyName = () => {
  return JSON.parse(userStore.getInfo)
}

const handleFollow = async () => {
  if (data.user.is_following){
    //取消关注
    const res = await eventStore.follow({
      name:data.user.name
    })
    if (res){
      Message.success("取消关注成功")
      data.user.is_following=0
    }
    return
  }
  //关注
  const res = await eventStore.follow({
    name:data.user.name
  })
  if (res){
    Message.success("关注成功")
    data.user.is_following=1
  }

}
const getUserInfo = async() => {
  const router = useRouter()
  let res = await userStore.show({username:router.currentRoute.value.path.slice(2)});
  if (res){
    data.user = res.user;
    return
  }
  isError.value=true;
}
onMounted( () => {
  getUserInfo()
});



</script>

<style scoped lang="less">
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
.loading :deep(.arco-spin-icon){
  color: #b4e900!important;
}
.content :deep(.arco-layout-content){
  justify-content: start!important;
  padding: 24px 0;
}
.header :deep(.arco-menu) {
  background: #0c1210;
}
.header :deep(.arco-menu .arco-menu-item span) {
  display: inline-block;
  margin: 0;
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
span {
  color: rgba(222, 231, 228, 0.7);
}
.profile {
  position: relative;
  background: rgb(25, 35, 32);
  border-radius: 12px;
}
.banner-containe {
  position: relative;
  height: 250px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  border-radius: 12px 12px 0 0;
  .banner {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-color: #4c5e6d;
    box-shadow: 0 0 128px #00000080 inset;
    will-change: backgroud-position;
    object-fit: cover;
  }
  .fade {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 78px;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  }
  .action{
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(0,0,0,.2);
    padding: 12px 24px;
    border-radius: 24px;
    cursor: pointer;
  }
  .title {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0 0 8px 154px;
    box-sizing: border-box;
    color: #fff;
    text-align: left;
    .name {
      display: block;
      margin: 0;
      line-height: 32px;
      font-weight: 700;
      font-size: 1.8em;
      text-shadow: 0 0 8px #000;
      white-space: pre;
      word-wrap: normal;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.avatar {
  display: block;
  position: absolute;
  top: 170px;
  left: 16px;
  z-index: 2;
  width: 120px;
  height: 120px;
  box-shadow: 1px 1px 3px #0003;
  border-radius: 100%;
  vertical-align: bottom;
  line-height: 16px;
  .inner {
    position: absolute;
    inset: 0;
    border-radius: 100%;
    z-index: 1;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
}
.description {
  padding: 24px 24px 24px 154px;
  font-size: 0.95em;
}
.system {
  padding: 24px;
  font-size: 0.9em;
  border-top: solid 0.5px rgba(231, 255, 251, 0.14);
  .field{
    display: flex;
    padding: 0;
    margin: 0;
    align-items: center;
    .name{
      width: 30%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: 700;
      text-align: center;
    }
    .value{
      width: 70%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0;
      text-align: left;
    }
  }
}
.status {
  display: flex;
  padding: 24px;
  border-top: solid 0.5px rgba(231, 255, 251, 0.14);
  a {
    flex: 1;
    text-align: center;
    b {
      display: block;
      line-height: 16px;
    }
    span {
      font-size: 70%;
    }
  }
}
.main{
  margin-bottom: 16px;
}
.content{
  width: 100%;
  max-width: 1100px;
  text-align: center;
  margin: auto;
}
</style>
