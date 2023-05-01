import { defineStore } from "pinia";
import { store } from "@/stores";
import type {ReqParams1, ReqParams2,ReqParams3,ReqParams4} from "@/api/event/model";
import fetchApi from "@/api/event";
// import { encryptByDES } from '/@/utils/crypto';
import { getToken, setToken, removeToken } from "@/utils/auth";
import { router } from "@/router";



export const useEventStore = defineStore("event", {

    getters: {

    },
    actions: {


        /**
         * @description: getNotifications
         */
        async getNotifications() {
            const res = await fetchApi.getNotifications();
            // if (res) {
            // }
            return res;
        },

        /**
         * @description: like
         */
        async like(params: ReqParams1) {
            const res = await fetchApi.like(params);
            // if (res) {
            // }
            return res;
        },

        /**
         * @description: follow
         */
        async follow(params: ReqParams4) {
            const res = await fetchApi.follow(params);
            // if (res) {
            // }
            return res;
        },
        /**
         * @description: following_list
         */
        async following_list(params: ReqParams4) {
            const res = await fetchApi.following_list(params);
            // if (res) {
            // }
            return res;
        },

        /**
         * @description: followed_list
         */
        async followed_list(params: ReqParams4) {
            const res = await fetchApi.followed_list(params);
            // if (res) {
            // }
            return res;
        },
        /**
         * @description: reply
         */
        async reply(params: ReqParams2) {
            const res = await fetchApi.reply(params);
            // if (res) {
            // }
            return res;
        },

        /**
         * @description: getReply
         */
        async getReply(params: ReqParams3) {
            const res = await fetchApi.getReply(params);
            if (res) {
                console.log(res)
            }
            return res;
        },

    },
});

// Need to be used outside the setup
export function useEventStoreWithOut() {
    return useEventStore(store);
}
