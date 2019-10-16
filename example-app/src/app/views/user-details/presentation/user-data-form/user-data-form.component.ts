import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  HostListener,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  FormGroup,
  Validators,
  FormBuilder,
  FormGroupDirective
} from '@angular/forms';

import {
  UserDataFormComponentData,
  UserDataFormComponentService
} from './user-data-form-component.service';
import {User} from '@app/model';

@Component({
  selector: 'app-user-data-form',
  templateUrl: './user-data-form.component.html',
  styleUrls: ['./user-data-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserDataFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => UserDataFormComponent),
      multi: true
    }
  ]
})
export class UserDataFormComponent implements ControlValueAccessor, Validator {
  @Input() get user(): User {
    return this._user;
  }
  set user(value: User) {
    this._user = value;
    if (value && value.name) {
      this._form.patchValue({name: value.name});
    } else {
      this._form.reset();
      if (this._formGroupDirective && this._formGroupDirective.resetForm) {
        setTimeout(() => this._formGroupDirective.resetForm(), 700);
      }
    }
  }
  private _user: User;

  @Output() userChange: EventEmitter<User> = new EventEmitter<User>();

  @ViewChild(FormGroupDirective, {static: false})
  _formGroupDirective: FormGroupDirective;

  _form: FormGroup;
  /**
   * Keep a reference to the "OnChanged" function provided by angular
   * (ControlValueAccessor)
   */
  private _onChange: (data: UserDataFormComponentData) => void;

  /**
   * Keep a reference for the 'OnTouched' function provided by angular
   * (ControlValueAccessor)
   */
  @HostListener('focusout') _onTouched: () => void = () => {};

  constructor(
    private _componentService: UserDataFormComponentService,
    private _fb: FormBuilder
  ) {
    this._form = this._fb.group({
      name: [null, Validators.required]
    });
  }

  /** Implements da ControlValueAccessor */
  writeValue(data: UserDataFormComponentData): void {
    this._form.patchValue({...data.user});
    this._user = data.user;
  }

  /** Implements ControlValueAccessor */
  registerOnChange(fn: (data: UserDataFormComponentData) => void): void {
    this._onChange = fn;
  }

  /** Implements ControlValueAccessor */
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  /** Implements ControlValueAccessor */
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this._form.disable();
    } else {
      this._form.enable();
    }
  }

  /** Implements Validator */
  validate(control: AbstractControl): ValidationErrors {
    return this._form.valid ? null : {required: true};
  }

  saveButton() {
    if (this._disableSaveButton) {
      return;
    }
    this.userChange.emit({...this.user, name: this._form.value.name});
  }

  get _disableSaveButton(): boolean {
    return this._form.disabled || this._form.invalid;
  }
}
