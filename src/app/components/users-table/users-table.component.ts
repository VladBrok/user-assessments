import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input } from '@angular/core';
import { User } from '../../core/models/user';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
  selection = new SelectionModel<User>(true, []);
  displayedColumns: (keyof User | 'select')[] = [
    'select',
    'name',
    'lastName',
    'dateOfBirth',
    'education',
    'role',
    'position',
  ];
  @Input() users: User[] = [];

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.users.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.users.forEach((row) => this.selection.select(row));
  }
}
