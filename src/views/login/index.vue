<template>
  <div class="main-content text-center">
    <Modal
      modal-class="modal"
      :visible="visible"
      :title="modalConfig.title"
      :okText="modalConfig.okText"
      :loading="loading"
      @cancel="handleCancel"
    >
      <div class="modal-content">
        <a-avatar :size="64">
          <img alt="avatar" src="@/assets/logo1.png" />
        </a-avatar>
        <a-form
          ref="formRef"
          size="small"
          direction="vertical"
          :model="form"
          @submit="handleOK"
          class="pt-5"
        >
          <a-form-item
            field="name"
            :hide-asterisk="true"
            :hide-label="true"
            :rules="[{ required: true, message: '用户名是必填项' }]"
            :validate-trigger="['blur']"
          >
            <a-input
              :style="{ width: '320px' }"
              placeholder="用户名"
              v-model="form.name"
            >
              <template #prefix>
                <icon-at style="color: rgb(222, 231, 228)" />
              </template>
              <template #suffix> <icon-at />{{ domain }} </template>
            </a-input>
          </a-form-item>
          <a-form-item
            field="password"
            :hide-asterisk="true"
            :hide-label="true"
            :rules="[
              { required: true, message: '密码是必填项' },
              { minLength: 8, message: '密码长度应大于7位' },
              // {
              //   match: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W]).{7,}$/,
              //   message: '密码须包含大小写字母、数字和特殊字符的组合',
              // },
            ]"
            :validate-trigger="['blur']"
          >
            <a-input
              :style="{ width: '320px' }"
              placeholder="密码"
              type="password"
              v-model="form.password"
            >
              <template #prefix>
                <icon-lock style="color: rgb(222, 231, 228)" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item
            v-if="modalConfig.action == 'signup'"
            field="repeatPwd"
            :hide-asterisk="true"
            :hide-label="true"
            :rules="[
              { required: true, message: '请再次输入密码' },
              { validator: validatePassCheck, required: true },
            ]"
            :validate-trigger="['blur']"
          >
            <a-input
              :style="{ width: '320px' }"
              placeholder="密码(重新输入)"
              type="password"
              v-model="form.repeatPwd"
            >
              <template #prefix>
                <icon-lock style="color: rgb(222, 231, 228)" />
              </template>
            </a-input>
          </a-form-item>
          <!--          <a-link-->
          <!--              v-if="modalConfig.action == 'signin'"-->
          <!--              href="resetPwd"-->
          <!--              status="success"-->
          <!--              :hoverable="false"-->
          <!--              class="text-left mb-3 block ml-1"-->
          <!--          >忘记密码</a-link-->
          <!--          >-->
          <a-form-item :hide-label="true">
            <a-button html-type="submit" :loading="loading">{{
              modalConfig.action == "signin" ? "登录" : "注册"
            }}</a-button>
          </a-form-item>
        </a-form>
      </div>
    </Modal>
    <div class="bg1"></div>
    <div class="bg2"></div>
    <div class="bg3"></div>
    <a href="/"><img src="@/assets/logo2.png" class="logo" /></a>

    <div class="main">
      <img src="@/assets/logo1.png" class="icon inline" />
      <div class="fg">
        <h1 class="text">example.com</h1>
        <div class="about">
          <div class="desc">welcome</div>
        </div>
        <div class="action">
          <button class="btn-signup" @click="handleSignup">
            <div class="ripples"></div>
            <div class="content">新用户注册</div>
          </button>
          <button class="btn-signin" @click="handleSignin">
            <div class="ripples"></div>
            <div class="content">登录</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import Modal from "@/components/Modal/index.vue";
import { IconAt, IconLock } from "@arco-design/web-vue/es/icon";
import { Message } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/message/style/css.js";
import { useUserStore } from "@/stores/modules/user";

const userStore = useUserStore();

//控制modal显示隐藏状态
const visible = ref(false);
//邮箱后缀
const domain: string = "example.com";
const loading = ref(false);
const form = reactive({
  name: "",
  password: "",
  repeatPwd: "",
});

const modalConfig = reactive({
  action: "signup",
  title: "注册",
  okText: "注册",
});

