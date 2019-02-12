import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  

  constructor(
    private authService:AuthService,
    private router: Router
    ){
  }
  // implements CanActivate
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {      
    return this.authService.isAuth();
  }

  canLoad(route: Route): Observable<boolean> | boolean {
    let url: string = route.path;
    console.log('Url:'+ url);
    console.log('Holi :'+ url);
    return this.authService.isAuth().pipe(
      tap(val => console.log(`Pase por pipe`)),
    );
  }
}
