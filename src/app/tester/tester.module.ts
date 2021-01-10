import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TesterRoutingModule } from './tester-routing.module';
import { ErrorReportComponent } from './components/error-report/error-report.component';
import { ErrorsListComponent } from './components/errors-list/errors-list.component';
import { ErrorsInfoComponent } from './components/errors-info/errors-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { HomeTesterComponent } from './components/home-tester/home-tester.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    ErrorReportComponent,
    ErrorsListComponent,
    ErrorsInfoComponent,
    HomeTesterComponent
  ],
  imports: [
    CommonModule,
    TesterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
  ]
})
export class TesterModule { }
