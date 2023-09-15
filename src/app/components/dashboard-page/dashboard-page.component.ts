import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Assessment } from '../../core/models/assessment';
import { AssessmentService } from '../../core/services/assessment/assessment.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  isLoading = false;
  assessments: Assessment[] = [];
  loadingError: any = null;

  constructor(private readonly assessmentService: AssessmentService) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.assessmentService
      .getAssessments()
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
