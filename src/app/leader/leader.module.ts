import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaderRoutingModule } from './leader-routing.module';
import { EditProyectComponent } from './components/edit-proyect/edit-proyect.component';
import { ManageProyectComponent } from './components/manage-proyect/manage-proyect.component';
import { HomeLeaderComponent } from './components/home-leader/home-leader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [
    EditProyectComponent,
    ManageProyectComponent,
    HomeLeaderComponent
  ],
  imports: [
    CommonModule,
    LeaderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ]
})
export class LeaderModule { }
