import { createAction, props } from '@ngrx/store';
import { Assessment } from '../../models/assessment';

export const getAssessments = createAction('[Assessments] Get assessments');
export const getAssessmentsSuccess = createAction(
  '[Assessments] Get assessments success',
  props<{ assessments: Assessment[] }>()
);
export const getAssessmentsFailure = createAction(
  '[Assessments] Get assessments failure',
  props<{ error: any }>()
);
