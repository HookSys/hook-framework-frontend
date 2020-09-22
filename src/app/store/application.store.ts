import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class ApplicationStore {
  private readonly _user = new BehaviorSubject<User>(({} as User));
  readonly user$ = this._user.asObservable();

  get user(): User {
    return this._user.getValue();
  }
  set user(u: User) {
    this._user.next(u);
  }
}
