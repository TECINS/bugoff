import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { group } from 'console';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegistro: FormGroup;

  formConfirmacion: FormGroup;

  constructor( private formBuilder: FormBuilder ) { 

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

  }

}


