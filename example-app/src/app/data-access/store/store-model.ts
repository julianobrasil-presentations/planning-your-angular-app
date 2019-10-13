import {User} from '@app/model';

export interface LoginState {
  loggedUser: User;
  isLoggedIn: boolean;
}

export interface StoreShape {
  loginState?: LoginState;
  selectedUserId?: number;
  entities: {
    users: {[key: number]: User};
  };
}

export const init: StoreShape = {
  loginState: {
    loggedUser: null,
    isLoggedIn: false
  },
  selectedUserId: null,
  entities: {
    users: {}
  }
};
