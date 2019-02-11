import * as fromAuth from './auth.actions';
import { User } from '../models/user';

export interface AuthState{
    user: User;
}

export const initialAuthState: AuthState = {
    user: null
}

export function authReducer( state = initialAuthState, action: fromAuth.Actions ): AuthState{
    let accion;
    switch (action.type) {
        
        case fromAuth.SET_USER:
            accion = <fromAuth.SetUserAction> action;
            return {
                user: accion.user
            }

        case fromAuth.UNSET_USER:
            accion = <fromAuth.UnsetUserAction> action;
            return {
                user: null
            }
    
        default:
            return state;
    }
}