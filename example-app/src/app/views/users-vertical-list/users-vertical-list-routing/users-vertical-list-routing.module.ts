import {NgModule} from '@angular/core';
import {Router, Route, RouterModule} from '@angular/router';

import {UsersVerticalListComponent} from '../users-vertical-list/users-vertical-list.component';
import {UsersVerticalListRoutingComponent} from './users-vertical-list-routing.component';

const routes: Route[] = [
  {
    path: '',
    component: UsersVerticalListRoutingComponent,
    children: [
      {
        path: '',
        component: UsersVerticalListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersVerticalListRoutingModule {}
