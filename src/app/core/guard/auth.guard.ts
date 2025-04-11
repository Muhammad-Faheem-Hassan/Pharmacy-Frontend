import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/common/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private toastr: ToastrService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (AuthService.isLogged()) {
      const user = AuthService.getLoggedUser().data;

      if (!user.verified) {
        this.toastr.info("Your account is not verified, please contact support.");
        this.router.navigate(['/login']);
        return false;
      }


      if (user?.isBlocked) {
        this.toastr.info("Your access is blocked, please contact support.");
        this.router.navigate(['/login']);
        return false;
      }

      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
  }
}