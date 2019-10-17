import {Injectable} from '@angular/core';
import {StoreService, Action} from '@app/store';
import {withLatestFrom, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {User} from '@app/model';

@Injectable({providedIn: 'root'})
export class ShellComponentService {
  constructor(private _store: StoreService) {}

  getLoggedUser$(): Observable<User> {
    return this._store.select('entities.users').pipe(
      withLatestFrom(this._store.select('loginState.loggedUser')),
      map(([userEntities, loggedUser]) =>
        userEntities && loggedUser && Object.keys(userEntities).length
          ? userEntities[loggedUser.id]
          : null
      )
    );
  }

  logoff() {
    this._store.dispatch(new Action('LOGOUT'));
  }
}
