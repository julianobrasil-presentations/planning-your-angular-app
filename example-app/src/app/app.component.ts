import {Component} from '@angular/core';
import {UserRestService} from '@app/rest';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'example-app';

  constructor(private _userRest: UserRestService) {
    this._userRest.getPagedUsers()
        .subscribe(console.log);
  }
}
