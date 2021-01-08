import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recovery-pass',
  templateUrl: './recovery-pass.component.html',
  styleUrls: ['./recovery-pass.component.scss']
})
export class RecoveryPassComponent implements OnInit {
  formRecoveryPass: FormGroup;
  correo: string;

  constructor(
    public formBuilder: FormBuilder,
    public loginService: LoginService,
    public router: Router
  ) {
    this.formRecoveryPass = formBuilder.group({
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  recoveryPassword() {
    this.correo = this.formRecoveryPass.value.correo;
    console.log(this.correo);
    Swal.fire(
      {
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor...',
        titleText: 'Recuperando'
      }
    );
    Swal.showLoading();
    if (this.validarCorreoElectronico(this.correo)) {
      this.loginService.sendForgotMessage(this.correo)
        .subscribe((resp: any) => {
          console.log(resp);
          Swal.fire({
            allowOutsideClick: false,
            icon: 'success',
            title: 'Correo de recuperación enviado',
            text: 'Un email de recuperación ha sido enviado a tu correo.',
          }).then(() => {
            this.router.navigateByUrl('login');
          });
        },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrio un error al recuperar contraseña',
            });
            console.log(err);
          }
        );
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

