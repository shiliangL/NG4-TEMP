import { Injectable }     from '@angular/core';
import { CanActivate, Router }    from '@angular/router';

@Injectable()
export class AuthService implements  CanActivate {

    constructor(private router: Router) {
    }

    canActivate() {
        return true;
        // if (this.appService.checkLogin()) {
        //     return true;
        // } else {
        //     this.router.navigate(['login']);
        // }
    }
}
