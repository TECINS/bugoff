import { Component, OnInit } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-historic-errors',
  templateUrl: './historic-errors.component.html',
  styleUrls: ['./historic-errors.component.scss']
})
export class HistoricErrorsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'No Asignados'},
    {value: 'pizza-1', viewValue: 'Asignados'},
    {value: 'tacos-2', viewValue: 'Terminados por desarrollador'},
    {value: 'pizza-3', viewValue: 'Confirmados por Tester'},
  ];

}
