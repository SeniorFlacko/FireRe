import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( 
    private afAuth: AngularFireAuth, 
    private router: Router,
    private afDB: AngularFirestore
    ) { }

  initAuthListener(){

    this.afAuth.authState.subscribe( user => {
      console.log(user);
    });
  }

  createUser(email, name, password){

    return this.afAuth.auth
            .createUserWithEmailAndPassword(email,password)
            .then(response => {
              
              const usuario = {
                nombre: name,
                email: response.user.email,
                uid: response.user.uid
              }

              this.afDB.doc(`${response.user.uid}/user`)
                .set(usuario)
                .then(() =>{
                  this.router.navigate(['/dashboard']);   
                })
                .catch(e => {
                  swal('Error',e.message, 'error');
                });
                

            })
            .catch(error => {
              swal('Error en el login',error.message, 'error');
            });
  }

  login(email, password){
    this.afAuth.auth
    .signInWithEmailAndPassword(email, password)
    .then(response => {
      this.router.navigate(['/dashboard']);
    })
    .catch(error => {
      swal('Error en el login',error.message, 'error');
    });
  }

  logout(){
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

  isAuth(){
    return this.afAuth
    .authState
    .pipe(
      map(user => {
        if (!user) { //  usuario es null
          this.router.navigate(['/login']);
        }
        return user!=null;
      })
    )
  }
}
