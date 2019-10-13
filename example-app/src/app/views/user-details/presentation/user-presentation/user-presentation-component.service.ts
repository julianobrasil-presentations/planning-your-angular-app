import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {User} from '@app/model';

import {map, tap} from 'rxjs/operators';

export interface UserPresentationComponentData {
  user: User;
}

@Injectable({providedIn: 'root'})
export class UserPresentationComponentService {
  constructor(private _httpClient: HttpClient) {}

  grabRandomPhoto$() {
    const url = 'https://randomuser.me/api/?inc=picture';
    const headers = new HttpHeaders().set(
      'X-API-KEY',
      '2ed08f4c2a03419a3c96d72aedccbf'
    );

    return this._httpClient.get<any>(url, {headers}).pipe(
      map((u: any) => u.results[0].picture.large)
    );
  }
}
