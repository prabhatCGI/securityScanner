import { type } from "os";
import { idText } from "typescript";

type GUID = string & { isGuid: true};
function guid(guid: string) : GUID {
    return  guid as GUID; 
}

export interface scanSchema {
    id: GUID;
    status: string;
    repositoryName: number;
    Findings: [{number:number, type:String, ruleID: String, location:{path:String, positions:{begin:{line:Number}}}}];
    queuedAt:Date,
    scanningAt:Date,
    finishedAt: Date
}; 
