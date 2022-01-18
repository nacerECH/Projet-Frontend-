import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AppConstants } from 'src/app/config/app-constants';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-favorite-restaurants',
  templateUrl: './favorite-restaurants.page.html',
  styleUrls: ['./favorite-restaurants.page.scss'],
})
export class FavoriteRestaurantsPage implements OnInit {

  likes: any;
  public selectedSegment: string;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
  ) { }

  async ngOnInit() {
    await this.getLikes();
    this.selectedSegment = 'restaurants';

  }

  segmentChanged(event: any) {
    this.selectedSegment = event.target.value;
  }


  async getLikes() {

    const loading = await this.loadingCtrl.create({
      message: 'Chargement en cours...',
    });
    await loading.present();
    return (await (this.httpService.authGet(AppConstants.likes))).pipe(
      finalize(() => {
        loading.dismiss();
      })
    ).subscribe((res: any) => {
      if (res.success) {
        console.log(res);
        this.likes = res.data;
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
    await this.getLikes();
  }
  navigateRestaurant(id) {
    this.router.navigate(['/client/restaurant', id]);

  }
  navigatePlat(id) {
    this.router.navigate(['/client/single-plat/', id]);
  }
}
