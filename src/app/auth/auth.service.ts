import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoaderAction, DesactivarLoaderAction } from '../shared/ui.actions';
import { Subscription } from 'rxjs';
import { SetUserAction } from './auth.actions';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription;

  constructor( 
    private afAuth: AngularFireAuth, 
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>
    ) { }

  initAuthListener(){

    this.userSubscription = this.afAuth.authState.subscribe( (user: firebase.User) => {
      if ( user ) { // Si hay usuario entonces esta loggeado
        this.afDB.doc(`${ user.uid }/user`)
          .valueChanges()
          .subscribe( ( user:User  ) => {
            const usuario: User = user;
            this.store.dispatch(new SetUserAction( usuario ));
            console.log(user);
          });
      }
      else{ // Si no hay usuario entonces no esta loggeado y nos desuscribimos a cambios
        this.userSubscription.unsubscribe();
      }
    });

  }

  createUser(email, name, password){
    this.store.dispatch( new ActivarLoaderAction() );
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
                  this.store.dispatch( new DesactivarLoaderAction() );
  
                })
                .catch(e => {
                  swal('Error',e.message, 'error');
                  this.store.dispatch( new DesactivarLoaderAction() );
                });
                

            })
            .catch(error => {
              swal('Error en el login',error.message, 'error');
              this.store.dispatch( new DesactivarLoaderAction() );
            });
  }

  login(email, password){
    
    this.store.dispatch( new ActivarLoaderAction() );
    
    this.afAuth.auth
    .signInWithEmailAndPassword(email, password)
    .then(response => {
      this.router.navigate(['/dashboard']);
    })
    .catch(error => {
      swal('Error en el login',error.message, 'error');
    })
    .finally(() =>{
      this.store.dispatch( new DesactivarLoaderAction() );
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
