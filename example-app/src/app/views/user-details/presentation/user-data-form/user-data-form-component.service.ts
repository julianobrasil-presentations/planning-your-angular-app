import {Injectable} from '@angular/core';
import {User} from '@app/model';

export interface UserDataFormComponentData {
  user: User;
}

@Injectable({providedIn: 'root'})
export class UserDataFormComponentService {}
