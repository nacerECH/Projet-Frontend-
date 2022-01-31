import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { AlertController, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AppConstants } from 'src/app/config/app-constants';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.page.html',
  styleUrls: ['./nearby.page.scss'],
})
export class NearbyPage implements OnInit {
  result: any = null;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('map') mapView: ElementRef;
  restaurants: any;
  // coordinates: any;
  constructor(
    private httpService: HttpService,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
    private router: Router
  ) {

  }

  async ngOnInit() {
  }
  async getRestaurantById(data) {


    const loading = await this.loadingCtrl.create({
      message: 'Chargement en cours...',
    });
    await loading.present();
    return (await (this.httpService.authGet(AppConstants.getRestaurants + '/' + data.detail.value))).pipe(
      finalize(() => {
        loading.dismiss();
      })
    ).subscribe((res: any) => {
      if (res.success) {
        // this.router.navigate(['home']);
        console.log(res.data.restaurant);
        console.log('HAMZA' + JSON.stringify(res));
        this.result = res.data.restaurant;
        console.log(this.result);
      }
    },
      (error: any) => {
        this.toastService.presentToast('Pas de resultat');
        console.log(error);
        console.log('HAMZA' + JSON.stringify(error));
        console.log('Network Issue.');
      });
  }
  async getRestaurantsList() {

    const coords = await Geolocation.getCurrentPosition();
    // this.coordinates.latitude = coords.coords.latitude;
    // this.coordinates.longitude = coords.coords.longitude;

    let params = new HttpParams();
    params = params.append('latitude', coords.coords.latitude);
    params = params.append('longitude', coords.coords.longitude);

    const loading = await this.loadingCtrl.create({
      message: 'Chargement en cours...',
    });
    await loading.present();
    return (await (this.httpService.authGet(AppConstants.getRestaurants, params))).pipe(
      finalize(() => {
        loading.dismiss();
      })
    ).subscribe((res: any) => {
      if (res.success) {
        // this.router.navigate(['home']);
        console.log(res);
        console.log('HAMZA' + JSON.stringify(res));
        this.restaurants = res.data.restaurants;

      }
    },
      (error: any) => {
        console.log(error);
        console.log('HAMZA' + JSON.stringify(error));
        console.log('Network Issue.');
        this.toastService.presentToast('Network Issue.');
      });
  }

  async ionViewDidEnter() {
    await this.getRestaurantsList();
    this.createMap();
  }

  async createMap() {
    const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;
    const coords = await Geolocation.getCurrentPosition();

    CapacitorGoogleMaps.create({
      width: Math.round(boundingRect.width),
      height: Math.round(boundingRect.height),
      x: Math.round(boundingRect.x),
      y: Math.round(boundingRect.y),
      zoom: 5,
      longitude: coords.coords.longitude,
      latitude: coords.coords.latitude
    });

    CapacitorGoogleMaps.addListener('onMapReady', async () => {
      CapacitorGoogleMaps.setMapType({
        type: 'normal' // hybrid, satellite, terrain
      });



      this.showCurrentPosition();
    });

    // CapacitorGoogleMaps.addListener('didTapPOIWithPlaceID', async (ev) => {
    //   const result = ev.results;

    //   const alert = await this.alertCtrl.create({
    //     header: result.name,
    //     message: `Place ID:  ${result.placeID}`,
    //     buttons: ['OK']
    //   });

    //   await alert.present();
    // });
  }

  async showCurrentPosition() {
    // todo
    Geolocation.requestPermissions().then(async permission => {
      const coords = await Geolocation.getCurrentPosition();

      CapacitorGoogleMaps.addMarker({
        latitude: coords.coords.latitude,
        longitude: coords.coords.longitude,
        title: 'My Position',
        snippet: '',
        // url: './assets/cooking.svg'
      });
      CapacitorGoogleMaps.setCamera({
        latitude: coords.coords.latitude,
        longitude: coords.coords.longitude,
        zoom: 12,
        bearing: 0
      });
      CapacitorGoogleMaps.addCircle({
        center: {
          latitude: coords.coords.latitude,
          longitude: coords.coords.longitude,
        },
        radius: 5000,
        strokeColor: '#000',
        strokeWidth: 3,
        zIndex: 100,
        visibility: true,
      });

      if (this.restaurants !== null) {
        for (const rest of this.restaurants) {
          CapacitorGoogleMaps.addMarker({
            latitude: parseFloat(rest.latitude),
            longitude: parseFloat(rest.longitude),
            title: '#' + rest.id + ' ' + rest.nom,
            snippet: rest.adresse,
            // url: './assets/cooking.svg'
          });
        }
      }
    });
  }

  ionViewDidLeave() {
    CapacitorGoogleMaps.close();
  }

  async search(data) {
    if (/^\d+$/.test(data.detail.value)) {
      console.log(data.detail.value);
      this.getRestaurantById(data);

    } else {
      console.log('not match');
    }
  }
  deleteResult() {
    this.result = null;
  }
  navigateRestaurant($event) {
    this.router.navigate(['/client/restaurant', $event]);
  }

}
