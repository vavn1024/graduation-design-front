import { get, post } from '@/utils/http';
import type {ReqParams1, ReqParams2,ReqParams3,ReqParams4,ResResult1,ResResult2,ResResult3,ResResult4,ResResult5} from "@/api/event/model";

enum URL {
    getNotifications='/api/events/notifications',
    like='/api/events/like',
    follow='/api/events/follow',
    following_list='/api/events/following_list',
    followed_list='/api/events/followed_list',
    reply='/api/events/reply',
    getReply='/api/events/getReply',
}

const getNotifications = async () => get<ResResult3>({ url: URL.getNotifications});

const like = async (data: ReqParams1) => get<ResResult1>({ url: URL.like, params: data});

const follow = async (data: ReqParams4) => get<ResResult4>({ url: URL.follow, params: data});

const following_list = async (data: ReqParams4) => get<ResResult5>({ url: URL.following_list, params: data});

const followed_list = async (data: ReqParams4) => get<ResResult5>({ url: URL.followed_list, params: data});

const reply = async (data: ReqParams2) => post<ResResult2>({ url: URL.reply,headers:{'Content-Type':'application/x-www-form-urlencoded'}, data });

const getReply = async (data: ReqParams3) => get<ResResult3>({ url: URL.getReply,params: data});

export default { getNotifications,like,follow,following_list,followed_list,reply ,getReply};
