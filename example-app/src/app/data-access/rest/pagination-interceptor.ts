import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpEventType} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Page} from './rest-model/page';
import {UrlApi} from './url-api.service';

@Injectable({providedIn: 'root'})
export class PaginationInterceptor implements HttpInterceptor {
  constructor(private _url: UrlApi) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(map((evt: HttpEvent<any>) => {
      if (evt.type === HttpEventType.Response) {
        if (evt.headers.get('link')) {
          let body: Page<any> = {
            content: evt.body
          };

          // first
          const first: number | null = this.getPage(evt.headers.get('link'), 'first');
          if (first) {
            body = {
              ...body,
              first: first - 1,
            };
          }

          // last
          const last: number | null = this.getPage(evt.headers.get('link'), 'last');
          if (last) {
            body = {
              ...body,
              last: last - 1,
            };
          }

          // next
          const nextPage: number | null = this.getPage(evt.headers.get('link'), 'next');
          if (nextPage) {
            body = {
              ...body,
              next: nextPage - 1,
            };
          }

          // prev
          const prev: number | null = this.getPage(evt.headers.get('link'), 'prev');
          if (prev) {
            body = {
              ...body,
              prev: prev - 1,
            };
          }

          return evt.clone({
            body
          });
        }

        return evt;
      }
    }));
  }

  private getPage(link: string, key: string): number | null {
    const index = link.indexOf(`rel="${key}"`);
    if (index < 0) {
      return null;
    }
    const startIndex = link.lastIndexOf(this._url.PAGE, index);
    const endIndex = link.indexOf(this._url.SIZE, startIndex);
    const slice = link.substring(startIndex, endIndex);
    link = slice.split('&')[0].split(`${this._url.PAGE}=`)[1];
    return +link;
  }
}
