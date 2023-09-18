import { createReducer, on } from '@ngrx/store';
import * as GraphActions from './graph.actions';
import { Graph } from '../../models/graph';

export const graphFeatureKey = 'graph';

export interface GraphState {
  isLoading: boolean;
  error: any;
  graph?: Graph;
}

export const initialState: GraphState = {
  isLoading: false,
  error: null,
};

export const graphReducer = createReducer(
  initialState,
  on(
    GraphActions.getGraph,
    (state): GraphState => ({ ...state, isLoading: true })
  ),
  on(
    GraphActions.getGraphSuccess,
    (state, { graph }): GraphState => ({
      ...state,
      isLoading: false,
      error: null,
      graph,
    })
  ),
  on(
    GraphActions.getGraphFailure,
    (state, { error }): GraphState => ({
      ...state,
      isLoading: false,
      error,
    })
  )
);
