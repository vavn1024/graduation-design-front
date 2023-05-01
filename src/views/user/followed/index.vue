<template>
  <div class="header">
    <div class="header_text">@{{ username }} 关注者</div>
  </div>

  <div class="users" v-if="!isLoading&&data.length">
    <div class="user" v-for="item in data">
      <img class="banner" :src="item.banner"/>
      <img class="avatar" :src="item.avatar"/>
      <div class="title">
        <a class="nick_name" :href="'/@'+item.name">{{ item.nick_name==""?item.name:item.nick_name }}</a>
        <div class="username">@{{ item.name }}</div>
      </div>
      <div class="status">
        <div>
          <div>帖子</div>
          <div class="number">{{ item.notes_count }}</div>
        </div>
        <div>
          <div>关注中</div>
          <div class="number">{{ item.following_count }}</div>
        </div>
        <div>
          <div>关注者</div>
          <div class="number">{{ item.followed_count }}</div>
        </div>
      </div>
    </div>
  </div>
  <Error v-if="isError"></Error>
  <a-spin v-if="isLoading" class="loading"/>
  <div v-if="!data.length&&!isError" style="text-align: center;color: #dee7e4">此用户无关注者~</div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {useEventStore} from "@/stores/modules/event";
import {useRouter} from "vue-router";
import Error from "@/views/error.vue"
const eventStore=useEventStore()

const data=reactive<Array<string>>([])
const isError=ref(false)
let username=ref()
let isLoading=ref(false)
const getFollowedList = async () => {
  const router = useRouter()
  username.value=router.currentRoute.value.params.id
  isLoading.value=true
  const res=await eventStore.followed_list({
    name:username.value
  })
  isLoading.value=false
  if (res){
    data.push(...res.followed_list)
    return
  }
  isError.value=true
}

onMounted(()=>{
  getFollowedList()
})
</script>

<style scoped lang="less">
.loading :deep(.arco-spin-icon){
  color: #b4e900!important;
}
.header {
  padding: 0px 20px;
  height: 58px!important;
  display: flex;
  border-bottom: solid 0.5px rgba(231, 255, 251, 0.14);
  .header_text {
    font-weight: 700;
    font-size: 14px;
    color: #dee7e4;
    line-height: 30px;
    margin: auto 15px;
  }
}

.users{
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(260px,1fr));
  grid-gap: 16px;
  padding: 24px;
  .user{
    position: relative;
    background: rgb(25, 35, 32);
    border-radius: 12px;
    overflow: clip;
  }
  .banner{
    width: 100%;
    height: 84px;
    background-color: #0000001a;
    object-fit: cover;
    background-position: center;
  }
  .avatar{
    position: absolute;
    top: 62px;
    left: 13px;
    width: 58px;
    height: 58px;
    border-radius: 100%;
  }
  .title{
    padding: 10px 0 10px 88px;
    .nick_name{
      font-weight: 700;
      line-height: 16px;
      word-break: break-all;
      color: #dee7e4;
      font-size: 1.1em;
    }
    .username{
      color: #dee7e4;
      font-size: .9em;
      line-height: 16px;
    }
  }
  .status{
    display: flex;
    justify-content: space-around;
    color: #dee7e4;
    padding-bottom: 12px;
    .number{
      color: #b4e900;
    }
  }
}
</style>
