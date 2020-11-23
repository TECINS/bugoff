import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recovery-pass',
  templateUrl: './recovery-pass.component.html',
  styleUrls: ['./recovery-pass.component.scss']
})
export class RecoveryPassComponent implements OnInit {
  formRecoveryPass: FormGroup
  constructor(
    public formBuilder: FormBuilder
  ) { 
    this.formRecoveryPass = formBuilder.group({
      recuperar: ['', Validators.required]
    });
  }

  ngOnInit(): void{
  }

  recoveryPassword() {
    if(this.validarCorreoElectronico(this.formRecoveryPass.value)) {

    }
  }

  validarCorreoElectronico(correo: string): boolean {
    const regexCorreo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexCorreo.test(correo) || correo.length > 60) {
      return false;
    }
    return true;
  }

}

