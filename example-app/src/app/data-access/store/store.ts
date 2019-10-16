import {Injectable} from '@angular/core';

import * as fastDeepEqual from 'fast-deep-equal';
import produce from 'immer';
import {map, distinctUntilChanged, scan, startWith} from 'rxjs/operators';
import {ReplaySubject, pipe, BehaviorSubject} from 'rxjs';
import {Action} from './action';
import {StoreShape, init} from './store-model';
import {User} from '@app/model';

const get = (obj: StoreShape, path: string, defaultValue: any | null) => {
  const result = String.prototype.split
    .call(path, /[.]+?/)
    .filter(Boolean)
    .reduce(
      (res: string, key: string) =>
        res !== null && res !== undefined ? res[key] : res,
      obj
    );

  return result === undefined || result === obj ? defaultValue : result;
};

const slice = (path: string) =>
  pipe(
    map((state: StoreShape) => get(state, path, null)),
    distinctUntilChanged(fastDeepEqual)
  );

const reducer = () =>
  scan<any>((state: any, action: any) => {
    switch (action.type) {
      case 'SET_LOGGED_USER': {
        const newState = produce(state, (draft: any) => {
          draft.loginState.loggedUser = action.payload;
          draft.loginState.isLoggedIn = !!action.payload;
        });

        return newState;
      }

      case 'LOGOUT': {
        const newState = produce(init, (draft: any) => draft);

        return newState;
      }

      case 'UPDATE_USER': {
        const newState = produce(state, (draft: any) => {
          if (action.payload.user.id === draft.loginState.loggedUser.id) {
            draft.loginState.loggedUser = action.payload.user;
          }

          draft.entities.users[action.payload.user.id] = action.payload.user;
        });

        return newState;
      }

      case 'SET_SELECTED_USER_ID': {
        const newState = produce(state, (draft: any) => {
          draft.selectedUserId = action.payload.userId;
        });

        return newState;
      }

      case 'FILL_IN_USERS': {
        const newState = produce(state, (draft: {entities: {users: any}}) => {
          draft.entities.users = action.payload.users.reduce(
            (acc: {[key: number]: User}, u: User) => {
              acc[u.id] = u;
              return acc;
            },
            draft.entities.users ? draft.entities.users : {}
          );
        });

        return newState;
      }
    }
    return state;
  }, produce(init, (draft: any) => draft));

@Injectable({providedIn: 'root'})
export class StoreService {
  private state: ReplaySubject<any> = new ReplaySubject<any>(1);

  private actions: ReplaySubject<Action> = new ReplaySubject<Action>(1);

  constructor() {
    this.actions
      .pipe(
        startWith({type: ''}),
        reducer()
      )
      .subscribe(this.state);
  }

  dispatch = (action: Action) => this.actions.next(action);

  select = (path: string) => this.state.pipe(slice(path));
}
