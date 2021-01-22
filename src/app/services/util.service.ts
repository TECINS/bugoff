import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }
  private loading = false;

  public set _loading(loading) {
    this.loading = loading;
  }
  public get _loading(): boolean {
    return this.loading;
  }
}