const validatePassCheck = (value: any, callback: any) => {
  if (value !== form.password) {
    callback("密码不一致");
  }
};
const handleSignin = () => {
  modalConfig.action = "signin";
  modalConfig.title = "登录";
  modalConfig.okText = "登录";
  visible.value = true;
};
const handleSignup = () => {
  modalConfig.action = "signup";
  modalConfig.title = "注册";
  modalConfig.okText = "注册";
  visible.value = true;
};
const handleCancel = () => {
  visible.value = false;
  clearForm();
};
const handleOK = async ({ values, errors }:any) => {
  console.log("values:", values, "\nerrors:", errors);
  if (!errors) {
    if (modalConfig.action === "signin") {
      loading.value = true;
      const res = await userStore.login({
        name: form.name,
        password: form.password,
        repeatPwd: ""
      });
      loading.value = false;
      if (res) {
        //重新加载页面
        const timer1 = setTimeout(function () {
          location.reload();
          clearTimeout(timer1);
        }, 1000);
        return;
      }
      Message.error({ content: "登录失败！" });
    } else {
      //注册逻辑
      loading.value = true;
      const res = await userStore.register({
        name: form.name,
        password: form.password,
        repeatPwd: ""
      });
      loading.value = false;
      // visible.value = false;
      if (res) {
        Message.success({ content: "注册成功！" });
        //重新加载页面
        const timer1 = setTimeout(function () {
          location.reload();
          clearTimeout(timer1);
        }, 1000);
        return;
      }
      Message.error({ content: "注册失败！" });

      // clearForm();
    }
  }
};

const clearForm = () => {
  //清空表单数据
  form.name = "";
  form.password = "";
  form.repeatPwd = "";
};
</script>

<style scoped>
.main-content {
  display: flex;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 16px;
}
.bg1 {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 80%;
  background-image: url("https://s3.arkjp.net/misskey/8ac31f1f-aaa1-4685-bdda-91c1f7108d12.jpeg");
  background-position: center;
  background-size: cover;
}
.bg2 {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgb(180, 233, 0);
  clip-path: polygon(0% 0%, 45% 0%, 20% 100%, 0% 100%);
}
.bg3 {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgb(180, 233, 0);
  clip-path: polygon(0% 0%, 25% 0%, 35% 100%, 0% 100%);
  opacity: 0.5;
}
.logo {
  position: absolute;
  top: 42px;
  left: 42px;
  width: 300px;
}
.main {
  position: relative;
  width: min(480px, 100%);
  margin: auto auto auto 128px;
  background: #192320;
  border-radius: 12px;
  box-shadow: 0 12px 32px #00000040;
  color: #dee7e4;
}
.icon {
  width: 85px;
  margin-top: -47px;
  border-radius: 100%;
  vertical-align: bottom;
}
.text {
  margin: 0;
  padding: 16px 32px 24px;
  font-size: 1.4em;
}
.about {
  padding: 0 32px;
}
.action {
  padding: 32px;
}
.btn-signup {
  position: relative;
  display: inline-block;
  width: auto;
  min-width: 100px;
  font-weight: 700;
  color: rgb(25, 35, 32) !important;
  background: linear-gradient(90deg, rgb(180, 233, 0), rgb(102, 233, 0));
  margin-right: 12px;
  border-radius: 999px;
  line-height: 28px;
  padding: 8px 16px;
  font-size: 1em;
  overflow: clip;
  box-sizing: border-box;
  cursor: pointer;
  text-align: center;
}
.btn-signup:hover {
  background: rgb(180, 233, 0);
}
.btn-signin {
  position: relative;
  display: inline-block;
  width: auto;
  min-width: 100px;
  font-weight: 400;
  color: inherit;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 999px;
  line-height: 28px;
  padding: 8px 16px;
  font-size: 1em;
  overflow: clip;
  box-sizing: border-box;
  cursor: pointer;
  border: none;
  text-align: center;
}
.btn-signin:hover {
  background: rgb(48, 57, 54);
}
.ripples {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  overflow: hidden;
}
.content {
  position: relative;
  z-index: 1;
}
.modal-content {
  text-align: center;
}
</style>

<style lang="less">
input {
  color: rgb(222, 231, 228) !important;
}
.arco-input-suffix {
  color: rgb(222, 231, 228) !important;
}
.arco-input-wrapper {
  background: none;
  border: solid 1px rgba(231, 255, 251, 0.14) !important;
  border-radius: 6px;
  height: 2.5em;
}
.arco-input-wrapper:hover {
  background: none;
}
.arco-input-focus {
  background: none !important;
  border-color: rgb(180, 233, 0) !important;
}
</style>
