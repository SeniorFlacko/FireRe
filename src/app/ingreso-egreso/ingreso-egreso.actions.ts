import { Action } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export const SET_ITEMS = '[Ingreso Egreso] Set Items';
export const UNSET_ITEMS = '[Ingreso Egreso] Unset Items';


export class setItemsAction implements Action{
    readonly type: string = SET_ITEMS;
    constructor(public items: IngresoEgreso[]){}
}

export class unsetItemsAction implements Action{
    readonly type: string = UNSET_ITEMS;
    constructor(){}
}

export type Actions = setItemsAction | unsetItemsAction;