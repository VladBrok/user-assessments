import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AssessmentActions from './assessment.actions';
import { catchError, map, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AssessmentService } from '../../services/assessment/assessment.service';

@Injectable()
export class AssessmentEffects {
  getAssessments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AssessmentActions.getAssessments),
      exhaustMap(() =>
        this.assessmentService.getAssessments().pipe(
          map((assessments) =>
            AssessmentActions.getAssessmentsSuccess({ assessments })
          ),
          catchError((error) =>
            of(AssessmentActions.getAssessmentsFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private assessmentService: AssessmentService
  ) {}
}
