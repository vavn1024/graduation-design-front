import { defineStore } from "pinia";
import { store } from "@/stores";
import type {ReqParams, ReqParams2, ReqParams_LocalLine} from "@/api/note/model";
import fetchApi from "@/api/note";
// import { encryptByDES } from '/@/utils/crypto';
import { getToken, setToken, removeToken } from "@/utils/auth";
import { router } from "@/router";



export const useNoteStore = defineStore("note", {

    getters: {

    },
    actions: {


        /**
         * @description: publish
         */
        async publish(params: ReqParams) {
            const res = await fetchApi.publish(params);
            if (res) {
                console.log(res)
            }
            return res;
        },

        /**
         * @description: getLocalTimeLine
         */
        async local_timeline(params: ReqParams_LocalLine) {
            const res = await fetchApi.local_timeline(params);
            if (res) {
                console.log(res)
            }
            return res;
        },

        /**
         * @description: getNoteById
         */
        async getNoteById(params: ReqParams2) {
            const res = await fetchApi.getNoteById(params);
            if (res) {
                console.log(res)
            }
            return res;
        },

        /**
         * @description: search
         */
        async search(key:string) {
            const res = await fetchApi.search(key);
            if (res) {
                console.log(res)
            }
            return res;
        },

        /**
         * @description: delNoteById
         */
        async delNoteById(data:ReqParams2) {
            const res = await fetchApi.delNoteById(data);
            if (res) {
                console.log(res)
            }
            return res;
        },

    },
});

// Need to be used outside the setup
export function useNoteStoreWithOut() {
    return useNoteStore(store);
}
