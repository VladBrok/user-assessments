import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from '../../models/user';

export const userFeatureKey = 'user';

export interface UserState {
  isLoading: boolean;
  error: any;
  users: User[];
}

export const initialState: UserState = {
  isLoading: false,
  error: null,
  users: [],
};

export const usersReducer = createReducer(
  initialState,
  on(
    UserActions.getUsers,
    (state): UserState => ({ ...state, isLoading: true })
  ),
  on(
    UserActions.getUsersSuccess,
    (state, { users }): UserState => ({
      ...state,
      isLoading: false,
      error: null,
      users,
    })
  ),
  on(
    UserActions.getUsersFailure,
    (state, { error }): UserState => ({
      ...state,
      isLoading: false,
      error,
    })
  )
);
