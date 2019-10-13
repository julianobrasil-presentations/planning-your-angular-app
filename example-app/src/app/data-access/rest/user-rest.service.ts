import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';

import {User} from '@app/model';
import {Page} from './rest-model';

@Injectable({providedIn: 'root'})
export class UserRestService {

  getAllUsers(partOfName?: string): Observable<User[]> {
    let users: User[] = this._loadUsersFromLocalStorage();
    if (partOfName) {
      users = users.filter((u: User) => u.name.toUpperCase()
        .includes(partOfName.toLocaleUpperCase()));
    }

    return of(users).pipe(delay(randomDelay()));
  }

  getUser(id: number): Observable<User> {
    const user: User = this._loadUsersFromLocalStorage().find((u: User) => u.id === id);

    return of(user).pipe(delay(randomDelay()));
  }

  getPagedUsers(partOfName = '', page = 0, size = 10): Observable<Page<User>> {
    let users: User[] = this._loadUsersFromLocalStorage();

    users = users.filter((u: User) => u.name.toUpperCase().includes(partOfName ? partOfName.toUpperCase() : ''));

    const totalElements = users.length;

    users = users.slice(page * size, page * size + size);

    const rPage: Page<User> = {
      content: users,
      totalElements,
    };

    return of(rPage).pipe(delay(randomDelay()));
  }

  modifyUser(user: User): Observable<User> {
    const users: User[] = this._loadUsersFromLocalStorage();

    const index = users.findIndex((u: User) => u.id === user.id);

    if (index > -1) {
      users.splice(index, 1, user);
    }

    this._saveUsersToLocalStorage(users);

    return of(user).pipe(delay(randomDelay()));
  }

  removeUser(user: User): Observable<User> {
    const users: User[] = this._loadUsersFromLocalStorage();

    const index = users.findIndex((u: User) => u.id === user.id);

    if (index > -1) {
      users.splice(index, 1);
    }

    this._saveUsersToLocalStorage(users);

    return of(user).pipe(delay(randomDelay()));
  }

  private _loadUsersFromLocalStorage(): User[] {
    return JSON.parse(localStorage.getItem('db')).users as User[];
  }

  private _saveUsersToLocalStorage(users: User[]): void {
    const data = JSON.parse(localStorage.getItem('db'));
    data.users = users;
    localStorage.removeItem('db');
    localStorage.setItem('db', JSON.stringify(data));
  }
}

function randomDelay(): number {
  return Math.random() * 1000;
}
