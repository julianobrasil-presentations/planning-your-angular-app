import {Component} from '@angular/core';
import {UserRestService} from '@app/rest';
import {switchMap} from 'rxjs/operators';
import {User} from '@app/model';

import * as data from '../assets/db/db.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'example-app';

  constructor() {
    this._loadFromFileToDB();
  }

  private _loadFromFileToDB() {
    // tslint:disable-next-line: no-string-literal
    localStorage.setItem('db', JSON.stringify(data['default']));
  }
}
