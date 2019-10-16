import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '@app/model';
import {StoreService, Action} from '@app/store';
import {tap, take} from 'rxjs/operators';
import {of} from 'rxjs';
import {UserRestService} from '@app/rest';

export interface LoginComponentData {
  username: string;
  password: string;
}

@Injectable({providedIn: 'root'})
export class LoginComponentService {
  constructor(
    private _router: Router,
    private _userRestService: UserRestService,
    private _store: StoreService
  ) {
    this._subscribeToLogin();
  }

  /** Valida o usuário logado e redireciona-o se for o caso */
  login(data: LoginComponentData) {
    this._userRestService
      .getUserByUsername(data.username)
      .subscribe((user: User) =>
        user
          ? this._store.dispatch(new Action('SET_LOGGED_USER', {...user}))
          : null
      );
  }

  checkLogin() {
    this._store
      .select('loginState.isLoggedIn')
      .pipe(
        tap((isLoggedIn: boolean) => {
          if (isLoggedIn) {
            this._router.navigate(['/app']);
          } else {
            this._router.navigate(['/login']);
          }
        }),
        take(1)
      )
      .subscribe();
  }

  private _subscribeToLogin() {
    this._store
      .select('loginState.isLoggedIn')
      .pipe(
        tap((isLoggedIn: boolean) => {
          if (isLoggedIn) {
            this._router.navigate(['/app']);
          } else {
            this._router.navigate(['/login']);
          }
        })
      )
      .subscribe();
  }
}
