import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ErrorReportService } from 'src/app/services/tester-Services/tester-report.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

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
    imageSrc = 'https://scontent.frex1-1.fna.fbcdn.net/v/t1.0-9/60448348_2188457861222810_257805742654881792_o.jpg?_nc_cat=101&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeGzH1r1DSACU8LOsowxysLYql9H1etFXR6qX0fV60VdHvTLXZJvqsAJPT3T7YbHmSXUhGAb7m7Ur0381ijl1_D5&_nc_ohc=nep7fHZJzKIAX_JZbSd&_nc_ht=scontent.frex1-1.fna&oh=6076f6184390b08d23b7eddd7c93c825&oe=5FFF461E';
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