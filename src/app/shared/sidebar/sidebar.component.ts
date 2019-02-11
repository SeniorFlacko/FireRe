import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/models/user';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from 'src/app/ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`
  .nav-item{
    cursor: pointer
  }
  `]
})
export class SidebarComponent implements OnInit {

  public user: User;

  constructor(
    private authService: AuthService,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
    ) { 
      this.store
      .select('auth')
      .pipe(
        filter( auth => auth.user!=null)
      )
      .subscribe(auth => {
        this.user = auth.user;
      });
    }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
    this.ingresoEgresoService.unsuscribeAll$();
  }

}
