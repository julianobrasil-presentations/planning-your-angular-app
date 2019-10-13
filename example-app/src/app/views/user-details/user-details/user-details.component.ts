import {
  ChangeDetectionStrategy,
  Component} from '@angular/core';

import {UserDetailsComponentService} from './user-details-component.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {map, switchMap, tap} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {User} from '@app/model';

import {} from 'rxjs/operators';
import {UserPresentationComponentData} from '../presentation/user-presentation/user-presentation-component.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsComponent {
  _user$: BehaviorSubject<UserPresentationComponentData> = new BehaviorSubject<
    UserPresentationComponentData
  >(null);


  constructor(
    private _componentService: UserDetailsComponentService,
    private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.paramMap
      .pipe(
        map((param: ParamMap) => param.get('id')),
        switchMap((id: string) => this._componentService.getUserById$(id)),
        map((user: User) => ({user}))
      )
      .subscribe((userAvatarComponentData: UserPresentationComponentData) => {
        this._user$.next(userAvatarComponentData);

        this._componentService
          .getUserByIdForever$('' + userAvatarComponentData.user.id)
          .pipe(map((user: User) => ({user})))
          .subscribe(this._user$);
      });
  }

  _userChanged(user: User) {
    this._componentService.saveUser(user);
  }
}
