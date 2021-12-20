import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite-restaurants',
  templateUrl: './favorite-restaurants.page.html',
  styleUrls: ['./favorite-restaurants.page.scss'],
})
export class FavoriteRestaurantsPage implements OnInit {


 public selectedSegment: string;
  constructor() { }

  ngOnInit() {
  }
  segmentChanged(event: any){
this.selectedSegment=event.target.value;
  }

}
