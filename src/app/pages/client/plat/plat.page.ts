import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Accompagnement } from 'src/app/interfaces/accompagnement';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { AppConstants } from 'src/app/config/app-constants';
import { HttpService } from 'src/app/services/http.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-plat',
  templateUrl: './plat.page.html',
  styleUrls: ['./plat.page.scss'],
})
export class PlatPage implements OnInit {
  accompagnements: Accompagnement[] = [
    {
      id: 1,
      nom: 'coca',
      prix: 5,
      quantity: 0
    },
    {
      id: 2,
      nom: 'frite',
      prix: 3,
      quantity: 0
    },
    {
      id: 3,
      nom: 'sauce',
      prix: 1,
      quantity: 0
    },
    {
      id: 4,
      nom: 'salade',
      prix: 12,
      quantity: 0
    },
    {
      id: 5,
      nom: 'pain',
      prix: 1,
      quantity: 0
    },
    {
      id: 6,
      nom: 'jus',
      prix: 7,
      quantity: 0
    }

  ];
  ionicForm: FormGroup;
  isSubmitted = false;
  isBuyClicked = false;
  price = 90;
  total = this.price;
  qte = 1;

  constructor(
    public alertController: AlertController,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
    public formBuilder: FormBuilder,
    private httpService: HttpService

  ) { }

  get errorControl() {
    return this.ionicForm.controls;
  };

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      adresse: ['', Validators.required],
      phone: ['', Validators.required],
      total: [this.price],
      quantity: [this.qte],
      selectedArray: this.formBuilder.array([]),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      plat_id: [4]
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


}
