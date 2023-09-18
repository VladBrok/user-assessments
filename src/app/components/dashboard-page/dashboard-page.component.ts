import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectAreAssessmentsLoading,
  selectAssessments,
  selectGetAssessmentsError,
} from '../../core/store/assessment/assessment.selectors';
import { getAssessments } from '../../core/store/assessment/assessment.actions';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  isLoading$ = this.store.select(selectAreAssessmentsLoading);
  assessments$ = this.store.select(selectAssessments);
  loadingError$ = this.store.select(selectGetAssessmentsError);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getAssessments());
  }
}
