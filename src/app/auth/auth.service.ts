import { User } from "./user.model";
import { AuthData } from "./auth-data.model";

import { Subject } from 'rxjs/Subject';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from "../shared/ui.service";
import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();               // Subject is same as EventEmitter
  private isAuthenticated = false;

  constructor(
      private router: Router, 
      private afAuth: AngularFireAuth,
      private traningService: TrainingService,
      private uiService: UIService,
      private store: Store<{ui: fromRoot.State}>
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
    //this.uiService.loadingStateChanged.next(true);     
    this.store.dispatch(new UI.StartLoading());    
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email, 
      authData.password
    ).then(result => {
    // this.uiService.loadingStateChanged.next(false);   
        this.store.dispatch(new UI.StopLoading());               
    })
    .catch(error => {
 //   this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());                     
      this.uiService.showSnackbar(error.message, null, 3000);
    });
  }

  login(authData: AuthData) {
   // this.uiService.loadingStateChanged.next(true);             // set to true to indicate that we started loading
   this.store.dispatch(new UI.StartLoading());        
   this.afAuth.auth.signInWithEmailAndPassword(    
      authData.email, 
      authData.password
    ).then(result => {
     // this.uiService.loadingStateChanged.next(false);          // also emit an event once we're done  
     this.store.dispatch(new UI.StopLoading());                   
    })
    .catch(error => {
      this.uiService.loadingStateChanged.next(false);
      this.uiService.showSnackbar(error.message, null, 3000);
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