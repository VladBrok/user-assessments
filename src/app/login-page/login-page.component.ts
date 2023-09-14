import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginRequest } from '../../models/login-request';
import { Subject, finalize } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  isLoading = new Subject<boolean>();
  loginForm = this.fb.group({
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [null, Validators.required],
  });

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }

    const body: LoginRequest = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };

    this.isLoading.next(true);

    this.http
      .post(`${env.apiUrl}/login`, body)
      .pipe(finalize(() => this.isLoading.next(false)))
      .subscribe({
        next: () => console.log('next'),
        error: (e) => console.log('error', e),
      });
  }
}
