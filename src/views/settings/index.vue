<template>
  <div class="header">
    <div class="header_text">
      <icon-settings />设置
    </div>
  </div>

  <Content class="content">
    <div class="nav">
      <div class="group">
        <div class="title">基本设置</div>
        <div class="items">
          <a class="item" @click="handleChangeItem('1_1')" :class="{item_checkd:(index=='1_1')}">
            <icon-user />个人资料
          </a>
          <a class="item" @click="handleChangeItem('1_2')" :class="{item_checkd:(index=='1_2')}">
            <icon-lock />安全
          </a>
        </div>
      </div>
      <div class="group">
        <div class="title">其他设置</div>
        <div class="items">
          <a-popconfirm content="确认退出登录?" @ok="handleLogout">
          <a class="item">
            <icon-poweroff />登出
          </a>
          </a-popconfirm>
        </div>
      </div>
    </div>
    <div class="main">
      <Profile v-if="index=='1_1'"></Profile>
      <Security v-if="index=='1_2'"></Security>
    </div>
  </Content>
</template>

<script setup lang="ts">
import Profile from "./profile/index.vue"
import Security from "./security/index.vue"
import Content from "@/components/Content/index.vue";
import {IconSettings,IconUser,IconLock,IconPoweroff} from "@arco-design/web-vue/es/icon";
import {ref} from "vue";
import {useUserStore} from "@/stores/modules/user";

const index=ref('1_1');
const userStore=useUserStore()
const handleChangeItem = (item:any) => {
  index.value=item;
}


//退出登录
const handleLogout = () => {
    userStore.logout();
}
</script>

<style scoped lang="less">
.header {
  height: 50px;
  display: flex;
  border-bottom: solid 0.5px rgba(231, 255, 251, 0.14);
  .header_text{
    font-weight: 700;
    font-size: 14px;
    color: #dee7e4;
    margin: 16px;
  }
}

.content{
  width: 100%;
  max-width: 849px;
  text-align: center;
  margin: auto;
  .nav{
    width: 34%;
    padding-right: 32px;
    box-sizing: border-box;
  }
}
.content :deep(.arco-layout-content) {
  justify-content: start !important;
  flex-direction: row;
  padding: 0 !important;
  padding: 24px 0 150px 0 !important;
  //overflow: hidden;
}

.group{
  .title{
    text-align: left;
    opacity: 0.7;
    margin: 0px 0px 8px;
    font-size: .9em;
  }
  .items{
    .item{
      display: flex;
      align-items: center;
      width: 100%;
      box-sizing: border-box;
      padding: 9px 16px 9px 8px;
      border-radius: 9px;
      font-size: .9em;
      cursor: pointer;
      svg{
        margin: 8px;
      }
    }
  }
  .item:hover{
    background: rgb(31,44,40);
  }
}

.item_checkd{
  background: rgba(180, 233, 0, 0.15);
  color: rgb(180, 233, 0);
}
.item_checkd:hover{
  background: rgba(180, 233, 0, 0.15)!important;
}

.main{
  width: 66%;
}
</style>

