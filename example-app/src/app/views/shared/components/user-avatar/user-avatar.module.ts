import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {UserAvatarComponent} from './user-avatar/user-avatar.component';
import {UserAvatarRoutingModule} from './user-avatar-routing/user-avatar-routing.module';
import {UserAvatarRoutingComponent} from './user-avatar-routing/user-avatar-routing.component';
import {CustomMaterialModule} from './custom-material.module';

@NgModule({
  declarations: [
    UserAvatarRoutingComponent,
    UserAvatarComponent
  ],
  imports: [
    /** ANGULAR IMPORTS */
    CommonModule,
    ReactiveFormsModule,

    /** UserAvatarModule IMPORTS */
    UserAvatarRoutingModule,
    CustomMaterialModule,
  ],
  exports: [UserAvatarComponent],
})
export class UserAvatarModule {}
