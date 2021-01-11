import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MatChipInputEvent } from '@angular/material/chips';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorReportService } from '../../services/tester-report.service';
import { UtilService } from '../../../services/util.service';
import { DatePipe } from '@angular/common';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-error-report',
  templateUrl: './error-report.component.html',
  styleUrls: ['./error-report.component.scss']
})
export class ErrorReportComponent implements OnInit {
  formReport: FormGroup;
  localsession: any;
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
      // TODO: sacar el id_proyectos dependiendo del proyecto actual
      id_proyectos: ['1851147215'],
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
  }

  ngOnInit(): void {
  }

  // Add testings
  addTest(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.testings.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  removeTest(test: string): void {
    const index = this.testings.indexOf(test);

    if (index >= 0) {
      this.testings.splice(index, 1);
    }
  }
  addBranch(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add testings
    if ((value || '').trim()) {
      this.branches.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeBranch(branch: string): void {
    const index = this.branches.indexOf(branch);

    if (index >= 0) {
      this.branches.splice(index, 1);
    }
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
      this.formReport.get('anexo').setValue(anexo);
      this.utilService._loading = true;
      console.log(this.formReport.value);
      this.reportErrorService.errorReport(this.formReport.value)
        .subscribe(
          (resp) => {
            console.log(resp);
            if (!resp.error) {
              Swal.fire({
                allowOutsideClick: false,
                icon: 'info',
                title: 'Error reportado',
              });
              this.formReport.reset();
            } else {
              Swal.fire({
                allowOutsideClick: false,
                icon: 'info',
                title: 'Ocurrio un error al reportar',
              });
            }
          },
          err => {
            console.log(err);
          }
        ).add(() => this.utilService._loading = false);
    }
  }

}
