import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

// Providers
import { ApiProvider } from './api.provider';

// Interfaces
import { log, logTypes } from '../interfaces/log.interface';

@Injectable({
  providedIn: 'root',
})
export class GuardProvider implements CanActivate {

  constructor(
    private router: Router,
    private apiProvider: ApiProvider
  ) { }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    try {
      await this.apiProvider.checkSession();

      // user already logged in
      if (route.url[0].path === 'login' || route.url[0].path === 'register') {
        await this.router.navigateByUrl('/tabs/home');
      }

      return true;
    } catch (e) {
      log(this, 'No session...', logTypes.WARN);

      // can only go to login or register
      // avoid login guard loop
      if (route.url[0].path === 'login' || route.url[0].path === 'register') {
        return true;
      }
      else {
        await this.router.navigateByUrl('/login');
      }

      return false;
    }
  }
}
