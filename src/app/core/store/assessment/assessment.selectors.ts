import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AssessmentState, assessmentFeatureKey } from './assessment.reducer';

export const selectAssessmentState =
  createFeatureSelector<AssessmentState>(assessmentFeatureKey);

export const selectAreAssessmentsLoading = createSelector(
  selectAssessmentState,
  (state) => state.isLoading
);

export const selectGetAssessmentsError = createSelector(
  selectAssessmentState,
  (state) => state.error
);

export const selectAssessments = createSelector(
  selectAssessmentState,
  (state) => state.assessments
);
