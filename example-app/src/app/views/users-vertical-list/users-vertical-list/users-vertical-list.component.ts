import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';

import {UsersVerticalListComponentService} from './users-vertical-list-component.service';
import {Observable, Subject} from 'rxjs';
import {User} from '@app/model';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-users-vertical-list',
  templateUrl: './users-vertical-list.component.html',
  styleUrls: ['./users-vertical-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersVerticalListComponent implements OnDestroy {
  users$: Observable<{
    [key: number]: User;
  }>;

  /** Teardown observables subscriptions */
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _componentService: UsersVerticalListComponentService) {
    this._componentService.grabUsersFromTheServer();
    this.users$ = this._componentService
      .findAllUsers$()
      .pipe(takeUntil(this._destroy$));
  }

  ngOnDestroy() {
    if (this._destroy$ && !this._destroy$.closed) {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }

  userSelectionHandler(user: User) {
    this._componentService.setSelectedUser(user);
  }
}
