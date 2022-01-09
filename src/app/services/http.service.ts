/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppConstants } from '../config/app-constants';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  token = '';

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  post(serviceName: string, data: any) {
    const headers = new HttpHeaders();
    headers.set('Accept', 'application/json');
    const options = { headers, withCredintials: false };
    const url = environment.apiUrl + serviceName;

    return this.http.post(url, data, options);
  }

  async authPost(serviceName: string, data = null) {

    await this.storageService
      .get(AppConstants.auth)
      .then(res => {
        this.token = res.token;
      });
    // const headers = new HttpHeaders();
    // console.log(this.token);

    // headers.set('Accept', 'application/json');
    // headers.set('Authorization', `Bearer ${this.token}`);
    // const options = { headers, withCredintials: false };
    const url = environment.apiUrl + serviceName;


    return this.http.post(url, data, {
      headers: new HttpHeaders(
        {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          // eslint-disable-next-line quote-props
          'Authorization': `Bearer ${this.token}`,
          // eslint-disable-next-line quote-props
          'Accept': 'application/json'
        })
    }

    );
  }
}
