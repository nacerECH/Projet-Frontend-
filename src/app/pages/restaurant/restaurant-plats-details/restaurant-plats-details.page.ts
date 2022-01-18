import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Accompagnement } from 'src/app/interfaces/accompagnement';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { HttpParams } from '@angular/common/http';
import { AppConstants } from 'src/app/config/app-constants';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-restaurant-plats-details',
  templateUrl: './restaurant-plats-details.page.html',
  styleUrls: ['./restaurant-plats-details.page.scss'],
})
export class RestaurantPlatsDetailsPage implements OnInit, OnDestroy {
  plat: any;
  dataSubscription: any;
  id: any;


  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
  ) { }

  async ngOnInit() {
    this.dataSubscription = await this.activatedRoute.paramMap.subscribe(async params => {
      console.log(params.get('id'));
      console.log(params);
      this.id = params.get('id');
      await this.getPlat(params.get('id'));

    }, error => {
      console.log(error);
    });
  }
  async getPlat(id) {


    const loading = await this.loadingCtrl.create({
      message: 'Chargement en cours...',
    });
    await loading.present();
    return (await (this.httpService.authGet(AppConstants.addPlat + '/' + id))).pipe(
      finalize(() => {
        loading.dismiss();
      })
    ).subscribe((res: any) => {
      if (res.success) {
        console.log(res);
        this.plat = res.data.plat;
        console.log(this.plat);
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
