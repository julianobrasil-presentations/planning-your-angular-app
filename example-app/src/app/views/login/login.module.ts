import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {LoginComponent} from './login/login.component';
import {LoginRoutingModule} from './login-routing/login-routing.module';
import {LoginRoutingComponent} from './login-routing/login-routing.component';
import {CustomMaterialModule} from './custom-material.module';

@NgModule({
  declarations: [
    LoginRoutingComponent,
    LoginComponent
  ],
  imports: [
    /** ANGULAR IMPORTS */
    CommonModule,
    ReactiveFormsModule,

    /** LoginModule IMPORTS */
    LoginRoutingModule,
    CustomMaterialModule,
  ],
  exports: [LoginComponent],
})
export class LoginModule {}
