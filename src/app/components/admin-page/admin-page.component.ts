import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectAreUsersLoading,
  selectGetUsersError,
  selectUsers,
} from '../../core/store/user/user.selectors';
import { getUsers } from '../../core/store/user/user.actions';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  isLoading$ = this.store.select(selectAreUsersLoading);
  users$ = this.store.select(selectUsers);
  loadingError$ = this.store.select(selectGetUsersError);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getUsers());
  }
}
