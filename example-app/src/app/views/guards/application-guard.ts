import {Injectable} from '@angular/core';
import {
  CanLoad,
  Route,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import {Observable} from 'rxjs';
import {StoreService} from '@app/store';
import {map, take, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ApplicationGuard implements CanLoad, CanActivate {
  constructor(private _router: Router, private _store: StoreService) {}

  canLoad(route: Route) {
    return this._store.select('loginState.isLoggedIn').pipe(
      tap((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this._router.navigate(['/login']);
        }
      }),
      take(1)
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this._store.select('loginState.isLoggedIn').pipe(
      map((isLoggedIn: boolean) =>
        isLoggedIn ? true : this._router.parseUrl('/login')
      ),
      take(1)
    );
  }
}
