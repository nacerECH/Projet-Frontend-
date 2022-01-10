import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/config/app-constants';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { matchValidator } from 'src/app/validation/match';
import { Geolocation } from '@capacitor/geolocation';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-restaurant-register',
  templateUrl: './restaurant-register.page.html',
  styleUrls: ['./restaurant-register.page.scss'],
})
export class RestaurantRegisterPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;


  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private router: Router) { }

  get errorControl() {
    return this.ionicForm.controls;
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      nomRestaurant: ['', [Validators.required, Validators.minLength(3)]],
      nomGerant: ['', [Validators.required, Validators.minLength(3)]],
      prenomGerant: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      ville: ['', [Validators.required]],
      longitude: ['', [Validators.pattern('[+-]?([0-9]*[.])?[0-9]+'), Validators.required]],
      latitude: ['', [Validators.pattern('[+-]?([0-9]*[.])?[0-9]+'), Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, matchValidator('password')]],

    });
  }

  getCurrentPosition() {
    Geolocation.requestPermissions().then(async premission => {
      const loading = await this.loadingCtrl.create({
        message: 'en cours de traitement...',
      });
      await loading.present();
      const coordinates = await Geolocation.getCurrentPosition();
      this.ionicForm.controls.latitude.setValue(coordinates.coords.latitude);
      this.ionicForm.controls.longitude.setValue(coordinates.coords.longitude);
      loading.dismiss();
    });
  }


  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {

      this.signAction();
      console.log(this.ionicForm.value);
    }
  }

  signAction() {
    this.authService.signupRestaurant(this.ionicForm.value).subscribe(
      (res: any) => {
        if (res.success) {
          console.log(res);
          // Storing the User data.
          this.storageService
            .store(AppConstants.auth, res.data)
            .then(() => {
              if (res.data.role === 'clt') {
                this.router.navigate(['client']);
              }
              else {
                this.router.navigate(['restaurant']);
              }
              // this.router.navigate(['client']);
            });
        } else {
          this.toastService.presentToast(
            'erreur de serveur'
          );
        }
      },
      (error: any) => {
        this.toastService.presentToast('Network Issue.');
      }
    );

  }
}


