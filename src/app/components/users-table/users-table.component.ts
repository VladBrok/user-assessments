import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input } from '@angular/core';
import { User } from '../../core/models/user';
import { downloadCsv } from '../../core/utils/downloadCsv';

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

  onExport() {
    const toDownload = this.selection.selected.length
      ? this.selection.selected
      : this.users;

    downloadCsv(
      [
        {
          fieldName: 'name',
          displayName: 'Name',
        },
        {
          fieldName: 'lastName',
          displayName: 'Last name',
        },
        {
          fieldName: 'dateOfBirth',
          displayName: 'Birthday',
        },
        {
          fieldName: 'education',
          displayName: 'Education',
        },
        {
          fieldName: 'role',
          displayName: 'Role',
        },
        {
          fieldName: 'position',
          displayName: 'Position',
        },
      ],
      toDownload,
      'users.csv'
    );
  }
}
