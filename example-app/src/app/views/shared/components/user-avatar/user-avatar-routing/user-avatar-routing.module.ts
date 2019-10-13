import {NgModule} from '@angular/core';
import {Router, Route, RouterModule} from '@angular/router';

import {UserAvatarComponent} from '../user-avatar/user-avatar.component';
import {UserAvatarRoutingComponent} from './user-avatar-routing.component';

const routes: Route[] = [
  {
    path: '',
    component: UserAvatarRoutingComponent,
    children: [
      {
        path: '',
        component: UserAvatarComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAvatarRoutingModule {}
