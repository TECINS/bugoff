import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bugOff';
  constructor(private router: Router, private utilService: UtilService) { }

  ngOnInit(): void{
    if (localStorage.getItem('session-bugoff')) {
      this.router.navigateByUrl('/home/crear-proyecto');
    } else {
      this.router.navigateByUrl('login');
    }
  }
}
