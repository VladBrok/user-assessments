import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  login(data: LoginRequest) {
    return this.http.post<LoginResponse>(`${env.apiUrl}/login`, data).pipe(
      map((res) => {
        this.setCookie('token', res.token);
        this.setCookie('role', res.role);
        this.setCookie('first_name', res.first_name);
        this.setCookie('last_name', res.last_name);
      })
    );
  }

  logout() {
    this.cookieService.delete('token');
    this.cookieService.delete('role');
    this.cookieService.delete('first_name');
    this.cookieService.delete('last_name');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return Boolean(this.cookieService.get('token'));
  }

  isUser() {
    return this.cookieService.get('role') === 'User';
  }

  isAdmin() {
    return this.cookieService.get('role') === 'Admin';
  }

  private setCookie(key: string, value: string) {
    this.cookieService.set(
      key,
      value,
      undefined,
      undefined,
      undefined,
      true,
      'Strict'
    );
  }
}
