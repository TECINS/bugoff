import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeDeveloperComponent } from './components/home-developer/home-developer.component';
import { AssignedErrorsComponent } from './components/assigned-errors/assigned-errors.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home', component: HomeDeveloperComponent
      },
      {
        path: 'errores-asignados', component: AssignedErrorsComponent
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
export class DeveloperRoutingModule { }
