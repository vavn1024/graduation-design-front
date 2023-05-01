import type {ReqParams,ReqParams2, ReqParams_LocalLine, ResResult,ResResult2, ResResult_LocalLine} from './model';
import { get, post ,del} from '@/utils/http';

enum URL {
    publish='/api/notes/publish',
    local_timeline='/api/notes/local-timeline',
    getNoteById='/api/notes/getNoteById',
    search='/api/notes/search',
    delNoteById='/api/notes/delete',
}
const publish = async (data: ReqParams) => post<ResResult>({ url: URL.publish, headers:{'Content-Type':'application/x-www-form-urlencoded'},data });

const local_timeline = async (data: ReqParams_LocalLine) => get<ResResult_LocalLine>({ url: URL.local_timeline, params: data});

const getNoteById = async (data: ReqParams2) => get<ResResult2>({ url: URL.getNoteById, params: data});

const search = async (key: string) => get<ResResult_LocalLine>({ url: URL.search, params: {'key':key}});

const delNoteById = async (data: ReqParams2) => del<ResResult>({ url: URL.delNoteById, params: data});

export default { publish,local_timeline ,getNoteById,search,delNoteById};
