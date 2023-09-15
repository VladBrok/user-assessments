import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, finalize } from 'rxjs';
import { Assessment } from '../../core/models/assessment';
import { AssessmentService } from '../../core/services/assessment/assessment.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  isLoading = false;
  assessments: Assessment[] = [];
  loadingError: any = null;
  assessmentSub!: Subscription;

  constructor(private readonly assessmentService: AssessmentService) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.assessmentSub = this.assessmentService
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

  ngOnDestroy(): void {
    this.assessmentSub.unsubscribe();
  }
}
