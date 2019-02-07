import * as fromAuth from './auth.actions';
import { User } from '../models/user';

export interface AuthState{
    user: User;
}

export const initialAuthState: AuthState = {
    user: null
}

export function authReducer( state = initialAuthState, action: fromAuth.Actions ): AuthState{
    switch (action.type) {
        case fromAuth.SET_USER:
            return {
                user: action.user
            }
    
        default:
            return state;
    }
}