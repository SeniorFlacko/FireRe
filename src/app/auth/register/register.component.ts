import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

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

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  submit({ email, password }){ // Destructuracion de parametros
    this.authService.createUser(email,password);
  }

}
