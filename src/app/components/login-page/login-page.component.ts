import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../../core/store/auth/auth.actions';
import {
  selectAuthError,
  selectIsAuthLoading,
} from '../../core/store/auth/auth.selectors';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  isLoading$ = this.store.select(selectIsAuthLoading);
  authError$ = this.store.select(selectAuthError);

  private fb = inject(FormBuilder);
  loginForm = this.fb.group({
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [null, Validators.required],
  });

  constructor(private store: Store) {}

  onSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }

    this.store.dispatch(
      login({
        email: this.loginForm.value.email || '',
        password: this.loginForm.value.password || '',
      })
    );
  }
}
