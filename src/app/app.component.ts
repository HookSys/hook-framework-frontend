import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Store } from '@ngxs/store';
import { AuthState } from 'view-engine/store/auth/auth.state';
import { Logout } from 'view-engine/store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('false', style({ opacity: 0 })),
      state('true', style({ opacity: 1 })),
      transition('0 => 1', animate('200ms ease-in')),
      transition('1 => 0', animate('200ms ease-out'))
    ]),
    trigger('spotlight', [
      state('false', style({ width: '11%', height: '6%', display: 'none' })),
      state('true', style({ width: '100%', height: '100%', display: 'flex' })),
      transition('0 => 1', animate('100ms ease-in')),
      transition('1 => 0', animate('100ms ease-out'))
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'view-engine';
  logged = false;

  constructor(private store: Store) {}

  ngOnInit() {
    this.logged = this.store.selectSnapshot(AuthState.isAuthenticated);
  }

  onExit() {
    this.store.dispatch(new Logout());
    this.logged = false;
  }

  loginSuccess() {
    this.logged = true;
  }
}
