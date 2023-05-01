<template>
  <div class="group">
    <div class="show">
      <img class="banner" :src="user_info.banner"/>
      <img class="avatar" :src="user_info.avatar"/>
    </div>
    <div class="handle">
      <a-upload action="http://127.0.0.1:1012/api/users/upload" :headers="headers" :show-file-list="false" @success="avatarUploaded">
        <template #upload-button>
          <button class="btn">修改头像</button>
        </template>
      </a-upload>
      <a-upload action="http://127.0.0.1:1012/api/users/upload" :headers="headers" :show-file-list="false" @success="bannerUploaded">
        <template #upload-button>
          <button class="btn">修改背景</button>
        </template>
      </a-upload>

    </div>

  </div>
  <div class="group">
    <div class="label">昵称</div>
    <a-input v-model="user_info.nick_name" :max-length="10"></a-input>
  </div>
  <div class="group">
    <div class="label">个人简介</div>
    <a-textarea v-model="user_info.describe" placeholder="这个人很懒，没有写自我介绍" :max-length="25" show-word-limit/>
  </div>
  <button @click="saveInfo" class="btn_save">
    <icon-check />保存
  </button>
</template>

<script setup lang="ts">
import {getInfo} from "@/utils/info";
import {getToken} from "@/utils/auth";
import {reactive, ref} from "vue";
import {IconCheck} from "@arco-design/web-vue/es/icon";
import {useUserStore} from "@/stores/modules/user";
import {Message} from "@arco-design/web-vue";
const user_info=reactive(JSON.parse(getInfo()))
const userStore=useUserStore()
const headers: Record<string, string>={
  'Authorization':'Bearer '+getToken()
}
const saveInfo = async () => {
  const res=await userStore.update({
    Nickname: user_info.nick_name,
    Avatar: user_info.avatar,
    Banner: user_info.banner,
    Describe: user_info.describe,
  })
  if (res){
    Message.success({ content: "保存成功！" });
  }
}
const avatarUploaded = (file:any) => {
  console.log(file.response)
  user_info.avatar=file.response.url
}
const bannerUploaded = (file:any) => {
  console.log(file.response)
  user_info.banner=file.response.url
}
</script>

<style lang="less" scoped>
.group{
  margin-bottom: 8px;
  .show{
    position: relative;
    height: 154px;
    margin-bottom: 18px;
    img{
      position: absolute;
      height: 154px;
    }
    .banner{
      width: 100%;
      border-radius: 10px;
      object-fit: cover;
    }
    .avatar{
      width: 72px;
      height: 72px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
    }
  }
  .handle{
    display: flex;
    justify-content: space-around;
  }
  .label{
    font-size: .85em;
    padding: 0 0 8px;
    text-align: left;
    opacity: .8;
  }
  .btn{
    font-weight: 700;
    color: rgb(25, 35, 32)!important;
    background: #b4e900;
    border-radius: 999px;
    width: 100px;
    line-height: 35px;
    font-size: 14px;
  }
}
.btn_save{
  font-weight: 700;
  color: rgb(25, 35, 32)!important;
  background: #b4e900;
  border-radius: 5px;
  width: 100px;
  line-height: 35px;
  font-size: 14px;
}
</style>
<style lang="less">
.arco-input-wrapper {
  background: rgb(25, 35, 32)!important;
}
.arco-input-wrapper:hover {
  background: rgb(25, 35, 32)!important;
  border-color: #b4e900!important;
}
.arco-input {
  background: rgb(25, 35, 32)!important;
  color: #dee7e4!important;
}
.arco-input-focus {
  background: rgb(25, 35, 32)!important;
  border-color: #b4e900!important;
}
</style>
