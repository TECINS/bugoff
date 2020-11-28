import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
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

        },
        err => {
          console.log(err.error['text']);
          if(err.error['text'] === 'Usuario registrado') {
            this.router.navigateByUrl('/login');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Ocurrio un error al registrar'
            });
          }
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Revisa que las contraseñas coincidan'
      });
    }
  if(this.formRegistro.value.contrasenia === this.formConfirmacion.value){
    this.loginService.registro(this.formRegistro.value).subscribe(
      data => { if(data){
        this.route.navigateByUrl('/login');
        Swal.fire({
          icon: 'success',
          title: 'Se ha registrado correctamente'
        });
      }else{
        Swal.fire({
          icon: 'warning',
          title: 'Verifica que no haya campos vacios'
        });
      }
      },

      err  => { console.log(err ) },
    );
  }
}


