import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  
  public items: IngresoEgreso[];
  public items$: Subscription = new Subscription();
  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {

    this.items$ = this.store.select('ingresoEgreso')
    .subscribe(data =>{
      this.items = data.items;
    });

  }
  
  ngOnDestroy() {
    this.items$.unsubscribe();
  }

  borrarIngresoEgreso(id: string){
    this.ingresoEgresoService
    .borrarIngresoEgreso(id)
    .then(() => {
      swal('Exito!','Exito al borrar' ,'success')
    })
    .catch((err) =>{
      console.error(err);
    });
    
  }

}
