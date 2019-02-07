import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    button:disabled{
      cursor: no-drop;
    }
  `]
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


  submit({email,password}){
    this.authService.login(email, password);
  }
}
