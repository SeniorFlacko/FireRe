
import * as fromIngresoEgreso from './ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';


export interface ingresoEgresoState{
    items: IngresoEgreso[];
}

const initialState: ingresoEgresoState = {
    items: []
}

export function reducerIngresoEgreso(state = initialState, action: fromIngresoEgreso.Actions): ingresoEgresoState{
    let accion;
    switch (action.type) {
        
        case fromIngresoEgreso.SET_ITEMS:
            accion = <fromIngresoEgreso.setItemsAction> action;
            return {
                items: [
                    ...accion.items.map(item => {
                        return {
                            ...item
                        }
                    })
                ]
            }

        case fromIngresoEgreso.UNSET_ITEMS:
            return {
                items: []
            }
    
        default:
            return state;
    }
}