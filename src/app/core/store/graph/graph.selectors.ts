import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GraphState, graphFeatureKey } from './graph.reducer';

export const selectGraphState =
  createFeatureSelector<GraphState>(graphFeatureKey);

export const selectIsGraphLoading = createSelector(
  selectGraphState,
  (state) => state.isLoading
);

export const selectGetGraphError = createSelector(
  selectGraphState,
  (state) => state.error
);

export const selectGraphDisplayData = createSelector(
  selectGraphState,
  ({ graph }) =>
    graph
      ? {
          graph,
          labels: ['Agreeableness', 'Drive', 'Luck', 'Openness'],
          dataset: {
            data: [
              graph?.data.agreeableness,
              graph?.data.drive,
              graph?.data.luck,
              graph?.data.openness,
            ],
            label: 'Value',
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
            ],
          },
          options: {
            responsive: true,
          },
        }
      : undefined
);
