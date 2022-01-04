import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { RestaurantPopoverComponent } from 'src/app/Components/restaurant-popover/restaurant-popover.component';

@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.page.html',
  styleUrls: ['./restaurant-dashboard.page.scss'],
})
export class RestaurantDashboardPage implements OnInit {

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
  }
  // async presentPopover(ev: any) {
  //   const popover = await this.popoverController.create({
  //     component: PopoverComponent,
  //     event: ev,
  //     translucent: true
  //   });
  //   return await popover.present();

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: RestaurantPopoverComponent,
      // cssClass: 'my-custom-class',
      event: ev,
      // showBackdrop: false,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
