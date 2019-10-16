import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '@app/model';
import {StoreService, Action} from '@app/store';
import {map, take} from 'rxjs/operators';
import {UserRestService} from '@app/rest';

@Injectable({providedIn: 'root'})
export class UserDetailsComponentService {
  constructor(
    private _store: StoreService,
    private _userRestService: UserRestService
  ) {}

  getUserById$(id: string): Observable<User> {
    return this._store.select('entities.users').pipe(
      map((users: {[key: number]: User}) => users[id]),
      take(1)
    );
  }

  getUserByIdForever$(id: string): Observable<User> {
    return this._store
      .select('entities.users')
      .pipe(map((users: {[key: number]: User}) => users[id]));
  }

  saveUser(user: User) {
    this._userRestService
      .modifyUser(user)
      .subscribe((savedUser: User) =>
        this._store.dispatch(new Action('UPDATE_USER', {user: savedUser}))
      );
  }
}
