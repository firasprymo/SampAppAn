import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //   let loggedIn = this.authService.isAuthenticated();
        // console.log(loggedIn)
        // if (loggedIn) {
        //     console.log('true')
        //     this.router.navigateByUrl('dashboard/dashboard1')
        //
        //     return true
        //   } else {
        //       this.router.navigateByUrl('pages/login')
        //
        //       console.log('false')
        //       return false
        //   }
        if (!this.authService.isLoggedIn()) {
            this.router.navigateByUrl('login')
            console.log('false')
            return false
        }
        console.log('true')
        // this.router.navigateByUrl('/dashboard/dashboard1')

        return true
    }
}
