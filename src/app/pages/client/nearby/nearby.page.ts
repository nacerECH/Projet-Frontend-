import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { Geolocation } from '@capacitor/geolocation';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.page.html',
  styleUrls: ['./nearby.page.scss'],
})
export class NearbyPage implements OnInit {


  alertCtrl: AlertController;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('map') mapView: ElementRef;

  constructor() {

  }

  ngOnInit() {
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

      CapacitorGoogleMaps.addMarker({
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
        title: 'My castle of loneliness',
        snippet: 'Come and find me',
        url: './assets/cooking.svg'
      });
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
