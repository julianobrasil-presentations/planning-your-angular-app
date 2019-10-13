import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {User} from '@app/model';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAvatarComponent {
  @Input() get user(): User {
    return this._user;
  }
  set user(value: User) {
    this._user = value;
  }
  private _user: User;

  @Input() showName = false;

  @Output()
  userSelected: EventEmitter<User> = new EventEmitter<User>();
}
