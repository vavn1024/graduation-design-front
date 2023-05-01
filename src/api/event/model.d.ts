export interface ReqParams1 {
    note_id: string;
}

export interface ResResult1 {
    note_id: string;
}

export interface ReqParams2 {
    note_id: string;
    content: string;
}

export interface ResResult2 {
    event_id:string;
    note_id: string;
    content: string;
}

export interface ReqParams3 {
    note_id: string;
}

export interface ResResult3 {
    events: string[];
}

export interface ReqParams4 {
    name: string;
}

export interface ResResult4 {
    target_id: string;
}

export interface ResResult5 {
    following_list: string[];
}
