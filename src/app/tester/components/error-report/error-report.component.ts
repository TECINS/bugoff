import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MatChipInputEvent } from '@angular/material/chips';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorReportService } from '../../services/tester-report.service';
import { UtilService } from '../../../services/util.service';
import { DatePipe } from '@angular/common';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { ProyectInfo } from '../../../models/proyectos.model';
import { LocalSession } from '../../../models/session.model';

@Component({
  selector: 'app-error-report',
  templateUrl: './error-report.component.html',
  styleUrls: ['./error-report.component.scss']
})
export class ErrorReportComponent implements OnInit {
  formReport: FormGroup;
  localsession: LocalSession;
  proyectInfo: ProyectInfo;
  @ViewChild('anexo', {
    read: ElementRef
  }) img: ElementRef;
  date: Date;
    // Chips for Test devices
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    testings = [];
    // Chips for Branchgithub
    branches = [];
    imageSrc: string;
  constructor(
    private reportErrorService: ErrorReportService,
    public fb: FormBuilder,
    private utilService: UtilService,
    private datePipe: DatePipe
  ) {
    this.formReport = fb.group({
      autor_reporte: [''],
      id_proyectos: [''],
      fecha_reporte: [''],
      titulo_error: ['', [Validators.required]],
      iteraciones: ['', [Validators.required]],
      porcentaje_aparicion: ['', [Validators.required]],
      dispositivo_uso: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      id_prioridades: ['', [Validators.required]],
      anexo: ['anexo', [Validators.required]],
      rama_repositorio: ['', [Validators.required]],
    });
    this.date = new Date();
    this.localsession = JSON.parse(localStorage.getItem('session-bugoff'));
    this.proyectInfo = JSON.parse(localStorage.getItem('proyect-info'));
  }

  ngOnInit(): void {
  }

  //#region image preview
  readURL(event: Event): void {
    if ((event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files[0]) {
      const file = (event.target as HTMLInputElement).files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result.toString();
      reader.readAsDataURL(file);
    }
  }
  reportarerrorEvent(): void {
    if (this.formReport.invalid) {
      return Object.values(this.formReport.controls).forEach(control => {
        control.markAsTouched();
        Swal.fire({
          icon: 'warning',
          title: 'Verifica que no haya campos vacios'
        });
      });
    } else {
      const anexo = this.img.nativeElement.files[0];
      const data = new FormData();
      data.append('anexo', anexo);
      this.formReport.get('fecha_reporte').setValue(this.datePipe.transform(this.date, 'yyyy-MM-dd'));
      this.formReport.get('autor_reporte').setValue(this.localsession.id_usuarios);
      this.formReport.get('id_proyectos').setValue(this.proyectInfo.id_proyectos);
      this.formReport.get('anexo').setValue(anexo);
      this.utilService._loading = true;
      data.append('fecha_reporte', this.formReport.get('fecha_reporte').value);
      data.append('autor_reporte', this.formReport.get('autor_reporte').value);
      data.append('titulo_error', this.formReport.get('titulo_error').value);
      data.append('iteraciones', this.formReport.get('iteraciones').value);
      data.append('porcentaje_aparicion', this.formReport.get('porcentaje_aparicion').value);
      data.append('dispositivo_uso', this.formReport.get('dispositivo_uso').value);
      data.append('descripcion', this.formReport.get('descripcion').value);
      data.append('id_prioridades', this.formReport.get('id_prioridades').value);
      data.append('rama_repositorio', this.formReport.get('rama_repositorio').value);
      data.append('id_proyectos', this.formReport.get('id_proyectos').value);
      this.reportErrorService.errorReport(data)
        .subscribe(
          (resp) => {
            if (!resp.error) {
              Swal.fire({
                allowOutsideClick: false,
                icon: 'success',
                title: 'Error reportado correctamente',
              });
              this.formReport.reset();
              this.imageSrc = null;
            } else {
              console.log(resp);
              Swal.fire({
                allowOutsideClick: false,
                icon: 'error',
                title: 'Ocurrio un error al reportar',
              });
            }
          },
          err => console.log(err)).add(() => this.utilService._loading = false);
    }
  }

}
