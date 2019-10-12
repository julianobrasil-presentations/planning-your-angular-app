import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class UrlApi {

  readonly PAGE = '_page';
  readonly SIZE = '_limit';

  private readonly _baseUrl = 'https://my-json-server.typicode.com/julianobrasil-presentations/planning-your-angular-app';

  private readonly _usersBaseUrl = `${this._baseUrl}/users`;
  readonly allUsers = this._usersBaseUrl;
}
