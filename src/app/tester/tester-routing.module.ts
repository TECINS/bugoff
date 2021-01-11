import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorReportComponent } from './components/error-report/error-report.component';
import { ErrorsListComponent } from './components/errors-list/errors-list.component';
import { ErrorsInfoComponent } from './components/errors-info/errors-info.component';
import { HomeTesterComponent } from './components/home-tester/home-tester.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'reportar-error', component: ErrorReportComponent
      },
      {
        path: 'home', component: HomeTesterComponent
      },
      {
        path: 'lista-errores', component: ErrorsListComponent
      },
      {
        path: 'error-info/:id_errores', component: ErrorsInfoComponent
      },
      {
        path: '**', redirectTo: 'home'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TesterRoutingModule { }
