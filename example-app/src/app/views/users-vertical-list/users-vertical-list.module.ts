import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {CustomMaterialModule} from './custom-material.module';
import {UsersVerticalListComponent} from './users-vertical-list/users-vertical-list.component';
import {UsersVerticalListRoutingComponent} from './users-vertical-list-routing/users-vertical-list-routing.component';
import {UsersVerticalListRoutingModule} from './users-vertical-list-routing/users-vertical-list-routing.module';
import {VerticalListComponent} from './presentation/vertical-list/vertical-list.component';
import {UserAvatarModule} from '../shared/components/user-avatar';

@NgModule({
  declarations: [
    UsersVerticalListRoutingComponent,
    UsersVerticalListComponent,
    VerticalListComponent
  ],
  imports: [
    /** ANGULAR IMPORTS */
    CommonModule,
    ReactiveFormsModule,

    /** UsersVerticalListModule IMPORTS */
    UsersVerticalListRoutingModule,
    CustomMaterialModule,

    UserAvatarModule
  ],
  exports: [UsersVerticalListComponent]
})
export class UsersVerticalListModule {}
