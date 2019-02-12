import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';

export const dashboardRoutes: Routes = [
  {
    path:'', 
    component: EstadisticaComponent
  },
  {
    path:'detalle', 
    component: DetalleComponent
  },
  {
    path:'ingreso-egreso', 
    component: IngresoEgresoComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class IngresoEgresoRoutingModule { }
