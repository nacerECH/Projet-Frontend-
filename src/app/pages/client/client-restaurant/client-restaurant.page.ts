import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AppConstants } from 'src/app/config/app-constants';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-client-restaurant',
  templateUrl: './client-restaurant.page.html',
  styleUrls: ['./client-restaurant.page.scss'],
})
export class ClientRestaurantPage implements OnInit, OnDestroy {
  dataSubscription: any;
  restaurant: any;
  isLiked: boolean;
  id: any;
  constructor(
    private router: Router,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
  ) { }

  async ngOnInit() {
    this.dataSubscription = await this.activatedRoute.paramMap.subscribe(async params => {
      console.log(params.get('id'));
      console.log(params);
      this.id = params.get('id');
      await this.getRestaurantById(params.get('id'));
      await this.getIfLiked(params.get('id'));

    }, error => {
      console.log(error);
    });
  }
  async getRestaurantById(id) {


    const loading = await this.loadingCtrl.create({
      message: 'Chargement en cours...',
    });
    await loading.present();
    return (await (this.httpService.authGet(AppConstants.getRestaurants + '/' + id))).pipe(
      finalize(() => {
        loading.dismiss();
      })
    ).subscribe((res: any) => {
      if (res.success) {
        // this.router.navigate(['home']);
        console.log(res.data.restaurant);
        console.log('HAMZA' + JSON.stringify(res));
        this.restaurant = res.data.restaurant;
        console.log(this.restaurant);
      }
    },
      (error: any) => {
        this.toastService.presentToast('Pas de resultat');
        console.log(error);
        console.log('HAMZA' + JSON.stringify(error));
        console.log('Network Issue.');
      });
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
  async getIfLiked(id) {
    let params = new HttpParams();
    params = params.append('type', 'restaurant');
    params = params.append('operation', 'verification');


    const loading = await this.loadingCtrl.create({
      message: 'Chargement en cours...',
    });
    await loading.present();
    return (await (this.httpService.authGet(AppConstants.likes + '/' + id, params))).pipe(
      finalize(() => {
        loading.dismiss();
      })
    ).subscribe((res: any) => {
      if (res.success) {
        console.log('Like existe');
        console.log(res);
        this.isLiked = res.data.result;
        console.log(this.isLiked);

      }
    },
      (error: any) => {
        this.toastService.presentToast('Pas de resultat');
        console.log(error);
        console.log('HAMZA' + JSON.stringify(error));
        console.log('Network Issue.');
      });
  }
  async toggle() {
    let params = new HttpParams();
    params = params.append('type', 'restaurant');
    params = params.append('operation', 'edit');
    if (this.isLiked === true) {
      params = params.append('action', 'dettach');
    } else {
      params = params.append('action', 'attach');

    }
    // const loading = await this.loadingCtrl.create({
    //   message: 'Chargement en cours...',
    // });
    // await loading.present();
    return (await (this.httpService.authGet(AppConstants.likes + '/' + this.id, params))).pipe(
      finalize(() => {
        // loading.dismiss();
      })
    ).subscribe((res: any) => {
      if (res.success) {
        this.isLiked = !this.isLiked;
        console.log('Like existe');
        console.log(res);
        this.isLiked = res.data.result;
      }
    },
      (error: any) => {
        this.toastService.presentToast('Pas de resultat');
        console.log(error);
        console.log('HAMZA' + JSON.stringify(error));
        console.log('Network Issue.');
      });
  }
}
