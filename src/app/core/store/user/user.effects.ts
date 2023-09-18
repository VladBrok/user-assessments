import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UsersActions from './user.actions';
import { catchError, map, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../../services/user/user.service';

@Injectable()
export class UserEffects {
  getUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.getUsers),
      exhaustMap(() =>
        this.userService.getUsers().pipe(
          map((users) => UsersActions.getUsersSuccess({ users })),
          catchError((error) => of(UsersActions.getUsersFailure({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions, private userService: UserService) {}
}
