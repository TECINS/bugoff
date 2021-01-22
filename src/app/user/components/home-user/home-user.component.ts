import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ProyectosSelect, ProyectInfo } from '../../../models/proyectos.model';
import { Router } from '@angular/router';
import { UtilService } from '../../../services/util.service';
import { ProyectosService } from '../../../services/proyectos.service';
import { LocalSession } from '../../../models/session.model';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.scss']
})
export class HomeUserComponent implements OnInit {
  proyects: ProyectosSelect[];
  localSession: LocalSession;
  proyectInfo: ProyectInfo;
  constructor(
    private router: Router,
    private utilService: UtilService,
    private proyectosService: ProyectosService
  ) {
    this.localSession = JSON.parse(localStorage.getItem('session-bugoff'));
    this.proyectInfo = JSON.parse(localStorage.getItem('proyect-info'));
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.utilService._loading = true;
    });
    this.proyectosService.obtenerProyectosPorId(this.localSession.id_usuarios)
      .subscribe( data => {
        if (!data.error) {
          this.proyects = data.proyectos;
        }
      }, err => console.log(err)).add(() => this.utilService._loading = false);
  }
  selectProject(proyecto: ProyectosSelect): void {
    this.utilService._loading = true;
    this.proyectosService.obtenerInformacionDelProyecto(proyecto.id_proyectos, this.localSession.id_usuarios)
      .subscribe( data => {
        if (!data.error) {
            localStorage.setItem('proyect-info', JSON.stringify(data.message));
            window.location.reload();
        } else {
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: 'ocurrio un error al traer la informacion del proyecto'
          });
        }
      }, err => console.log(err)).add( () => this.utilService._loading = false);
  }
}
