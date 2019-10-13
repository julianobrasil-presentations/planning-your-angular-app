import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ApplicationGuard} from './views/guards/application-guard';
import {AppComponent} from './app.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('@app/views/login').then(m => m.LoginModule)
  },
  {
    path: 'app',
    loadChildren: () => import('@app/views/shell').then(m => m.ShellModule),
    canLoad: [ApplicationGuard],
    canActivate: [ApplicationGuard]
  },
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
