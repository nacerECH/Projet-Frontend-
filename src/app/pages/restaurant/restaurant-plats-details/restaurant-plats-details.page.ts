import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Accompagnement } from 'src/app/interfaces/accompagnement';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-restaurant-plats-details',
  templateUrl: './restaurant-plats-details.page.html',
  styleUrls: ['./restaurant-plats-details.page.scss'],
})
export class RestaurantPlatsDetailsPage implements OnInit {
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



  constructor(
    public alertController: AlertController,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
    public formBuilder: FormBuilder,
  ) { }

  get errorControl() {
    return this.ionicForm.controls;
  };

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      adresse: ['', Validators.required],
      phone: ['', Validators.required],
      total: [this.price, [Validators.pattern('[+-]?([0-9]*[.])?[0-9]+'), Validators.required]],
      selectedArray: this.formBuilder.array([])
    });
  }

  showPrompt() {
    this.alertController.create({
      header: 'Confirmation',
      subHeader: 'Entrer votre numero afin que le levreur puisse vous contacter',
      message: 'Total : 95 DH',
      inputs: [
        {
          name: 'Numero',
          placeholder: '06....',
          type: 'tel'

        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: (data: any) => {
            console.log('Annuler', data);
          }
        },
        {
          text: 'Confirmer',
          handler: (data: any) => {
            console.log('Confirmer', data);
          }
        }
      ]
    }).then(res => {
      res.present();
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
    this.total = 0;
    if (this.ionicForm.controls.selectedArray.value.length > 0) {
      checkArray.controls.forEach((item: FormControl) => {
        this.total += item.value.quantity * item.value.prix;
      });
    }
    this.total += this.price;
    this.ionicForm.controls.total.setValue(this.total);
  }

  submitForm() {

  }



}
