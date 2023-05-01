<template>
  <Modal :visible="modalConfig.visible" @cancel="handleCancel">
    <div class="title" v-if="modalConfig.step==0">现在的密码</div>
    <div class="title" v-if="modalConfig.step==1">新密码</div>
    <a-input-password v-model="requestParam.password" v-if="modalConfig.step==0">
      <template #prefix>
        <icon-lock />
      </template>
    </a-input-password>
    <a-input-password v-model="requestParam.newPassword" v-if="modalConfig.step==1">
      <template #prefix>
        <icon-lock />
      </template>
    </a-input-password>
    <div class="action">
      <button class="btn" @click="handleNext">OK</button>
      <button class="btn" @click="handleCancel" style="background: rgba(255, 255, 255, 0.05);color: #dee7e4!important;">取消</button>
    </div>
  </Modal>
  <div class="group">
    <div class="label">密码</div>
    <button @click="handleChange"  class="btn" >
      修改密码
    </button>
    <!--    <a-input v-model="user_info.nick_name" :max-length="10"></a-input>-->
  </div>
  <div class="group">
    <div class="label">电子邮件地址</div>
    <a-input class="email" v-model="email" v-bind:disabled="isVerified">
      <template #prefix>
        <icon-email />
      </template>
    </a-input>
    <button v-if="!isVerified" @click="saveInfo" class="btn">验证邮箱</button>
    <div v-else class="caption">
      <icon-check style="color: #b4e900" />电子邮件地址已验证
    </div>
  </div>
</template>

<script setup>
import { IconEmail, IconCheck,IconLock } from "@arco-design/web-vue/es/icon";
import Modal from "@/components/Modal/index.vue";
import {reactive, ref} from "vue";
import {Message} from "@arco-design/web-vue";
import {useUserStore} from "@/stores/modules/user";

const userStore=useUserStore()
const isVerified = ref(true);
const email = ref("example@qq.com");
const modalConfig=reactive({
  visible:false,
  step:0,
})

const requestParam=reactive({
  password:"",
  newPassword:""
})

const handleChange = () => {
  modalConfig.step=0;
  requestParam.password="";
  requestParam.newPassword="";
  modalConfig.visible = true;
};
const handleCancel = () => {
  modalConfig.visible = false;
}
const handleNext =async () => {
  //数据验证
  if (modalConfig.step==0 && requestParam.password==""){
    Message.info("请输入密码")
    return;
  }
  if (modalConfig.step==1 && requestParam.newPassword==""){
    Message.info("请输入密码")
    return;
  }
  if (modalConfig.step==1 &&requestParam.newPassword.length<6){
    Message.info("密码不能少于6位")
    return;
  }
  //进入下一步
  if(modalConfig.step<1){
    modalConfig.step+=1;
    return
  }
  const res=await userStore.changePwd(requestParam);
  modalConfig.visible = false;
  if(res){
    return
  }
  Message.error("修改失败")
}
</script>

<style lang="less" scoped>
.title{
  color: #dee7e4;
  font-weight: 700;
  font-size: 1.1em;
  text-align: center;
  margin-bottom: 16px;
}
.action{
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
}
.group {
  text-align: left;
  border-bottom: solid 0.5px rgba(231, 255, 251, 0.14);
  margin-bottom: 14px;
}

.group:nth-last-child(1) {
  border-bottom: none;
}
.email {
  margin: 12px 0px 18px 0px;
}
.btn {
  font-weight: 700;
  color: rgb(25, 35, 32) !important;
  background: #b4e900;
  border-radius: 5px;
  width: 100px;
  line-height: 35px;
  font-size: 14px;
  margin: 12px 0px 18px 0px;
}
.caption {
  color: rgba(222, 231, 228, 0.75);
  font-size: 0.75em;
}
.label {
  font-size: 0.85em;
  padding: 0 0 8px;
  text-align: left;
  opacity: 0.8;
}
</style>
