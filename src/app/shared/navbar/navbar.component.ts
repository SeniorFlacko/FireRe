import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  public user$: Observable<User>;

  constructor(private store: Store<AppState>) { 
    this.user$ = this.store
    .select('auth')
    .pipe(
      filter( auth => auth.user!=null ),
      map(auth => auth.user)
    );
  }

  ngOnInit() {
  }

}
