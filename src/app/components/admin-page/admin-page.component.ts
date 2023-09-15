import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { User } from '../../models/user';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent {
  isLoading = false;
  users: User[] = [];
  loadingError: any = null;

  constructor(private http: HttpClient) {
    this.isLoading = true;

    this.http
      .get<User[]>(`${env.apiUrl}/users`)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (result) => {
          this.users = result;
          this.loadingError = null;
        },
        error: (e) => {
          console.error(e);
          this.loadingError = e;
        },
      });
  }
}
