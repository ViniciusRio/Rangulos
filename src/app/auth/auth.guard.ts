import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  canLoad(route: Route,
          segments: UrlSegment[]):
      Observable<boolean> | Promise<boolean> | boolean {
        if (!this.authService.userAuth) {
          this.router.navigateByUrl('/auth');
        }
        return this.authService.userAuth;
  }
}
