import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

export interface LoginComponentData {
  username: string;
  password: string;
}

@Injectable({providedIn: 'root'})
export class AppComponentService {
  constructor(private _router: Router) {}

  /** Valida o usuário logado e redireciona-o se for o caso */
  login() {
    // verifica se o usuário está logado
    // this._router.navigate(['path_to_your_route']);
  }
}
