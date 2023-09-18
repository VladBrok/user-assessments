import { createReducer, on } from '@ngrx/store';
import * as AssessmentActions from './assessment.actions';
import { Assessment } from '../../models/assessment';

export const assessmentFeatureKey = 'assessment';

export interface AssessmentState {
  isLoading: boolean;
  error: any;
  assessments: Assessment[];
}

export const initialState: AssessmentState = {
  isLoading: false,
  error: null,
  assessments: [],
};

export const assessmentsReducer = createReducer(
  initialState,
  on(
    AssessmentActions.getAssessments,
    (state): AssessmentState => ({ ...state, isLoading: true })
  ),
  on(
    AssessmentActions.getAssessmentsSuccess,
    (state, { assessments }): AssessmentState => ({
      ...state,
      isLoading: false,
      error: null,
      assessments,
    })
  ),
  on(
    AssessmentActions.getAssessmentsFailure,
    (state, { error }): AssessmentState => ({
      ...state,
      isLoading: false,
      error,
    })
  )
);
