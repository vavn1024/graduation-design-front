<template>
<!--  <a-result status="404" title="404" sub-title="抱歉, 你访问的页面不存在。">-->
<!--    <template #extra>-->
<!--      <a-button type="primary" @click="$router.push('/')">返回首页</a-button>-->
<!--    </template>-->
<!--  </a-result>-->
    <div class="error">
      <img src="https://xn--931a.moe/assets/error.jpg">
      <p class="tips">
        <icon-exclamation-circle />出现了一些问题！
      </p>
      <button class="retry" @click="refresh">重试</button>
    </div>


</template>
<script setup lang="ts">
import {IconExclamationCircle} from "@arco-design/web-vue/es/icon";
import {router} from "@/router";
const refresh = () => {
  router.go(0)
}
</script>
<style scoped lang="less">
.error{
  text-align: center;
  padding: 24px;
  .tips{
    margin: 0 0 8px;
    color: #dee7e4;
  }
  .retry{
    background: rgba(255, 255, 255, 0.05);
    border-radius: 5px;
    color: #dee7e4;
    min-width: 100px;
    font-size: 95%;
    font-weight: 400;
    line-height: 32px;
  }
  .retry:hover{
    background: rgba(255, 255, 255, 0.1);
  }
}
img{
  display: inline-block;
  vertical-align: bottom;
  height: 128px;
  width: 128px;
  margin:  16px auto;
  border-radius: 16px;
}
</style>
