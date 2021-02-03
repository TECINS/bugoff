import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UtilService } from '../../../services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private loginService: LoginService,
    private route: Router,
    private utilService: UtilService
  ) {
    this.formLogin = formBuilder.group({
      correo: ['', Validators.required],
      contrasenia: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  iniciar(): void {
    if (this.formLogin.value.correo === '' || this.formLogin.value.contrasenia === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Verifica que no haya campos vacíos'
      });
    }
    else {
    this.utilService._loading = true;
    this.loginService.login(this.formLogin.value).subscribe(
      data => {
        if (!data.error){
          this.route.navigateByUrl('/app/usuario');
          localStorage.setItem('session-bugoff', JSON.stringify(data.message));
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error contraseña o correo incorrecta'
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
