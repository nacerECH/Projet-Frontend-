import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/config/app-constants';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanLoad {
  constructor(public storageService: StorageService, public router: Router) { }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
    return new Promise(resolve => {
      this.storageService
        .get(AppConstants.auth)
        .then(res => {
          if (res.role === 'clt') {
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
