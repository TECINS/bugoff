import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegistro: FormGroup;

  formConfirmacion: FormGroup;

  constructor( private formBuilder: FormBuilder, private loginService: LoginService) { 

    this.formRegistro = formBuilder.group({
    
      nombre: ['', Validators.required],
      apellido_paterno: ['', Validators.required],
      apellido_materno:['', Validators.required],
      user_name: ['', Validators.required],
      contrasenia: ['', Validators.required],

    });

    this.formConfirmacion = formBuilder.group({

    confirmar: ['', Validators.required],

    });

  }

  ngOnInit(): void {
  }

  Registro(){

  if(this.formRegistro.value.contrasenia === this.formConfirmacion.value){
    this.loginService.registro(this.formRegistro.value).subscribe(
      data => { console.log(data) },
      err  => { console.log(err ) }
    );
  }

  }

}


