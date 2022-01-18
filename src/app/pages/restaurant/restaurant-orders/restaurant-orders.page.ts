import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AppConstants } from 'src/app/config/app-constants';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-restaurant-orders',
  templateUrl: './restaurant-orders.page.html',
  styleUrls: ['./restaurant-orders.page.scss'],
})
export class RestaurantOrdersPage implements OnInit {
  orders: any;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
  ) { }

  async ngOnInit() {
    await this.getOrders();
  }
  async getOrders() {

    const loading = await this.loadingCtrl.create({
      message: 'Chargement en cours...',
    });
    await loading.present();
    return (await (this.httpService.authGet(AppConstants.addCommande))).pipe(
      finalize(() => {
        loading.dismiss();
      })
    ).subscribe((res: any) => {
      if (res.success) {
        console.log(res);
        this.orders = res.data.orders;
        console.log(this.orders);
      }
    },
      (error: any) => {
        this.toastService.presentToast('Pas de resultat');
        console.log(error);
        console.log('HAMZA' + JSON.stringify(error));
        console.log('Network Issue.');
      });
  }
  async ionViewWillEnter() {
    await this.getOrders();
  }

}
