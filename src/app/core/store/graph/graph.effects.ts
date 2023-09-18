import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as GraphActions from './graph.actions';
import { catchError, map, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GraphService } from '../../services/graph/graph.service';
import { Graph } from '../../models/graph';

@Injectable()
export class GraphEffects {
  getGraph$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GraphActions.getGraph),
      exhaustMap(({ id: assessmentId }) => {
        return this.graphService.getGraph(assessmentId).pipe(
          map((graph) => {
            let result: Graph | undefined = graph;

            if (!graph || typeof graph !== 'object') {
              result = undefined;
            }

            return GraphActions.getGraphSuccess({
              graph: result,
            });
          }),
          catchError((error) => of(GraphActions.getGraphFailure({ error })))
        );
      })
    );
  });

  constructor(private actions$: Actions, private graphService: GraphService) {}
}
