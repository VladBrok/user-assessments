import { Component, Input } from '@angular/core';
import { User } from '../../core/models/user';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
  displayedColumns: (keyof User)[] = [
    'name',
    'lastName',
    'dateOfBirth',
    'education',
    'role',
    'position',
  ];
  @Input() users: User[] = [];
}
