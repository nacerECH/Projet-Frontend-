import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, PopoverController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AppConstants } from 'src/app/config/app-constants';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-restaurant-popover',
  templateUrl: './restaurant-popover.component.html',
  styleUrls: ['./restaurant-popover.component.scss'],
})
export class RestaurantPopoverComponent implements OnInit {
  data: any;
  constructor(
    public popoverController: PopoverController,
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,

  ) { }

  async ngOnInit() {
    await this.storageService
      .get(AppConstants.auth)
      .then(res => {
        this.data = res;
        console.log(this.data);
      });
  }
  close() {
    this.popoverController.dismiss();
  }
  async logOut() {
    this.close();

    const loading = await this.loadingCtrl.create({
      message: 'Chargement en cours...',
    });
    await loading.present();

    (await this.authService.logout()).pipe(
      finalize(() => {
        loading.dismiss();
      })
    ).subscribe(
      async (res: any) => {
        if (res) {
          await this.storageService.removeStorageItem(AppConstants.auth);
          // this.router.navigate(['home']);
          this.router.navigateByUrl('home', {
            replaceUrl: true
          });

        }
      },
      (error: any) => {
        console.log('Network Issue.');
      }
    );
  }

}
