import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { UtilService } from '../../../services/util.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formRegistro: FormGroup;

  formConfirmacion: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private utilService: UtilService
  ) {

    this.formRegistro = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      apellido_paterno: ['', Validators.required],
      apellido_materno: ['', Validators.required],
      user_name: ['', Validators.required],
      contrasenia: ['', Validators.required],

    });

    this.formConfirmacion = formBuilder.group({
      confirmar: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  registro(): void {
    if (this.formRegistro.value.contrasenia === this.formConfirmacion.value.confirmar) {
      this.utilService._loading = true;
      this.loginService.registro(this.formRegistro.value).subscribe(
        data => {
          console.log(data);
          if (!data.error) {
            Swal.fire({
              title: 'Se registo correctamente',
              icon: 'success'
            }).then(() => this.router.navigateByUrl('auth') );
          } else {
            Swal.fire({
              title: 'Ocurrio un error al registrarse',
              icon: 'info',
              text: data.message
            });
          }
        },
        err => console.log(err)).add(() => this.utilService._loading = false);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Revisa que las contraseñas coincidan'
      });
    }
  }

}
