import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { Assessment } from '../../core/models/assessment';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent {
  isLoading = false;
  assessments: Assessment[] = [];
  loadingError: any = null;

  constructor(private http: HttpClient) {
    this.isLoading = true;

    this.http
      .get<Assessment[]>(`${env.apiUrl}/userassessments`)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (result) => {
          this.assessments = result;
          this.loadingError = null;
        },
        error: (e) => {
          console.error(e);
          this.loadingError = e;
        },
      });
  }
}
