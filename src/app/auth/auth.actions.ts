import { Action } from "@ngrx/store";
import { User } from "../models/user";

export const SET_USER = '[Auth] Set User';
export const UNSET_USER = '[Auth] Unset User';

export class SetUserAction implements Action{
    readonly type: string = SET_USER;
    constructor(public user: User){}
}
export class UnsetUserAction implements Action{
    readonly type: string = UNSET_USER;
}


export type Actions = SetUserAction | UnsetUserAction;