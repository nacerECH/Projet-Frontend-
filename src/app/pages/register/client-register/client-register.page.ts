import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/config/app-constants';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
import { matchValidator } from 'src/app/validation/match';



@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.page.html',
  styleUrls: ['./client-register.page.scss'],
})
export class ClientRegisterPage implements OnInit {

  ionicForm: FormGroup;
  isSubmitted = false;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private storageService: StorageService,
    private router: Router
  ) { }

  get errorControl() {
    return this.ionicForm.controls;
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      fName: ['', [Validators.required, Validators.minLength(3)]],
      lName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, matchValidator('password')]],

    });
  }
  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      this.signAction();
    }
  }


  signAction() {
    this.authService.signup(this.ionicForm.value).subscribe(
      (res: any) => {
        if (res.success) {
          console.log(res);
          // Storing the User data.
          this.storageService
            .store(AppConstants.auth, res.data)
            .then(() => {
              this.router.navigate(['client']);
            });
        } else {
          this.toastService.presentToast(
            'Erreur de serveur'
          );
        }
      },
      (error: any) => {
        console.log('HAMZA' + JSON.stringify(error));
        this.toastService.presentToast('Erreur de Connexion');
      }
    );

  }

  // matchValidator(
  //   matchTo: string,
  //   reverse?: boolean
  // ): ValidatorFn {
  //   return (control: AbstractControl):
  //     ValidationErrors | null => {
  //     if (control.parent && reverse) {
  //       const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
  //       if (c) {
  //         c.updateValueAndValidity();
  //       }
  //       return null;
  //     }
  //     return !!control.parent &&
  //       !!control.parent.value &&
  //       control.value ===
  //       (control.parent?.controls as any)[matchTo].value
  //       ? null
  //       : { matching: true };
  //   };
  // }

}
