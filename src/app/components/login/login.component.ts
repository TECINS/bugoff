import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup
  constructor(
    public formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
    this.formLogin = formBuilder.group({
      correo: ['', Validators.required],
      contrasenia: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  iniciar() {
    this.loginService.login(this.formLogin.value).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

}
