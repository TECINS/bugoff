import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProyectInfo } from '../../../models/proyectos.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LeaderService } from '../../services/leader.service';
import Swal from 'sweetalert2';
import { UtilService } from '../../../services/util.service';

@Component({
  selector: 'app-edit-proyect',
  templateUrl: './edit-proyect.component.html',
  styleUrls: ['./edit-proyect.component.scss']
})
export class EditProyectComponent implements OnInit {
  proyectInfo: ProyectInfo;
  formProyecto: FormGroup;
  imgLogo = '';
  @ViewChild('logo', {
    read: ElementRef
  }) imagen: ElementRef;
  constructor(
    private fb: FormBuilder,
    private leaderService: LeaderService,
    private utilService: UtilService
  ) {
    this.formProyecto = this.fb.group({
      id_proyectos: [''],
      nombre: ['', Validators.required],
      id_estados_proyectos: ['1', Validators.required],
      repositorio: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
    this.proyectInfo = JSON.parse(localStorage.getItem('proyect-info'));
    if (this.proyectInfo) {
      this.formProyecto.get('nombre').setValue(this.proyectInfo.nombre);
      this.formProyecto.get('id_proyectos').setValue(this.proyectInfo.id_proyectos);
      this.formProyecto.get('id_estados_proyectos').setValue(this.proyectInfo.id_estados_proyectos.toString());
      this.formProyecto.get('repositorio').setValue(this.proyectInfo.repositorio);
      this.formProyecto.get('descripcion').setValue(this.proyectInfo.descripcion);
    }
  }

  ngOnInit(): void {
  }
  updateProyect() {
    this.utilService._loading = true;
    this.leaderService.actualizarProyecto(this.formProyecto.value)
      .subscribe(data => {
        if (!data.error) {
          Swal.fire({
            title: 'Actualizado',
            text: data.message,
            icon: 'success'
          });
          this.proyectInfo.nombre = this.formProyecto.value.nombre;
          this.proyectInfo.repositorio = this.formProyecto.value.repositorio;
          this.proyectInfo.descripcion = this.formProyecto.value.descripcion;
          this.proyectInfo.id_estados_proyectos = this.formProyecto.value.id_estados_proyectos;
          localStorage.setItem('proyect-info', JSON.stringify(this.proyectInfo));
        } else {
          Swal.fire({
            title: 'Error',
            text: data.message,
            icon: 'error'
          });
        }
      }, err => console.log(err)).add(() => this.utilService._loading = false);
  }
  openFile() {
    document.querySelector('input').click();
  }
  updateLogoProyect(_: Event) {
    if (this.imagen.nativeElement.files[0]) {
      const value = new FormData();
    const logo = this.imagen.nativeElement.files[0];
    this.utilService._loading = true;
    value.append('logo', logo);
    value.append('id_proyectos', this.proyectInfo.id_proyectos);
    this.leaderService.actualizarLogoProyecto(value)
      .subscribe(data => {
        if (!data.error) {
          Swal.fire({
            title: 'Actualizado',
            text: data.message,
            icon: 'success'
          });
          this.proyectInfo.logo = data.ruta;
          localStorage.setItem('proyect-info', JSON.stringify(this.proyectInfo));
        } else {
          Swal.fire({
            title: 'Error',
            text: data.message,
            icon: 'error'
          });
        }
      }, err => console.log(err)).add(() => this.utilService._loading = false);
    }
  }
}
