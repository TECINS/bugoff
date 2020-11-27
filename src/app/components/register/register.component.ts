import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';

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
    private router: Router
  ) {

    this.formRegistro = formBuilder.group({
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

  Registro() {
    if (this.formRegistro.value.contrasenia === this.formConfirmacion.value.confirmar) {
      this.loginService.registro(this.formRegistro.value).subscribe(
        data => {
          if (data.error.text === 'Usuario registrado') {
            this.router.navigateByUrl('/login');
          } else {
            Swal.fire({
              icon: 'error'
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Revisa que las contraseñas coincidan'
      });
    }

  }


}


