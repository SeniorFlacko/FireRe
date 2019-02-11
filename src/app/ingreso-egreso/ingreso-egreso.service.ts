import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { setItemsAction, unsetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {
  private authListener$: Subscription = new Subscription();
  private items$: Subscription = new Subscription();

  constructor(
    private afDB: AngularFirestore,
    private authService: AuthService,
    private store: Store<AppState>
    ) { }

  initIngresoEgresoListener(){
    this.authListener$ = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe( auth => {
        // console.log(auth.user.uid);
        this.ingresoEgresoItems(auth.user.uid);
      });
  }

  ingresoEgresoItems(uid: string){
    this.items$ = this.afDB.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(item =>{
          return item.map(item =>{
            return {
              uid: item.payload.doc.id,
              ...item.payload.doc.data()
            }
          })
        })
      )
      .subscribe( ( items: any ) =>{
        this.store.dispatch(new setItemsAction(items));
        // console.log(items);
      });
  }

  borrarIngresoEgreso(id: string){
    const user = this.authService.getUsuario();
    return this.afDB.doc(`${user.uid}/ingresos-egresos/items/${id}`)
      .delete();
  }

  unsuscribeAll$(){
    this.items$.unsubscribe();
    this.authListener$.unsubscribe();
    this.store.dispatch( new unsetItemsAction());
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso){
    return this.afDB.doc(`${ this.authService.getUsuario().uid }/ingresos-egresos`)
      .collection(`items`).add(ingresoEgreso);
  }
}
