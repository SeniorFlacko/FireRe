import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [`
    button:disabled{
      cursor: no-drop !important;
    }

  `]
})
export class RegisterComponent implements OnInit {
  
  public cargando: boolean;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
    ) { }

  ngOnInit() {
    this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
    });
  }

  submit({ email, name,  password }){ // Destructuracion de parametros
    this.authService.createUser(email,name,password);
  }

}
