import { defineStore } from "pinia";
import { store } from "@/stores";
import type {ReqParams, ReqParams2, ReqParams3,ReqParams4, User} from "@/api/user/model";
import fetchApi from "@/api/user";
// import { encryptByDES } from '/@/utils/crypto';
import { getToken, setToken, removeToken } from "@/utils/auth";
import { router } from "@/router";
import { getInfo, setInfo } from "@/utils/info";

interface UserState {
  token: string;
  auths: string[];
  info: string;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    // token
    token: "",
    // auths
    auths: [],
    //info
    info: "",
  }),
  getters: {
    getToken(): string {
      return this.token || getToken();
    },
    getInfo(): string {
      return this.info || getInfo();
    },
  },
  actions: {
    setToken(info: string) {
      this.token = info ?? ""; // for null or undefined value
      setToken(info);
    },
    setAuth(auths: string[]) {
      this.auths = auths;
    },
    setInfo(info: User) {
      this.info = JSON.stringify(info) ?? "";
      setInfo(JSON.stringify(info));
      console.log(info);
    },
    resetState() {
      this.token = "";
      this.auths = [];
    },

    /**
     * @description: register
     */
    async register(params: ReqParams) {
      // 密码加密
      // params.password = encryptByDES(params.password);
      const res = await fetchApi.register(params);
      if (res) {
        // save token
        this.setToken(res.token);
      }
      return res;
    },

    /**
     * @description: login
     */
    async login(params: ReqParams) {
      // 密码加密
      // params.password = encryptByDES(params.password);
      const res = await fetchApi.login(params);
      if (res) {
        // save token
        this.setToken(res.token);
      }
      return res;
    },

    async show(params: ReqParams4) {
      const res = await fetchApi.show(params);
      if (res) {
        // @ts-ignore
        if (params.username == "") {
          // save info
          this.setInfo(res.user);
        }

        console.log(res);
      }
      return res;
    },

    async update(params: ReqParams2) {
      const res = await fetchApi.update(params);
      if (res) {
        // save info
        this.setInfo(res.user);
        console.log(res);
      }
      return res;
    },

    async changePwd(params: ReqParams3) {
      const res = await fetchApi.changePwd(params);
      if (res) {
        // save info
        // this.setInfo(res.user);
        console.log(res);
      }
      return res;
    },

    /**
     * @description: logout
     */
    async logout() {
      this.resetState();
      removeToken();
      router.replace("/");
      // 路由表重置
      location.reload();
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
