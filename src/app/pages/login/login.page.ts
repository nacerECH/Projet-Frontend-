import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/config/app-constants';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { finalize } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toastService: ToastService,
    private loadingCtrl: LoadingController,

  ) { }

  get errorControl() {
    return this.ionicForm.controls;
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
    });
  }
  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      // console.log(this.ionicForm.value);
      this.loginAction();
    }
  }

  async loginAction() {
    const loading = await this.loadingCtrl.create({
      message: 'Chargement en cours...',
    });
    await loading.present();

    this.authService.login(this.ionicForm.value).pipe(
      finalize(() => {
        loading.dismiss();
      })
    ).subscribe(
      (res: any) => {
        if (res.success) {
          console.log(res);
          // Storing the User data.
          this.storageService.store(AppConstants.auth, res.data);
          if (res.data.role === 'clt') {
            // this.router.navigate(['client']);
            this.router.navigateByUrl('client', {
              replaceUrl: true
            });
          }
          else {
            // this.router.navigate(['restaurant']);
            this.router.navigateByUrl('restaurant', {
              replaceUrl: true
            });
          }
        } else {
          console.log('incorrect password.');
          console.log(res);

        }
      },
      (error: any) => {
        console.log('HAMZA' + JSON.stringify(error));
        console.log('Network Issue.');
        this.toastService.presentToast('Erreur de Connexion');
      }
    );

  }

}
