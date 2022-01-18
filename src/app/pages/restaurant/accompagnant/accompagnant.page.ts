import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';
import { AppConstants } from 'src/app/config/app-constants';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-accompagnant',
  templateUrl: './accompagnant.page.html',
  styleUrls: ['./accompagnant.page.scss'],
})
export class AccompagnantPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;
  acc: any;
  constructor(
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
    public formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService
  ) { }

  get errorControl() {
    return this.ionicForm.controls;
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
      prix: ['', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
    });
    this.getAcc();
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

      return (await (this.httpService.authPost(AppConstants.addAccompagnement, this.ionicForm.value))).pipe(
        finalize(() => {
          loading.dismiss();
        })
      ).subscribe(async (res: any) => {
        if (res.success) {
          // this.router.navigate(['home']);
          console.log(res);
          await this.getAcc();
          this.ionicForm.controls['nom'].setValue('');
          this.ionicForm.controls['prix'].setValue('');
          this.isSubmitted = false;

        }
      },
        (error: any) => {
          console.log(error);
          console.log('Network Issue.');
        });
    }
  }
  async getAcc() {

    const loading = await this.loadingCtrl.create({
      message: 'Chargement en cours...',
    });
    await loading.present();
    return (await (this.httpService.authGet(AppConstants.getAcc))).pipe(
      finalize(() => {
        loading.dismiss();
      })
    ).subscribe((res: any) => {
      if (res.success) {
        console.log(res);
        console.log();
        this.acc = res.data.accompagnements;
        console.log(this.acc);

      }
    },
      (error: any) => {
        this.toastService.presentToast('Pas de resultat');
        console.log(error);
        console.log('HAMZA' + JSON.stringify(error));
        console.log('Network Issue.');
      });
  }

}
