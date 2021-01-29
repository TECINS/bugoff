import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ProyectInfo, ProyectosSelect } from '../../../models/proyectos.model';
import { UtilService } from '../../../services/util.service';
import { ProyectosService } from '../../../services/proyectos.service';
import { LocalSession } from '../../../models/session.model';
import Swal from 'sweetalert2';
import { SocketService } from '../../../services/socket.service';
import { Notifications } from '../../../models/notificatios.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  activate = false;
  mobileQuery: MediaQueryList;
  proyectInfo: ProyectInfo;
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  localsession: LocalSession;
  proyectos: ProyectosSelect[];
  proyectoActual = 'Proyectos';
  socket: SocketIOClient.Socket;
  notifications: any[] = [];
  activeToast = false;
  private _mobileQueryListener: () => void;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private proyectosService: ProyectosService,
    private utilService: UtilService,
    private socketService: SocketService
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.proyectInfo = JSON.parse(localStorage.getItem('proyect-info'));
    this.localsession = JSON.parse(localStorage.getItem('session-bugoff'));
    if (localStorage.getItem('notifications')) {
      this.notifications = JSON.parse(localStorage.getItem('notifications'));
    }
  }

  activateSide(): void {
    this.activate = !this.activate;
  }
  ngOnInit(): void {
    if (this.proyectInfo) {
      this.proyectoActual = this.proyectInfo.nombre;
    } else {
      this.proyectoActual = 'Proyectos';
    }
    this.socket = this.socketService.getSocketConnection();
    this.socket.connect();
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
    });
    this.socket.on('notificacion', (data: any) => {
      if (this.localsession.id_usuarios === data.id_usuarios) {
        this.notifications.push(data);
        localStorage.setItem('notifications', JSON.stringify(this.notifications));
        this.activeToast = true;
        setTimeout(() => {
          this.activeToast = false;
        }, 3000);
      }
    });
    setTimeout(() => {
      this.utilService._loading = true;
    });
    this.proyectosService.obtenerProyectosPorId(this.localsession.id_usuarios)
      .subscribe( data => {
        if (!data.error) {
          this.proyectos = data.proyectos;
          console.log(this.proyectos);
        } else {
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: 'ocurrio un error al obtener los proyectos'
          });
        }
      }, err => console.log(err)).add ( () => this.utilService._loading = false);
  }
  selectProject(proyecto: ProyectosSelect): void {
    this.utilService._loading = true;
    this.proyectosService.obtenerInformacionDelProyecto(proyecto.id_proyectos, this.localsession.id_usuarios)
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
