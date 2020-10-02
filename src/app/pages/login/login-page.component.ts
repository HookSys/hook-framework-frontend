import { ApplicationStore } from './../../store/application.store';
import { StorageService } from '../../services/storage.service';
import { Component, AfterViewInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition, query, stagger, keyframes } from '@angular/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { tap, map, timeout, finalize, catchError } from 'rxjs/operators'

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
    private authService: AuthService,
    private applicationStore: ApplicationStore,
    private storageService: StorageService
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
    this.authService.auth(
      this.form.get('username').value,
      this.form.get('password').value
    ).pipe(
      tap((token) => this.storageService.save('AUTH', token)),
    ).subscribe(() => {
      setTimeout(() => this.authService.me().pipe(
        finalize(() => this.isLoading = false),
      ).subscribe((user) => {
        this.applicationStore.user = user;
        this.storageService.save('USER', user)
        this.animation = 'step2';
      }))
    }, () => {
      this.message = 'Credenciais incorretas.';
      this.isLoading = false;
    });
  }

}
