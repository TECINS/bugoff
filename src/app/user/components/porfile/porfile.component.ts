import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { LocalSession } from '../../../models/session.model';
import { UtilService } from '../../../services/util.service';



@Component({
  selector: 'app-porfile',
  templateUrl: './porfile.component.html',
  styleUrls: ['./porfile.component.scss']
})
export class PorfileComponent implements OnInit {
  
  secionlocal:LocalSession;

  actualizarinfo:FormGroup;

  constructor(private formBuilder: FormBuilder, private userService:UsersService, private utilservice:UtilService) {

    this.secionlocal = JSON.parse(localStorage.getItem("session-bugoff"));
    
    this.actualizarinfo = this.formBuilder.group({
    nombre: [this.secionlocal.nombre, Validators.required],
    apellido_paterno: [this.secionlocal.apellido_paterno, Validators.required],
    apellido_materno: [this.secionlocal.apellido_materno, Validators.required],
    user_name: [this.secionlocal.user_name, Validators.required],
    correo: [this.secionlocal.correo, Validators.required], 
    contrasenia: [this.secionlocal.contrasenia, Validators.required],
    descripcion:[this.secionlocal.descripcion, Validators.required],
    id_usuarios: [this.secionlocal.id_usuarios],
    });
  }


  ngOnInit(): void {
    
  }


  _ActualizarInfo(){
  
  this.utilservice._loading = true;
  console.log(this.actualizarinfo.value);
  this.userService.actualizarUsuario(this.actualizarinfo.value).subscribe( 
    data=>{
    if(!data.error){
      console.log(data);
      Swal.fire({
        title: 'Se actualizo correctamente',
        icon: 'success'
      });
    }else{
      Swal.fire({
        title: 'Ocurrio un error al actualizar',
        icon: 'info',
        text: data.message
      });
    }
   
    
  },err=>console.log(err)).add(()=> this.utilservice._loading = false);

  }
  
}
