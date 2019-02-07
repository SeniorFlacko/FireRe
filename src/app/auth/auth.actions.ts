import { Action } from "@ngrx/store";
import { User } from "../models/user";

export const SET_USER = '[Auth] Set User';

export class SetUserAction implements Action{
    readonly type: string = SET_USER;
    constructor(public user: User){}
}


export type Actions = SetUserAction;