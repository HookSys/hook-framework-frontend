import {  Store } from '@ngxs/store';
import { Component, AfterViewInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators'
import { Login } from 'view-engine/store/auth/auth.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  animations: [
    trigger('login', [
      state('step0', style({ opacity: 0 })),
      state('step1', style({ opacity: 1 })),
      state('step2', style({ bottom: '-200px', position: 'absolute', opacity: 0  })),
      transition('step0 => step1', animate('200ms ease-in')),
      transition('step1 => step2', animate('1000ms ease-in-out'))
    ])
  ]
})
export class LoginPageComponent implements AfterViewInit {
  @Output('success')
  success: EventEmitter<boolean> = new EventEmitter();

  public animation = 'step0';
  public isLoading = false;
  public message = null;

  public form: FormGroup;

  constructor(
    private elementRef: ElementRef,
    private store: Store,
  ) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  public ngAfterViewInit(): void {
    setTimeout(() => this.animation = 'step1', 1000);
  }

  public onAnimationDone(): void {
    switch (this.animation) {
      case 'step1':
        this.elementRef.nativeElement.querySelector('#username').focus();
      break;
      case 'step2':
        this.success.emit();
      break;
    }
  }

  public login(): void {
    this.isLoading = true;
    this.message = null;
    this.store.dispatch(new Login({
      username: this.form.get('username').value,
      password: this.form.get('password').value
    })).pipe(
      finalize(() => this.isLoading = false),
    ).subscribe(() => {
      this.animation = 'step2';
    }, () => {
      this.message = 'Credenciais incorretas.';
    });
  }

}
