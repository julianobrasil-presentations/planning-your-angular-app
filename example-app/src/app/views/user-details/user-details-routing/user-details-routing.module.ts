import {NgModule} from '@angular/core';
import {Router, Route, RouterModule} from '@angular/router';

import {UserDetailsComponent} from '../user-details/user-details.component';
import {UserDetailsRoutingComponent} from './user-details-routing.component';

const routes: Route[] = [
  {
    path: '',
    component: UserDetailsRoutingComponent,
    children: [
      {
        path: '',
        component: UserDetailsComponent,
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDetailsRoutingModule {}
