import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngresoEgresoRoutingModule } from './ingreso-egreso-routing.module';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdenIngresoEgresoPipe } from './orden-ingreso-egreso.pipe';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    EstadisticaComponent,
    DetalleComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoEgresoPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    IngresoEgresoRoutingModule,
  ]
})
export class IngresoEgresoModule { }
