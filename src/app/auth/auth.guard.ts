import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }
    
    /** 
     * This method will be exectuted by Angular 
     * whenever we a run to it 
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
        if (this.authService.isAuth()) {
            return true;
        } else {
            this.router.navigate(['/login'])
        }
    }

}