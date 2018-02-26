import { User } from "./user.model";
import { AuthData } from "./auth-data.model";

import { Subject } from 'rxjs/Subject';

export class AuthService {
    authChange = new Subject<boolean>();       // This is same as EventEmitter
    private user: User;

    registerUser(authData: AuthData) {
        this.user = {             
          email: authData.email,
          userId: Math.round(Math.random() * 10000).toString()
        };
        this.authChange.next(true);      // emit true - that user is logged in
    }

    login(authData: AuthData) {
        this.user = {             
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authChange.next(true);     // emit true - that user is logged in
    }

    logout() {
        this.user = null;
        this.authChange.next(false);    // emit false - that user is logout
    }
    
    /** To prevent that this object can be changed outside of this class, 
     * we need to use Object Spread Opertor to spread the properties of 
     * the user object stored in the serivce, into this new object. */
    getUser() {
      return { ...this.user };      
    }

    /**
     *  If the user is not
     *  equa to null we 
     *  will get true
     */
    isAuth() {
      return this.user != null;
    }
}