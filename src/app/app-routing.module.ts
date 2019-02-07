import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';
import { AuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  {
    path:'', 
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
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
    component: DashboardComponent,
    children: dashboardRoutes,
    canActivate: [AuthGuard]
  },
  { // Para cualquier otro valor redirigir al dashboard
    path: '**',
    redirectTo: '/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
