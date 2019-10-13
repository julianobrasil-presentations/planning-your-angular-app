import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {ShellComponent} from './shell/shell.component';
import {ShellRoutingModule} from './shell-routing/shell-routing.module';
import {ShellRoutingComponent} from './shell-routing/shell-routing.component';
import {CustomMaterialModule} from './custom-material.module';
import {UsersVerticalListModule} from '../users-vertical-list';

import {UserAvatarModule} from '@app/views/shared/components/user-avatar';

@NgModule({
  declarations: [ShellRoutingComponent, ShellComponent],
  imports: [
    /** ANGULAR IMPORTS */
    CommonModule,
    ReactiveFormsModule,

    /** ShellModule IMPORTS */
    CustomMaterialModule,
    ShellRoutingModule,
    UserAvatarModule,
    UsersVerticalListModule,
  ],
  exports: [ShellComponent]
})
export class ShellModule {}
