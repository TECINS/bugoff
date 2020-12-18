import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgregaProyecto } from '../services/agregar-proyecto';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
@Component({
  selector: 'app-agregarproyecto',
  templateUrl: './agregarproyecto.component.html',
  styleUrls: ['./agregarproyecto.component.scss']
})
export class AgregarproyectoComponent implements OnInit {
  date = new Date();
  imgLogo = '';
  @ViewChild('image', {
    read: ElementRef
  }) imagen: ElementRef;
  formInvitation: FormGroup;
  formProyecto: FormGroup;
  id_proyecto: string;
  projectName = 'proyecto';
  projects: any[] = [
    {value: '1', viewValue: 'BugOff'},
    {value: '2', viewValue: 'Kabum'},
    {value: '3', viewValue: 'SIIA'}
  ];
  visible= true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  emails: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private proyecto: AgregaProyecto
  ) {

    this.formProyecto = formBuilder.group({
      id_proyectos: '',
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      repositorio: ['', Validators.required],
      logo: ''
    });
    this.formInvitation = formBuilder.group({
      proyecto: ['', Validators.required],
      email: ['', Validators.required],
    });

  }

  ngOnInit(): void {
  }
  //registrar
  registrarProyecto(_: any): void {
    const imagen = this.imagen.nativeElement.files[0];
    const valores = new FormData();
    const claveGlobal = this.date.getDate() + '' + this.date.getDay() + '' + this.date.getHours()
      + '' + this.date.getMinutes() + '' + this.date.getMilliseconds();
    valores.append('id_proyectos', claveGlobal);
    valores.append('nombre', this.formProyecto.value.nombre);
    valores.append('descripcion', this.formProyecto.value.descripcion);
    valores.append('repositorio', this.formProyecto.value.repositorio);
    valores.append('logo', imagen);
    this.proyecto.registerProject(valores).subscribe(
      data => {
        if (data) {
          Swal.fire({
            icon: 'success',
            title: 'Proyecto registrado'
          });
        }
        console.log(data);
      },
      err => {
        Swal.fire({
          icon: 'warning',
          title: 'Algo ha ocurrido, proyecto no registrado'
        });
        console.log(err);
      }
    );
  }
  //image preview
  readURL(event: Event): void {
    if ((event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files[0]) {
      const file = (event.target as HTMLInputElement).files[0];
      const reader = new FileReader();
      reader.onload = e => this.imgLogo = reader.result.toString();
      reader.readAsDataURL(file);
    }
  }
  addEmail(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add emails
    if ((value || '').trim()) {
      this.emails.push({name: value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }

  removeEmail(email: string): void {
    const index = this.emails.indexOf(email);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }
  changeProject(value){
    this.projectName = this.projects[this.projects.findIndex(x => x.value === value)].viewValue;
  }
  sendInvitation(){


  }
}
