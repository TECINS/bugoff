import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/shared/home/home.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'app', component: HomeComponent, children: [
      {
        path: 'tester',
        loadChildren: () => import('./tester/tester.module').then( m => m.TesterModule)
      },
      {
        path: 'usuario',
        loadChildren: () => import('./user/user.module').then( m => m.UserModule)
      },
      {
        path: 'lider',
        loadChildren: () => import('./leader/leader.module').then(m => m.LeaderModule)
      },
      {
        path: 'desarrollador',
        loadChildren: () => import('./developer/developer.module').then(m => m.DeveloperModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
