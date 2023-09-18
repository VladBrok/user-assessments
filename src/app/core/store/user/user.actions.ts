import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user';

export const getUsers = createAction('[Users] Get users');
export const getUsersSuccess = createAction(
  '[Users] Get users success',
  props<{ users: User[] }>()
);
export const getUsersFailure = createAction(
  '[Users] Get users failure',
  props<{ error: any }>()
);
