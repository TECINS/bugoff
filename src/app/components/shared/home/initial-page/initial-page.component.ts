import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  clickCreate(): void {
    this.router.navigateByUrl('home/crear-proyecto');
  }

}
