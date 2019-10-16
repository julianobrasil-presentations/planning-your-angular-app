import {Injectable} from '@angular/core';
import {UserRestService} from '@app/rest';
import {User} from '@app/model';
import {StoreService, Action} from '@app/store';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UsersVerticalListComponentService {
  constructor(
    private _userRestService: UserRestService,
    private _store: StoreService
  ) {}

  grabUsersFromTheServer() {
    this._userRestService.getAllUsers().subscribe((users: User[]) => {
      this._store.dispatch(new Action('FILL_IN_USERS', {users}));
    });
  }

  findAllUsers$(): Observable<User[]> {
    return this._store
      .select('entities.users')
      .pipe(
        map((userEntities: {[key: number]: User}) =>
          Object.keys(userEntities).map((key: string) => userEntities[key])
        )
      );
  }

  setSelectedUser(user: User) {
    this._store.dispatch(new Action('SET_SELECTED_USER_ID', {userId: user.id}));
  }
}
