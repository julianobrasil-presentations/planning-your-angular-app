import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  HostListener
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {LoginComponentService} from './login-component.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  /** Formulário do componente */
  _loginForm: FormGroup = this.fb.group({
    username: ['juliano.brasil@email.com', Validators.required],
    password: ['*****', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private _componentService: LoginComponentService
  ) {
    this._componentService.checkLogin();
  }

  /** Submete o formulário de login */
  onSubmit() {
    if (this._loginForm.invalid) {
      return;
    }
    this._componentService.login({...this._loginForm.value});
  }
}
