import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bugOff';
  constructor(private router: Router) { }

  ngOnInit(){
    if (localStorage.getItem('session-bugoff')) {
      this.router.navigateByUrl('/home/initial-page');
    } else {
      this.router.navigateByUrl('login');
    }
  }
}
