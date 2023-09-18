import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  isLoading: boolean;
  error: any;
}

export const initialState: AuthState = {
  isLoading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state): AuthState => ({ ...state, isLoading: true })),
  on(
    AuthActions.loginSuccess,
    (state): AuthState => ({
      ...state,
      isLoading: false,
      error: null,
    })
  ),
  on(
    AuthActions.loginFailure,
    (state, { error }): AuthState => ({
      ...state,
      isLoading: false,
      error,
    })
  )
);
