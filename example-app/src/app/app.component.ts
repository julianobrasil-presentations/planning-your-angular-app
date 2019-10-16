import {Component} from '@angular/core';
import {UserRestService} from '@app/rest';
import {switchMap} from 'rxjs/operators';
import {User} from '@app/model';

import * as data from '../assets/db/db.json';
import {AppComponentService} from './app-component.service.js';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'example-app';

  constructor(
    private _componentService: AppComponentService,
    private _httpClient: HttpClient
  ) {
    this._loadFromFileToDB();
    this._componentService.login();
  }

  private _loadFromFileToDB() {
    // 2ed08f4c2a03419a3c96d72aedccbf
    const url = 'https://uifaces.co/api?limit=12';
    const headers = new HttpHeaders().set(
      'X-API-KEY',
      '2ed08f4c2a03419a3c96d72aedccbf'
    );
    this._httpClient.get<any>(url, {headers}).subscribe((users: any) => {
      // tslint:disable-next-line: no-string-literal
      const dataFromFile: any = data['default'];

      dataFromFile.users.map(
        (u: User, index: number) => (u.photo = users[index].photo)
      );
      localStorage.setItem('db', JSON.stringify(dataFromFile));
    });
  }
}
