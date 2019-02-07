import { Action } from '@ngrx/store';
export const ACTIVAR_LOADING = '[LOADER] Activar Loader';
export const DESACTIVAR_LOADING = '[LOADER] Desactivar Loader';


export class ActivarLoaderAction implements Action{
    readonly type: string = ACTIVAR_LOADING;
}

export class DesactivarLoaderAction implements Action{
    readonly type: string = DESACTIVAR_LOADING;
}


export type Actions = ActivarLoaderAction | DesactivarLoaderAction; 

