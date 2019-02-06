import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth, private router: Router) { }


  createUser(email, password){

    return this.afAuth.auth
            .createUserWithEmailAndPassword(email,password)
            .then(response => {
              console.log(response);
              this.router.navigate(['']);
            })
            .catch(error => {
              console.error(error);
            });
  }
}
