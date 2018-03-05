import { User } from "./user.model";
import { AuthData } from "./auth-data.model";

import { Subject } from 'rxjs/Subject';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();               // Subject is same as EventEmitter
  private isAuthenticated = false;

  constructor(
      private router: Router, 
      private afAuth: AngularFireAuth,
      private traningService: TrainingService
    ) { }

  /**
   * It will emit an event
   * whenever the authentication
   * status changes.
   */
  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);                 // emit true - that user is logged in
        this.router.navigate(['/training']);
      } else {
          this.traningService.cancelSubscriptions();
          this.authChange.next(false);              // emit false - that user is logout
          this.router.navigate(['/login']);
          this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email, 
      authData.password
    ).then(result => {
      this.authSuccessfully();
    })
    .catch(error => {
      console.log(error);
    });
  }

  login(authData: AuthData) {
    this.afAuth.auth.signInWithEmailAndPassword(    
      authData.email, 
      authData.password
    ).then(result => {
      
    })
    .catch(error => {
      console.log(error);
    });   
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  /**
   *  If the user is not
   *  equa to null we 
   *  will get true
   */
  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccessfully() {
    
  }
}