import { createAction, props } from '@ngrx/store';
import { LoginRequest } from '../../models/login-request';

export const login = createAction('[Auth] Login', props<LoginRequest>());
export const loginSuccess = createAction('[Auth] Login success');
export const loginFailure = createAction(
  '[Auth] Login failure',
  props<{ error: any }>()
);
