import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AppConstants } from 'src/app/config/app-constants';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-client-popover',
  templateUrl: './client-popover.component.html',
  styleUrls: ['./client-popover.component.scss'],
})
export class ClientPopoverComponent implements OnInit {

  constructor(
    public popoverController: PopoverController,
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() { }

  close() {
    this.popoverController.dismiss();
  }
  async logOut() {
    this.close();
    (await this.authService.logout()).subscribe(
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
