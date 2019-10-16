import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  HostListener,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';

import {
  VerticalListComponentData,
  VerticalListComponentService
} from './vertical-list-component.service';
import {User} from '@app/model';

@Component({
  selector: 'app-vertical-list',
  templateUrl: './vertical-list.component.html',
  styleUrls: ['./vertical-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalListComponent {
  @Input() users: User[] = [];

  @Output()
  userSelected: EventEmitter<User> = new EventEmitter<User>();
}
