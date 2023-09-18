import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assessment } from '../../models/assessment';
import { environment as env } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  constructor(private readonly http: HttpClient) {}

  getAssessments() {
    return this.http.get<Assessment[]>(`${env.apiUrl}/userassessments`);
  }
}
