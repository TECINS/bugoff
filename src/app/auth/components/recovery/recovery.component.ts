import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { UtilService } from '../../../services/util.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {
  formRecoveryPass: FormGroup;
  correo: string;

  constructor(
    public formBuilder: FormBuilder,
    public loginService: LoginService,
    public router: Router,
    private utilService: UtilService
  ) {
    this.formRecoveryPass = formBuilder.group({
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  recoveryPassword(): void {
    this.correo = this.formRecoveryPass.value.correo;
    if (this.validarCorreoElectronico(this.correo)) {
      this.utilService._loading = true;
      this.loginService.sendForgotMessage(this.correo)
        .subscribe((resp: any) => {
          if (!resp.error) {
            Swal.fire({
              allowOutsideClick: false,
              icon: 'success',
              title: 'Correo de recuperación enviado',
              text: 'Un email de recuperación ha sido enviado a tu correo.',
            }).then(() => {
              this.router.navigateByUrl('auth');
            });
          } else {
            console.log(resp);
            Swal.fire({
              allowOutsideClick: false,
              icon: 'info',
              title: 'Ocurrio un error al enviar el correo',
              text: resp.message,
            });
          }
        }, err => console.log(err)).add(() => this.utilService._loading = false);
    }
  }

  validarCorreoElectronico(correo: string): boolean {
    const regexCorreo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexCorreo.test(correo) || correo.length > 60) {
      return false;
    }
    return true;
  }

}
