import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'example-app';

  constructor(private _http: HttpClient) {
    this._http.get<any>('http://my-json-server.typicode.com/julianobrasil-presentations/planning-your-angular-app/users')
        .subscribe(console.log);
  }
}
