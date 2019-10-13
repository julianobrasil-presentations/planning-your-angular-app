import {Component} from '@angular/core';
import {UserRestService} from '@app/rest';
import {pipe} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {User} from '@app/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'example-app';

  constructor(private _userRest: UserRestService) {
    this._userRest.getPagedUsers(null, 0, 1)
      .subscribe(console.log);

    this._userRest.getUser(1)
      .pipe(switchMap((u: User) => {
        u.lastName = 'aeiou';
        return this._userRest.modifyUser(u);
      }))
      .subscribe();
  }
}
