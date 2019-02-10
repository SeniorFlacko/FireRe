import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import swal from 'sweetalert';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivarLoaderAction, DesactivarLoaderAction } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  private egresoIngresoForm: FormGroup;
  private tipo = 'ingreso'; 
  public loading: boolean;
  private loading$: Subscription =  new Subscription();

  constructor(
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
    ) { 
      this.loading$ = this.store.select('ui').subscribe(ui =>{
        this.loading = ui.isLoading;
      })

    }

  ngOnInit() {
    this.egresoIngresoForm =  new FormGroup({
      'description': new FormControl('', Validators.required),
      'monto': new FormControl('', [Validators.required, Validators.min(1)])
    });
  }
  ngOnDestroy() {
    this.loading$.unsubscribe();
  }

  crearIngresoEgreso(){
    let ingresoEgreso: IngresoEgreso = this.egresoIngresoForm.value;
    ingresoEgreso.tipo = this.tipo;
    console.log(this.egresoIngresoForm.value);

    this.store.dispatch(new ActivarLoaderAction());
    this.ingresoEgresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        swal('Exito!', 'Operacion exitosa', 'success');
        this.egresoIngresoForm.patchValue({
          monto: 0
        });
      })
      .catch(err => console.error(err))
      .finally(() => {
        this.store.dispatch(new DesactivarLoaderAction());
      });
    
  }

}
