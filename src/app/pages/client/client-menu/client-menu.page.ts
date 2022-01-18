import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AppConstants } from 'src/app/config/app-constants';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-client-menu',
  templateUrl: './client-menu.page.html',
  styleUrls: ['./client-menu.page.scss'],
})
export class ClientMenuPage implements OnInit, OnDestroy {
  dataSubscription: any;
  menus: any;
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
      await this.getMenus(params.get('id'));

    }, error => {
      console.log(error);
    });
  }
  async getMenus(id) {

    let params = new HttpParams();
    params = params.append('id', id);
    const loading = await this.loadingCtrl.create({
      message: 'Chargement en cours...',
    });
    await loading.present();
    return (await (this.httpService.authGet(AppConstants.addMenu, params))).pipe(
      finalize(() => {
        loading.dismiss();
      })
    ).subscribe((res: any) => {
      if (res.success) {
        console.log(res);
        this.menus = res.data;
        console.log(this.menus);
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

}
