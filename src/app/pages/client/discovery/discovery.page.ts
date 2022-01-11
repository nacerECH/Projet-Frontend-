import { Component, OnInit } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { PopoverController } from '@ionic/angular';
import { ClientPopoverComponent } from 'src/app/Components/client-popover/client-popover.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.page.html',
  styleUrls: ['./discovery.page.scss'],
})
export class DiscoveryPage implements OnInit {

  constructor(public popoverController: PopoverController) {

    CapacitorGoogleMaps.initialize({
      key: environment.mapsKey
    });
  }

  ngOnInit() {
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ClientPopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      // side: 'end',
      // align: 'end',
      // showBackdrop: false,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
