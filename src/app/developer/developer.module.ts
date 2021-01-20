import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeveloperRoutingModule } from './developer-routing.module';
import { HomeDeveloperComponent } from './components/home-developer/home-developer.component';
import { AssignedErrorsComponent } from './components/assigned-errors/assigned-errors.component';
import { ViewAssignedErrorComponent } from './components/view-assigned-error/view-assigned-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { HistoryErrorsComponent } from './components/history-errors/history-errors.component';


@NgModule({
  declarations: [
    HomeDeveloperComponent,
    AssignedErrorsComponent,
    ViewAssignedErrorComponent,
    HistoryErrorsComponent,
  ],
  imports: [
    CommonModule,
    DeveloperRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ]
})
export class DeveloperModule { }
