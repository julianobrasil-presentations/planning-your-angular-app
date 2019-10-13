import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {UrlApi} from './url-api.service';
import {User} from '@app/model';
import {Page} from './rest-model';

@Injectable({providedIn: 'root'})
export class UserRestService {
  constructor(private _url: UrlApi, private _http: HttpClient) {}

  getAllUsers(partOfName: string): Observable<User[]> {
    const url = this._url.allUsers;
    let hasParams = false;
    let params: HttpParams;
    if (partOfName) {
      hasParams = true;
      params = new HttpParams().set('name', partOfName);
    }

    return hasParams ? this._http.get<User[]>(url) : this._http.get<User[]>(url, {params});
  }

  getUser(id: number): Observable<User> {
    const url = `${this._url.allUsers}/${id}`;

    return this._http.get<User>(url);
  }

  getPagedUsers(partOfName?: string, page = 0, size = 10): Observable<Page<User>> {
    const url = this._url.allUsers;

    let params: HttpParams = new HttpParams().set(this._url.PAGE, '' + (page + 1))
      .set(this._url.SIZE, '' + size);
    if (partOfName) {
      params = params.set('name', partOfName);
    }

    return this._http.get<Page<User>>(url, {params});
  }

  modifyUser(user: User): Observable<User> {
    const url = this._url.allUsers + '/' + user.id;

    return this._http.put<User>(url, user);
  }

  removeUser(user: User): Observable<User> {
    const url = this._url.allUsers + '/' + user;

    return this._http.delete<User>(url);
  }
}
