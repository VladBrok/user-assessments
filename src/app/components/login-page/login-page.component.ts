import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  isLoading = false;
  authError: any = null;
  loginForm = this.fb.group({
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [null, Validators.required],
  });

  constructor(private router: Router, private auth: AuthService) {}

  onSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }

    this.isLoading = true;

    this.auth
      .login({
        email: this.loginForm.value.email || '',
        password: this.loginForm.value.password || '',
      })
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.authError = null;
          this.router.navigate(['/dashboard']);
        },
        error: (e) => {
          console.error(e);
          this.authError = e;
        },
      });
  }
}
