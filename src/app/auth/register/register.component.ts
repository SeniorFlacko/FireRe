import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  constructor() { }

  ngOnInit() {
  }

  submit(registerForm: NgForm){
    console.log(registerForm.value);
  }

}
