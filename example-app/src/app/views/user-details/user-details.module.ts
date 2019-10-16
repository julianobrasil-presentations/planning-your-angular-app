import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {UserDetailsComponent} from './user-details/user-details.component';
import {UserDetailsRoutingModule} from './user-details-routing/user-details-routing.module';
import {UserDetailsRoutingComponent} from './user-details-routing/user-details-routing.component';
import {CustomMaterialModule} from './custom-material.module';
import {UserPresentationComponent} from './presentation/user-presentation/user-presentation.component';
import {UserDataFormComponent} from './presentation/user-data-form/user-data-form.component';

@NgModule({
  declarations: [
    UserDataFormComponent,
    UserDetailsComponent,
    UserDetailsRoutingComponent,
    UserPresentationComponent
  ],
  imports: [
    /** ANGULAR IMPORTS */
    CommonModule,
    ReactiveFormsModule,

    /** UserDetailsModule IMPORTS */
    UserDetailsRoutingModule,
    CustomMaterialModule
  ],
  exports: [UserDetailsComponent]
})
export class UserDetailsModule {}
