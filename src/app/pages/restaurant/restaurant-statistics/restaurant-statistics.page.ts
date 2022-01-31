import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import * as Highcharts from 'highcharts';
import { finalize } from 'rxjs/operators';
import { AppConstants } from 'src/app/config/app-constants';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';
import { format, addDays, eachDayOfInterval, subMonths, subWeeks } from 'date-fns';
@Component({
  selector: 'app-restaurant-statistics',
  templateUrl: './restaurant-statistics.page.html',
  styleUrls: ['./restaurant-statistics.page.scss'],
})
export class RestaurantStatisticsPage implements OnInit {
  statistics: any;
  month = [];
  week = [];
  options: any = {
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
    }]
  };
  selectedSegment: string;



  constructor(
    private router: Router,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
  ) { }

  async ngOnInit() {
    this.selectedSegment = 'week';
    await this.getStatistics();
    // Highcharts.chart('container', this.options);

  }
  async getStatistics() {

    const loading = await this.loadingCtrl.create({
      message: 'Chargement en cours...',
    });
    await loading.present();
    return (await (this.httpService.authGet(AppConstants.statistics))).pipe(
      finalize(() => {
        loading.dismiss();
      })
    ).subscribe((res: any) => {
      if (res.success) {
        this.statistics = res.data.statistics;
        // this.setThisMonthStatistics();
        this.setThisWeekStatistics();

      }
    },
      (error: any) => {
        this.toastService.presentToast('Pas de resultat');
        console.log(error);
        console.log('HAMZA' + JSON.stringify(error));
        console.log('Network Issue.');
      });
  }
  async ionViewWillEnter() {
    // await this.getStatistics();
  }
  getLastWeek(): string[] {
    const thisDay = new Date();
    return eachDayOfInterval({
      start: subWeeks(thisDay, 1),
      end: thisDay,
    }).map(element =>
      format(element, 'yyyy-MM-dd')
    );
  }
  getLastMonth(): string[] {
    const thisDay = new Date();
    return eachDayOfInterval({
      start: subMonths(thisDay, 1),
      end: thisDay,
    }).map(element =>
      format(element, 'yyyy-MM-dd')
    );
  }
  setThisMonthStatistics() {
    this.month = [];

    if (this.statistics != null) {
      const tmp = this.getLastMonth();
      for (const day of tmp) {
        const tmpDay = this.statistics.month.statistics.find(elt => elt.date === day);
        if (tmpDay !== undefined) {
          this.month.push({
            commandes: tmpDay.commandes,
            amount: tmpDay.total,
            date: tmpDay.date,
          });
        } else {

          this.month.push({
            commandes: 0,
            amount: 0,
            date: day,
          });

        }
      }
      console.log(this.month);
      const commandeOptions: any = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Chart: {
          type: 'area',
          height: 700
        },
        title: {
          text: 'Commandes'
        },
        credits: {
          enabled: false
        },
        xAxis: {
          categories: this.week.map(elt => elt.date.substring(5)),
          tickmarkPlacement: 'on',
          title: {
            enabled: false
          }
        },
        series: [{
          name: 'Ce mois',
          data: this.week.map(elt => elt.commandes)
        }]
      };
      const amountOptions: any = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Chart: {
          type: 'area',
          height: 700
        },
        title: {
          text: 'Revenue'
        },
        credits: {
          enabled: false
        },
        xAxis: {
          categories: this.month.map(elt => elt.date.substring(5)),
          tickmarkPlacement: 'on',
          title: {
            enabled: false
          }
        },
        series: [{
          name: 'Ce mois',
          data: this.month.map(elt => parseFloat(elt.amount))
        }]
      };
      Highcharts.chart('monthCommandes', commandeOptions);
      Highcharts.chart('monthAmount', amountOptions);
    }
  }
  setThisWeekStatistics() {
    this.week = [];
    if (this.statistics != null) {
      const tmp = this.getLastWeek();
      for (const day of tmp) {
        const tmpDay = this.statistics.week.statistics.find(elt => elt.date === day);
        if (tmpDay !== undefined) {
          this.week.push({
            commandes: tmpDay.commandes,
            amount: tmpDay.total,
            date: tmpDay.date,
          });
        } else {

          this.week.push({
            commandes: 0,
            amount: 0,
            date: day,
          });

        }
      }
      console.log(this.week);
      const commandeOptions: any = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Chart: {
          type: 'area',
          height: 700
        },
        title: {
          text: 'Commandes'
        },
        credits: {
          enabled: false
        },
        xAxis: {
          categories: this.week.map(elt => elt.date.substring(5)),
          tickmarkPlacement: 'on',
          title: {
            enabled: false
          }
        },
        series: [{
          name: 'cette Semaine',
          data: this.week.map(elt => elt.commandes)
        }]
      };
      const amountOptions: any = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Chart: {
          type: 'area',
          height: 700
        },
        title: {
          text: 'revenue'
        },
        credits: {
          enabled: false
        },
        xAxis: {
          categories: this.week.map(elt => elt.date.substring(5)),
          tickmarkPlacement: 'on',
          title: {
            enabled: false
          }
        },
        series: [{
          name: 'cette Semaine',
          data: this.week.map(elt => parseFloat(elt.amount))
        }]
      };
      Highcharts.chart('weekCommandes', commandeOptions);
      Highcharts.chart('weekAmount', amountOptions);


    }
  }
  segmentChanged(event: any) {
    this.selectedSegment = event.target.value;
    if (event.target.value === 'week') {
      setTimeout(() => {
        this.setThisWeekStatistics();
      }, 500);
    } else {
      setTimeout(() => {
        this.setThisMonthStatistics();
      }, 500);
    }
  }


}
