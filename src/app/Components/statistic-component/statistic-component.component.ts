import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-statistic-component',
  templateUrl: './statistic-component.component.html',
  styleUrls: ['./statistic-component.component.scss'],
})
export class StatisticComponentComponent implements OnInit {


  public options: any = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Chart: {
      type: 'area',
      height: 700
    },
    title: {
      text: 'Evolution des commandes par jour'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: ['Lundi', 'Mardi', 'Mercredi', 'Joudi', 'Vendredi', 'Samedi', 'Dimanche'],
      tickmarkPlacement: 'on',
      title: {
        enabled: false
      }
    },
    series: [{
      name: 'cette Semaine',
      data: [50, 30, 12, 40, 46, 37, 88]
    }, {
      name: 'Semaine derniere',
      data: [10, 14, 7, 18, 10, 13, 24]
    }, {
      name: 'Semaine avant derniere',
      data: [7, 15, 14, 17, 14, 6, 17]
    }]
  };

  constructor() { }

  ngOnInit() {

    Highcharts.chart('container', this.options);
  }

}


