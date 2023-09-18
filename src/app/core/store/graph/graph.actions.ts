import { createAction, props } from '@ngrx/store';
import { Graph } from '../../models/graph';

export const getGraph = createAction(
  '[Graph] Get graph',
  props<{ id: string }>()
);
export const getGraphSuccess = createAction(
  '[Graph] Get graph success',
  props<{ graph?: Graph }>()
);
export const getGraphFailure = createAction(
  '[Graph] Get graph failure',
  props<{ error: any }>()
);
