import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, userFeatureKey } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>(userFeatureKey);

export const selectAreUsersLoading = createSelector(
  selectUserState,
  (state) => state.isLoading
);

export const selectGetUsersError = createSelector(
  selectUserState,
  (state) => state.error
);

export const selectUsers = createSelector(
  selectUserState,
  (state) => state.users
);
