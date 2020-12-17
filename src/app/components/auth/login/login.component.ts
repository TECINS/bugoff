import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
    private route: Router
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
        title: 'Verifica que no haya campos vacios'
      });
    }
    else {
    this.loginService.login(this.formLogin.value).subscribe(
      data => {
        if (data){
          this.route.navigateByUrl('/home/initial-page');
          localStorage.setItem('session-bugoff', JSON.stringify(data));
        }
      },
      err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error contraseña o correo incorrecta'
        });
      }
    );
  }
  }
}
