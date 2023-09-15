import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { environment as env } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(`${env.apiUrl}/users`);
  }
}
