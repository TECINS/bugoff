import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

export interface ProbadoEn {
  name: string;
}
export interface Ramas {
  name: string;
}
@Component({
  selector: 'app-error-report',
  templateUrl: './error-report.component.html',
  styleUrls: ['./error-report.component.scss']
})
export class ErrorReportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  //#region Chips for Test devices
  visible= true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  testings: ProbadoEn[] = [
    {name: 'Web 1980x720'},
    {name: 'iPhone XS Max'},
    {name: 'Mi Note 10 lite'},
  ];

  addTest(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add testings
    if ((value || '').trim()) {
      this.testings.push({name: value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }

  removeTest(test: ProbadoEn): void {
    const index = this.testings.indexOf(test);

    if (index >= 0) {
      this.testings.splice(index, 1);
    }
  }
  //#endregion
  //#region Chips for Branchgithub
  branches: Ramas[] = [
    {name: '0.0.1'},
  ];

  addBranch(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add testings
    if ((value || '').trim()) {
      this.branches.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeBranch(branch: Ramas): void {
    const index = this.testings.indexOf(branch);

    if (index >= 0) {
      this.branches.splice(index, 1);
    }
  }
  //#endregion
  //#region image preview
  imageSrc: string;
  readURL(event: Event): void {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result.toString();

        reader.readAsDataURL(file);
        console.log(this.imageSrc);
    }
  }
  //#endregion
}