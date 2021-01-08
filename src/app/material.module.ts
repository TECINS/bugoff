import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [],
  imports: [
    MatChipsModule,
    MatSelectModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MatChipsModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class MaterialModule { }
