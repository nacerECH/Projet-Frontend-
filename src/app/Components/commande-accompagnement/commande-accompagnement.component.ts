import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Accompagnement } from 'src/app/interfaces/accompagnement';

@Component({
  selector: 'app-commande-accompagnement',
  templateUrl: './commande-accompagnement.component.html',
  styleUrls: ['./commande-accompagnement.component.scss'],
})
export class CommandeAccompagnementComponent implements OnInit {

  @Input() accompagnement: Accompagnement;
  @Output() accompagnementChange: EventEmitter<Accompagnement> = new EventEmitter<Accompagnement>();
  constructor() { }

  ngOnInit() { }

  increment() {
    this.accompagnement.quantity++;
    this.accompagnementChange.emit(this.accompagnement);
  }
  decrement() {
    if (this.accompagnement.quantity > 0) {
      this.accompagnement.quantity--;
      this.accompagnementChange.emit(this.accompagnement);
    }
  }

}
