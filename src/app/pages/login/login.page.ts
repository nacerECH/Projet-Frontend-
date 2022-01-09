import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/config/app-constants';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    private storageService: StorageService
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

  loginAction() {
    this.authService.login(this.ionicForm.value).subscribe(
      (res: any) => {
        if (res.success) {
          console.log(res);
          // Storing the User data.
          this.storageService.store(AppConstants.auth, res.data);
          if (res.data.role === 'clt') {
            this.router.navigate(['client']);
          }
          else {
            this.router.navigate(['restaurant']);
          }
        } else {
          console.log('incorrect password.');
          console.log(res);

        }
      },
      (error: any) => {
        console.log('Network Issue.');
      }
    );

  }

}
