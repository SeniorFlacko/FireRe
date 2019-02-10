import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private afDB: AngularFirestore,
    private authService: AuthService
    ) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso){
    return this.afDB.doc(`${ this.authService.getUsuario().uid }/ingresos-egresos`)
      .collection(`items`).add(ingresoEgreso);
  }
}
