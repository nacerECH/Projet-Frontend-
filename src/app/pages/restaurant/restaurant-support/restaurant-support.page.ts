import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AppConstants } from 'src/app/config/app-constants';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-restaurant-support',
  templateUrl: './restaurant-support.page.html',
  styleUrls: ['./restaurant-support.page.scss'],
})
export class RestaurantSupportPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;
  constructor(
    public formBuilder: FormBuilder,
    private toastService: ToastService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private httpService: HttpService
  ) { }

  get errorControl() {
    return this.ionicForm.controls;
  }



  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      sujet: ['', [Validators.required]],
      description: ['', [Validators.required]],

    });
  }

  async submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      const loading = await this.loadingCtrl.create({
        message: 'Chargement en cours...',
      });
      await loading.present();

      return (await (this.httpService.authPost(AppConstants.reclamations, this.ionicForm.value))).pipe(
        finalize(() => {
          loading.dismiss();
        })
      ).subscribe(async (res: any) => {
        if (res.success) {
          this.toastService.presentToast('La reclamation a ete postulee');
          this.ionicForm.controls['description'].setValue('');
          this.ionicForm.controls['sujet'].setValue('');
          setTimeout(() => {
          }, 1000);
          this.router.navigateByUrl('/restaurant', {
            replaceUrl: true
          });

        }
      },
        (error: any) => {
          console.log(error);
          console.log(JSON.stringify(error));
          console.log('Network Issue.');
          this.toastService.presentToast('Network Issue');

        });
    }
  }

}
