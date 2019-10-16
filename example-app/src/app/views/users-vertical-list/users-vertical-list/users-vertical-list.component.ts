import {ChangeDetectionStrategy, Component} from '@angular/core';

import {UsersVerticalListComponentService} from './users-vertical-list-component.service';
import {Observable} from 'rxjs';
import {User} from '@app/model';

@Component({
  selector: 'app-users-vertical-list',
  templateUrl: './users-vertical-list.component.html',
  styleUrls: ['./users-vertical-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersVerticalListComponent {
  users$: Observable<{
    [key: number]: User;
  }> = this._componentService.findAllUsers$();

  constructor(private _componentService: UsersVerticalListComponentService) {
    this._componentService.grabUsersFromTheServer();
  }

  userSelectionHandler(user: User) {
    this._componentService.setSelectedUser(user);
  }
}
