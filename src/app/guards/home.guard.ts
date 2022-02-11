import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConstants } from '../config/app-constants';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanLoad, CanActivate {
  constructor(public storageService: StorageService, public router: Router) { }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
    return new Promise(resolve => {
      this.storageService
        .get(AppConstants.auth)
        .then(res => {
          if (res.role) {
            console.log(res);
            if (res.role === 'clt') {
              console.log('client');
              this.router.navigate(['client']);
            } else {
              console.log('restaurant');
              this.router.navigate(['restaurant']);
            }
            resolve(false);

            // console.log('data is set');
          } else {
            resolve(true);
          }
        })
        .catch(err => {
          console.log('error');
          resolve(true);
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
          if (res.role) {
            console.log(res);
            if (res.role === 'clt') {
              console.log('client');
              this.router.navigate(['client']);
            } else {
              console.log('restaurant');
              this.router.navigate(['restaurant']);
            }
            resolve(false);

            // console.log('data is set');
          } else {
            resolve(true);
          }
        })
        .catch(err => {
          console.log('error');
          resolve(true);
        });
    });

  }
}
