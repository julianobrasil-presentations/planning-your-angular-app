import {Component, OnDestroy, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, Subject} from 'rxjs';
import {
  map,
  shareReplay,
  takeUntil,
  delay,
  filter,
  distinctUntilChanged
} from 'rxjs/operators';
import {User} from '@app/model';
import {ShellComponentService} from './shell-component.service';
import {MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnDestroy {
  @ViewChild(MatMenuTrigger, {static: false}) _menuTrigger: MatMenuTrigger;

  _user$: Observable<User | null>;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  /** Teardown observables subscriptions */
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _componentService: ShellComponentService,
    private breakpointObserver: BreakpointObserver
  ) {
    this._user$ = this._componentService
      .getLoggedUser$()
      .pipe(takeUntil(this._destroy$));

    this._user$
      .pipe(
        filter(Boolean),
        distinctUntilChanged(
          (prev: User, current: User) =>
            prev && current && prev.id === current.id
        ),
        takeUntil(this._destroy$)
      )
      .subscribe((user: User) => {});
  }

  ngOnDestroy() {
    if (this._destroy$ && !this._destroy$.closed) {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }

  _logoff() {
    this._componentService.logoff();
  }
}
