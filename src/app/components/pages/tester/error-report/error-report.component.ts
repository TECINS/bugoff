import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ErrorReportService } from 'src/app/services/tester-Services/tester-report.service';
import { Router } from '@angular/router';
import { errorReport } from '../../../../models/tester-reporterror';
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
  date: Date;
  reporteModel: errorReport = new errorReport();
  constructor(
    private reportErrorService: ErrorReportService,
    public fb: FormBuilder,
    private router: Router,
    private utilService: UtilService,
    private datePipe: DatePipe
  ) {
    this.formReport = fb.group({
      titulo: ['', [ Validators.required]],
      iteraciones: ['', [Validators.required]],
      porcentaje: ['', [Validators.required]],
      dispositivos: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      prioridad: ['', [Validators.required]],
      anexo: ['', [Validators.required]],
      ramas: ['', [Validators.required]],
    });
    this.date = new Date();
    this.localsession = JSON.parse(localStorage.getItem('session-bugoff'));
   }

  ngOnInit(): void {
  }
  //#region Chips for Test devices
  visible= true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  testings = [ 'Web 1980x720', 'iPhone XS Max', 'Mi Note 10 lite' ];

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
  //#endregion
  //#region Chips for Branchgithub
  branches = [ '0.0.1' ];

  addBranch(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add testings
    if ((value || '').trim()) {
      this.branches.push( value.trim() );
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
  //#endregion
  //#region image preview
  imageSrc = 'https://scontent.frex1-1.fna.fbcdn.net/v/t1.0-9/60448348_2188457861222810_257805742654881792_o.jpg?_nc_cat=101&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeGzH1r1DSACU8LOsowxysLYql9H1etFXR6qX0fV60VdHvTLXZJvqsAJPT3T7YbHmSXUhGAb7m7Ur0381ijl1_D5&_nc_ohc=nep7fHZJzKIAX_JZbSd&_nc_ht=scontent.frex1-1.fna&oh=6076f6184390b08d23b7eddd7c93c825&oe=5FFF461E';
  readURL(event: Event): void {
    if ((event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files[0]) {
        const file = (event.target as HTMLInputElement).files[0];
        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result.toString();
        reader.readAsDataURL(file);
    }
  }
  //#endregion
  getInfo(){
    this.reporteModel.anexo = this.formReport.get('anexo').value;
    this.reporteModel.autor_reporte = this.localsession.user_name;
    this.reporteModel.descricpion = this.formReport.get('descripcion').value;
    this.reporteModel.dispositivo_uso = this.testings.join();
    this.reporteModel.fecha_reporte = this.datePipe.transform(this.date, "yyyy-MM-dd");
    this.reporteModel.id_prioridades = Number(this.formReport.get('prioridad').value);
    this.reporteModel.id_proyectos = 140;
    this.reporteModel.iteraciones = Number(this.formReport.get('iteraciones').value);
    this.reporteModel.porcentaje_aparicion = Number(this.formReport.get('porcentaje').value);
    this.reporteModel.rama_repositorio = this.branches.join();
    this.reporteModel.titulo_error = this.formReport.get('titulo').value;
    return this.reporteModel;
  }
  reportarerrorEvent(){
    this.utilService._loading = true;
    if( this.formReport.invalid){
      return Object.values( this.formReport.controls).forEach( control => {
        control.markAsTouched();
        Swal.fire({
          icon: 'warning',
          title: 'Verifica que no haya campos vacios'
        });
      });
    }
    this.reportErrorService.errorReport(this.getInfo())
      .subscribe(
        (resp) => {
          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            title: resp['message'],
          });
          this.formReport.reset();
        },
        err => {
          console.log(err);
        }
      ).add(() => this.utilService._loading = false);
  }
}