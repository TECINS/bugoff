import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadprojectsService } from '../../../services/shared-Services/loadprojects.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  foods: Food[] = [
    {value: '0', viewValue: 'BugOff'},
    {value: '1', viewValue: 'Kabum'},
    {value: '2', viewValue: 'SIIA'}
  ];


  @Input() toggleside: Observable<boolean>;
  mobileQuery: MediaQueryList;
  
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  localsession: any;
  loadprojectsinfo = [];
  visiblecomponent = 0;
  private _mobileQueryListener: () => void;
  private router: Router;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private loadprojects: LoadprojectsService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.localsession = JSON.parse(localStorage.getItem('session-bugoff'));
    this.loadprojects.loadProject(1)
      .subscribe((resp) => {
        this.loadprojectsinfo = resp.projects;
        //only reason for use file json static without api.
        var me = this;
        me.loadprojectsinfo = Object.keys(me.loadprojectsinfo ).map(function(key) {return me.loadprojectsinfo [key];});
        console.log(this.loadprojectsinfo);
      });
  }
  ngOnInit(): void {
  }
  cerrar(){
    localStorage.setItem('session-bugoff', '');
  }
  selectProject(projectselected: any) {
    this.visiblecomponent = projectselected.role_project;
    console.log(projectselected);
    console.log(this.visiblecomponent);
  }
}
