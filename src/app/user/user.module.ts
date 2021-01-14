import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { CreateProyectComponent } from './components/create-proyect/create-proyect.component';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { PorfileComponent } from './components/porfile/porfile.component';
import { ViewErrorComponent } from './components/view-error/view-error.component';
import { ViewErrorAsignedComponent } from './components/view-error-asigned/view-error-asigned.component';


@NgModule({
  declarations: [
    CreateProyectComponent,
    HomeUserComponent,
    PorfileComponent,
    ViewErrorComponent,
    ViewErrorAsignedComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ]
})
export class UserModule { }
