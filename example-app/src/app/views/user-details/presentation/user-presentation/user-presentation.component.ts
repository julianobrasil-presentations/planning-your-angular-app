import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {User} from '@app/model';
import {
  UserPresentationComponentData,
  UserPresentationComponentService
} from './user-presentation-component.service';

@Component({
  selector: 'app-user-presentation',
  templateUrl: './user-presentation.component.html',
  styleUrls: ['./user-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPresentationComponent {
  @Input() get data(): UserPresentationComponentData {
    return this._data;
  }
  set data(value: UserPresentationComponentData) {
    this._data = value;

    this._showSpinner = false;
  }
  private _data: UserPresentationComponentData;

  @Output()
  dataChange: EventEmitter<UserPresentationComponentData> = new EventEmitter<
    UserPresentationComponentData
  >();

  _showSpinner = false;

  constructor(private _componentService: UserPresentationComponentService) {}

  _saveUser(user: User) {
    this.dataChange.emit({user});
  }

  _switchToRandomPhoto() {
    this._componentService.grabRandomPhoto$().subscribe((photoUrl: string) => {
      const user = {
        ...this.data.user,
        photo: photoUrl
      };

      this.dataChange.emit({user});

      this._showSpinner = true;
    });
  }
}
