import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit,OnDestroy {

  private items$: Subscription = new Subscription();
  public items;
  cuantosIngresos: number;
  cuantosEgresos: number;
  egresos: number;
  ingresos: number;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.items$ = this.store
      .select('ingresoEgreso')
      .subscribe(data =>{
      this.items = data.items;
      this.contarIngresosEgresos(this.items);
    })
  }
  contarIngresosEgresos(items: IngresoEgreso[]) {
    this.cuantosIngresos = 0;
    this.cuantosEgresos = 0;
    this.egresos = 0;
    this.ingresos = 0;

    for (const item of items) {
      if (item.tipo === 'ingreso') {
        this.cuantosIngresos++;
        this.ingresos += item.monto;
      }
      else{
        this.cuantosEgresos++;
        this.egresos += item.monto;
      }
    }
  }

  ngOnDestroy() {
    this.items$.unsubscribe();
  }

}
