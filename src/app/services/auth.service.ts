import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConstants } from '../config/app-constants';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router
  ) { }

  login(loginData: any): Observable<any> {
    return this.httpService.post('login', loginData);
  }

  signup(postData: any): Observable<any> {
    return this.httpService.post('register', postData);
  }
  signupClient(registerData: any): Observable<any> {
    return this.httpService.post('signup', registerData);
  }
  signupRestaurant(registerData: any): Observable<any> {
    return this.httpService.post(AppConstants.restaurantRegister, registerData);
  }

  logout() {
    // this.storageService.removeStorageItem(AppConstants.auth).then(res => {
    //   this.router.navigate(['/login']);
    return this.httpService.authPost(AppConstants.logout);
  }


}
