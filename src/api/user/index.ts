import type {ReqAuth, ReqParams, ReqParams2, ReqParams3, ReqParams4, ResInfo, ResResult} from './model';
import { get, post } from '@/utils/http';

enum URL {
    register='/api/auth/register',
    login = '/api/auth/login',
    show = '/api/users/show',
    update = '/api/users/update',
    changePwd='/api/users/changePwd',
    permission = '/v1/user/permission',
}
const register = async (data: ReqParams) => post<ResResult>({ url: URL.register, data });

const login = async (data: ReqParams) => post<ResResult>({ url: URL.login, data });


const show = async (data:ReqParams4) => get<ResInfo>({url:URL.show,params:data});

const update = async (data:ReqParams2) => post<ResInfo>({url:URL.update,data});

const changePwd = async (data:ReqParams3) => post<ResInfo>({url:URL.changePwd,headers:{'Content-Type':'application/x-www-form-urlencoded'},data});

const permission = async () => get<ReqAuth>({ url: URL.permission });

export default { register,login, show,update,changePwd,permission };
