import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  {
    path:'login', 
    component: LoginComponent
  },
  {
    path:'registro', 
    component: RegisterComponent
  },
  {
    path:'dashboard', 
    component: DashboardComponent
  },
  {
    path:'', 
    component: DashboardComponent
  },
  { // Para cualquier otro valor redirigir al dashboard
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
