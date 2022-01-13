import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { Geolocation } from '@capacitor/geolocation';
import { AlertController, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AppConstants } from 'src/app/config/app-constants';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.page.html',
  styleUrls: ['./nearby.page.scss'],
})
export class NearbyPage implements OnInit {


  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('map') mapView: ElementRef;
  restaurants: any;
  constructor(
    private httpService: HttpService,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  ) {

  }

  async ngOnInit() {

    // const coordinates = await Geolocation.getCurrentPosition();
    let params = new HttpParams();
    params = params.append('latitude', 2.122323);
    params = params.append('logitude', 3.1223433);

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
        this.restaurants = res.restaurants;

      }
    },
      (error: any) => {
        console.log(error);
        console.log('Network Issue.');
      });



  }

  ionViewDidEnter() {
    this.createMap();
  }

  async createMap() {
    const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;
    const coordinates = await Geolocation.getCurrentPosition();

    CapacitorGoogleMaps.create({
      width: Math.round(boundingRect.width),
      height: Math.round(boundingRect.height),
      x: Math.round(boundingRect.x),
      y: Math.round(boundingRect.y),
      zoom: 5,
      longitude: coordinates.coords.longitude,
      latitude: coordinates.coords.latitude
    });

    CapacitorGoogleMaps.addListener('onMapReady', async () => {
      CapacitorGoogleMaps.setMapType({
        type: 'normal' // hybrid, satellite, terrain
      });



      this.showCurrentPosition();
    });

    CapacitorGoogleMaps.addListener('didTapPOIWithPlaceID', async (ev) => {
      const result = ev.results;

      const alert = await this.alertCtrl.create({
        header: result.name,
        message: `Place ID:  ${result.placeID}`,
        buttons: ['OK']
      });

      await alert.present();
    });
  }

  async showCurrentPosition() {
    // todo
    Geolocation.requestPermissions().then(async permission => {
      const coordinates = await Geolocation.getCurrentPosition();

      // CapacitorGoogleMaps.addMarker({
      //   latitude: coordinates.coords.latitude,
      //   longitude: coordinates.coords.longitude,
      //   title: 'My castle of loneliness',
      //   snippet: 'Come and find me',
      //   url: './assets/cooking.svg'
      // });
      for (const rest of this.restaurants) {
        CapacitorGoogleMaps.addMarker({
          latitude: parseFloat(rest.latitude),
          longitude: parseFloat(rest.longitude),
          title: rest.nom,
          snippet: rest.adresse,
          // url: './assets/cooking.svg'
        });
      }
      CapacitorGoogleMaps.setCamera({
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
        zoom: 12,
        bearing: 0
      });
    });
  }

  ionViewDidLeave() {
    CapacitorGoogleMaps.close();
  }

}
