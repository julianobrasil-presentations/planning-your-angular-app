import {NgModule} from '@angular/core';
import {Router, Route, RouterModule} from '@angular/router';

import {LoginComponent} from '../login/login.component';
import {LoginRoutingComponent} from './login-routing.component';

const routes: Route[] = [
  {
    path: '',
    component: LoginRoutingComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
