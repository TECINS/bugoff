import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { ProyectosSelect, ProyectInfo } from '../../../models/proyectos.model';
import Swal from 'sweetalert2';
import { UtilService } from '../../../services/util.service';
import { Router } from '@angular/router';
import { SocketService } from '../../../services/socket.service';
import { LocalSession } from '../../../models/session.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  @Input() toggleside: Observable<boolean>;
  mobileQuery: MediaQueryList;
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  localsession: LocalSession;
  loadprojectsinfo = [];
  visiblecomponent = 0;
  activeToast = false;
  private mobileQueryListener: () => void;
  proyectos: ProyectosSelect[];
  proyectInfo: ProyectInfo;
  principalRoute = '';
  socket: SocketIOClient.Socket;
  area = '';
  notificationData: any;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private proyectosService: ProyectosService,
    private utilService: UtilService,
    private route: Router,
    private socketService: SocketService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.localsession = JSON.parse(localStorage.getItem('session-bugoff'));
    this.proyectInfo = JSON.parse(localStorage.getItem('proyect-info'));
  }
  ngOnInit(): void {
    this.socket = this.socketService.getSocketConnection();
    this.socket.on('notificacion', (data: any) => {
      if (this.localsession.id_usuarios === data.id_usuarios) {
        this.activeToast = true;
        this.notificationData = data;
        setTimeout(() => {
          this.activeToast = false;
        }, 3000);
      }
    });
    if (this.proyectInfo) {
      this.visiblecomponent = Number(this.proyectInfo.id_areas);
    }
    this.obtenerRutaPrincipal();
  }
  obtenerRutaPrincipal(): void {
    switch (Number(this.visiblecomponent)) {
      case 0:
        this.principalRoute = '/app/usuario';
        this.area = 'usuario';
        break;
      case 1:
        this.principalRoute = '/app/lider';
        this.area = 'Lider';
        break;
      case 2:
        this.principalRoute = '/app/desarrollador';
        this.area = 'Desarrollador';
        break;
      case 3:
        this.principalRoute = '/app/tester';
        this.area = 'Tester';
        break;
    }
  }
  cerrar(): void {
    localStorage.removeItem('session-bugoff');
    localStorage.removeItem('proyect-info');
    localStorage.removeItem('notifications');
    this.route.navigateByUrl('auth');
  }
}
