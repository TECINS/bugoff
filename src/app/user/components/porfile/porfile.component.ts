import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-porfile',
  templateUrl: './porfile.component.html',
  styleUrls: ['./porfile.component.scss']
})
export class PorfileComponent implements OnInit {

  nickname:string;
  nombres:string;
  apellido_Materno:string;
  apellido_Paterno:string;
  Correo:string;
  contrasena:string;


  constructor() {

   }

  ngOnInit(): void {
    this._obtener_info();
  }

  _obtener_info(){

    let nombre:any;
    
    nombre = JSON.parse(localStorage.getItem("session-bugoff"));
    
    
    this.nombres = nombre.nombre;
    this.nickname = nombre.user_name;
    this.apellido_Materno = nombre.apellido_materno;
    this.apellido_Paterno = nombre.apellido_paterno;
    this.Correo = nombre.correo;
    this.contrasena = nombre.contrasenia;

    console.log(nombre.nombre);
    }
  
}
