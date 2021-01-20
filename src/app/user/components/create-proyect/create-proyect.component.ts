import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MatChipInputEvent } from '@angular/material/chips';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProyectosService } from '../../../services/proyectos.service';
import { UtilService } from '../../../services/util.service';
import { Router } from '@angular/router';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { CreateProyectService } from '../../services/create-proyect.service';

@Component({
  selector: 'app-create-proyect',
  templateUrl: './create-proyect.component.html',
  styleUrls: ['./create-proyect.component.scss']
})
export class CreateProyectComponent implements OnInit {
  date = new Date();
  imgLogo = '';
  @ViewChild('image', {
    read: ElementRef
  }) imagen: ElementRef;
  formProyecto: FormGroup;
  formInvitacion: FormGroup;
  idProyecto: string;
  projectName = 'proyecto';
  projects = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  emails: any[] = [];
  sessionData: any;
  constructor(
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private proyectosService: CreateProyectService,
  ) {
    this.sessionData = JSON.parse(localStorage.getItem('session-bugoff'));
    this.formInvitacion = this.formBuilder.group({
      id_proyectos: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      id_areas: ['', Validators.required]
    });
    this.formProyecto = this.formBuilder.group({
      id_proyectos: '',
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      repositorio: ['', Validators.required],
      logo: ''
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.utilService._loading = true;
    });
    this.proyectosService.obtenerProyectosPorId(this.sessionData.id_usuarios)
      .subscribe( data => {
        if (!data.error) {
          this.projects = data.proyectos;
        } else {
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: 'Ocurrio un error al obtener los proyectos'
          });
        }
      }, err => console.log(err))
      .add(() => this.utilService._loading = false);
  }
  // registrar
  registrarProyecto(_: any): void {
    this.utilService._loading = true;
    const imagen = this.imagen.nativeElement.files[0];
    const valores = new FormData();
    const claveGlobal = this.date.getDate() + '' + this.date.getDay() + '' + this.date.getHours()
      + '' + this.date.getMinutes() + '' + this.date.getMilliseconds();
    valores.append('id_proyectos', claveGlobal);
    valores.append('id_usuarios', this.sessionData.id_usuarios);
    valores.append('nombre', this.formProyecto.value.nombre);
    valores.append('descripcion', this.formProyecto.value.descripcion);
    valores.append('repositorio', this.formProyecto.value.repositorio);
    valores.append('logo', imagen);
    this.proyectosService.registerProject(valores).subscribe(
      data => {
        if (!data.error) {
          Swal.fire({
            icon: 'success',
            title: 'Proyecto registrado',
            text: 'Ahora ve a invitar colavoradores al proyecto'
          });
          this.ngOnInit();
        } else {
          console.log(data);
          Swal.fire({
            icon: 'warning',
            title: 'Algo ha ocurrido, proyecto no registrado',
            text: data.message
          });
        }
      }, err => console.log(err)
    ).add(() => this.utilService._loading = false);
  }
  // image preview
  readURL(event: Event): void {
    if ((event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files[0]) {
      const file = (event.target as HTMLInputElement).files[0];
      const reader = new FileReader();
      reader.onload = e => this.imgLogo = reader.result.toString();
      reader.readAsDataURL(file);
    }
  }
  changeProject(value: any): void {
    this.projectName = this.projects[this.projects.findIndex((x: any) => x.id_proyectos === value)].nombre;
  }
  sendInvitation(): void {
    console.log(this.formInvitacion.value);
    this.utilService._loading = true;
    this.proyectosService.enviarInvitacionAlProyecto(this.formInvitacion.value)
      .subscribe( data => {
        console.log(data);
        if (!data.error) {
          Swal.fire({
            title: 'Se envio la invitación',
            icon: 'success',
            text: 'Dile a la persona invitada que revise su correo'
          });
        } else {
          Swal.fire({
            title: 'Ocurrio un imprevisto',
            icon: 'warning',
            text: data.message
          });
        }
      }, err => console.log(err))
      .add(() => this.utilService._loading = false);
  }
}
