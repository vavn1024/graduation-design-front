export interface ReqParams {
    name: string;
    password: string;
    repeatPwd: string;
}
export interface ReqParams4 {
    username: string;
}

export interface ReqParams2 {
    Nickname: string;
    Avatar:string;
    Banner:string;
    Describe:string;
}

export interface ReqParams3 {
    password: string;
    newPassword:string;
}

export interface ReqAuth {
    auths: string[];
    modules: string[];
    is_admin?: 0 | 1;
}
export interface ResInfo {
    user: User;
}
export interface User {
    name: string;
    nick_name:string;
    avatar:string;
    notes_count:number;
    created_at:number
    isFollowing:number;
}
export interface ResResult {
    token: string;
}

