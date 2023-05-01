export interface ReqParams {
    content: string;
    urls: string;
}
export interface ResResult {
    noteId: string;
}

export interface ReqParams2 {
    note_id: string;
}
export interface ResResult2 {
    note: string;
}

export interface ReqParams_LocalLine {
    offset:number;
    limit:number;
    username:string;
}
export interface ResResult_LocalLine {
    notes: string[];
}



