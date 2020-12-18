import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss']
})
export class InitialPageComponent implements OnInit {

  proyects = [
    {
      nombre: 'Bugoff',
      id_proyectos: 'adkajwiajd'
    },
    {
      nombre: 'Kabum',
      id_proyectos: 'adkajwiajd'
    },
    {
      nombre: 'FindMyTecky',
      id_proyectos: 'adkajwiajd'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
