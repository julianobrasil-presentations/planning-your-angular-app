import {NgModule} from '@angular/core';
import {
  Router,
  Route,
  RouterModule,
  ActivatedRoute,
  ParamMap
} from '@angular/router';

import {ShellComponent} from '../shell/shell.component';
import {ShellRoutingComponent} from './shell-routing.component';

import {map} from 'rxjs/operators';

const routes: Route[] = [
  {
    path: '',
    component: ShellRoutingComponent,
    children: [
      {
        path: '',
        component: ShellComponent,
        children: [
          {
            path: 'users/:id',
            loadChildren: () =>
              import('@app/views/user-details').then(m => m.UserDetailsModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule {}
