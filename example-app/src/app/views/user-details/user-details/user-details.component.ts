import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';

import {UserDetailsComponentService} from './user-details-component.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {map, switchMap, tap, takeUntil} from 'rxjs/operators';
import {BehaviorSubject, Subject} from 'rxjs';
import {User} from '@app/model';

import {} from 'rxjs/operators';
import {UserPresentationComponentData} from '../presentation/user-presentation/user-presentation-component.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsComponent implements OnDestroy {
  _user$: BehaviorSubject<UserPresentationComponentData> = new BehaviorSubject<
    UserPresentationComponentData
  >(null);

  /** Teardown observables subscriptions */
  private _destroy$: Subject<void> = new Subject<void>();

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
          .pipe(
            map((user: User) => ({user})),
            takeUntil(this._destroy$)
          )
          .subscribe(this._user$);
      });
  }

  ngOnDestroy() {
    if (this._destroy$ && !this._destroy$.closed) {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }

  _userChanged(user: User) {
    this._componentService.saveUser(user);
  }
}
