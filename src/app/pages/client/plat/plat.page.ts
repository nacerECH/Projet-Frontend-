import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Accompagnement } from 'src/app/interfaces/accompagnement';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { AppConstants } from 'src/app/config/app-constants';
import { HttpService } from 'src/app/services/http.service';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-plat',
  templateUrl: './plat.page.html',
  styleUrls: ['./plat.page.scss'],
})
export class PlatPage implements OnInit, OnDestroy {
  ionicForm: FormGroup;
  isSubmitted = false;
  isBuyClicked = false;
  price;
  total;
  qte = 1;
  plat: any;
  dataSubscription: any;
  id: any;
  isLiked: boolean;

  constructor(
    public alertController: AlertController,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
    public formBuilder: FormBuilder,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  get errorControl() {
    return this.ionicForm.controls;
  };

  async ngOnInit() {
    this.dataSubscription = await this.activatedRoute.paramMap.subscribe(async params => {
      console.log(params.get('id'));
      console.log(params);
      this.id = params.get('id');
      await this.getPlat(params.get('id'));
      await this.getIfLiked(params.get('id'));

    }, error => {
      console.log(error);
    });
    this.ionicForm = this.formBuilder.group({
      adresse: ['', Validators.required],
      phone: ['', Validators.required],
      total: [this.price],
      quantity: [this.qte],
      selectedArray: this.formBuilder.array([]),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      plat_id: [this.id]
    });
  }
  handleChanges(accompagnement: Accompagnement) {
    console.log(accompagnement);
    const checkArray: FormArray = this.ionicForm.get('selectedArray') as FormArray;

    if (accompagnement.quantity > 0) {
      if (this.ionicForm.controls.selectedArray.value.length === 0) {
        checkArray.push(new FormControl(accompagnement));
        console.log('length is 0');
      } else {
        let flag = false;
        checkArray.controls.forEach((item: FormControl) => {
          if (item.value.id === accompagnement.id) {
            item.value.quantity = accompagnement.quantity;
            flag = true;
            console.log('is found');
          }
        });
        if (!flag) {
          console.log('not found')
          checkArray.push(new FormControl(accompagnement));
        }
      }

    } else {
      let i = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value.id === accompagnement.id) {
          if (accompagnement.quantity !== 0) {
            item.value.quantity = accompagnement.quantity;
          } else {
            checkArray.removeAt(i);
            return;
          }
        }
        i++;
      });
    }
    console.log(this.ionicForm.controls.selectedArray.value);
    this.calculateTotal();
  }

  async submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log('FormData');
      console.log(this.ionicForm.value);
      const loading = await this.loadingCtrl.create({
        message: 'Chargement en cours...',
      });
      await loading.present();

      return (await (this.httpService.authPost(AppConstants.addCommande, this.ionicForm.value))).pipe(
        finalize(() => {
          loading.dismiss();
        })
      ).subscribe((res: any) => {
        if (res.success) {
          // this.router.navigate(['home']);
          console.log(res);
          this.router.navigateByUrl('/client/orders-history', {
            replaceUrl: true
          });

        }
      },
        (error: any) => {
          console.log(error);
          console.log('Network Issue.');
        });
    }

  }
  decrement() {
    if (this.qte > 1) {
      this.qte--;
      this.ionicForm.controls.quantity.setValue(this.qte);
      this.calculateTotal();
    }

  }
  increment() {
    this.qte++;
    this.ionicForm.controls.quantity.setValue(this.qte);
    this.calculateTotal();

  }

  calculateTotal() {
    const checkArray: FormArray = this.ionicForm.get('selectedArray') as FormArray;

    this.total = 0;
    if (this.ionicForm.controls.selectedArray.value.length > 0) {
      checkArray.controls.forEach((item: FormControl) => {
        this.total += item.value.quantity * item.value.prix;
      });
    }
    this.total += this.price * this.qte;
    this.ionicForm.controls.total.setValue(this.total);
  }
  toggleForm() {
    this.isBuyClicked = !this.isBuyClicked;
  }

  async getPlat(id) {


    const loading = await this.loadingCtrl.create({
      message: 'Chargement en cours...',
    });
    await loading.present();
    return (await (this.httpService.authGet(AppConstants.addPlat + '/' + id))).pipe(
      finalize(() => {
        loading.dismiss();
      })
    ).subscribe((res: any) => {
      if (res.success) {
        console.log(res);
        this.plat = res.data.plat;
        this.price = this.total = parseFloat(this.plat.price);
        console.log(this.plat);
      }
    },
      (error: any) => {
        this.toastService.presentToast('Pas de resultat');
        console.log(error);
        console.log('HAMZA' + JSON.stringify(error));
        console.log('Network Issue.');
      });
  }
  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
  async getIfLiked(id) {
    let params = new HttpParams();
    params = params.append('type', 'plat');
    params = params.append('operation', 'verification');


    const loading = await this.loadingCtrl.create({
      message: 'Chargement en cours...',
    });
    await loading.present();
    return (await (this.httpService.authGet(AppConstants.likes + '/' + id, params))).pipe(
      finalize(() => {
        loading.dismiss();
      })
    ).subscribe((res: any) => {
      if (res.success) {
        console.log('Like existe');
        console.log(res);
        this.isLiked = res.data.result;
        console.log(this.isLiked);

      }
    },
      (error: any) => {
        this.toastService.presentToast('Pas de resultat');
        console.log(error);
        console.log('HAMZA' + JSON.stringify(error));
        console.log('Network Issue.');
      });
  }
  async toggle() {
    let params = new HttpParams();
    params = params.append('type', 'plat');
    params = params.append('operation', 'edit');
    if (this.isLiked === true) {
      params = params.append('action', 'dettach');
    } else {
      params = params.append('action', 'attach');

    }
    // const loading = await this.loadingCtrl.create({
    //   message: 'Chargement en cours...',
    // });
    // await loading.present();
    return (await (this.httpService.authGet(AppConstants.likes + '/' + this.id, params))).pipe(
      finalize(() => {
        // loading.dismiss();
      })
    ).subscribe((res: any) => {
      if (res.success) {
        this.isLiked = !this.isLiked;
        console.log('Like existe');
        console.log(res);
        this.isLiked = res.data.result;
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
