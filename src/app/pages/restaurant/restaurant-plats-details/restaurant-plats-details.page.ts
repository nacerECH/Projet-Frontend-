import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-restaurant-plats-details',
  templateUrl: './restaurant-plats-details.page.html',
  styleUrls: ['./restaurant-plats-details.page.scss'],
})
export class RestaurantPlatsDetailsPage implements OnInit {

  constructor(public alertController: AlertController) { }

  ngOnInit() {
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
          type:'tel'

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



}
