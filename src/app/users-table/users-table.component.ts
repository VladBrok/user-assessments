import { Component, Input } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
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
