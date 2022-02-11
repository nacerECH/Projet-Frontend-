import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/config/app-constants';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantGuard implements CanLoad, CanActivate {
  constructor(public storageService: StorageService, public router: Router) { }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
    return new Promise(resolve => {
      this.storageService
        .get(AppConstants.auth)
        .then(res => {
          if (res.role === 'rst') {
            resolve(true);
          } else {
            this.router.navigate(['home/login']);
            resolve(false);
          }
        })
        .catch(err => {
          resolve(false);
        });
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return new Promise(resolve => {
      this.storageService
        .get(AppConstants.auth)
        .then(res => {
          if (res.role === 'rst') {
            resolve(true);
          } else {
            this.router.navigate(['home/login']);
            resolve(false);
          }
        })
        .catch(err => {
          resolve(false);
        });
    });

  }
}
