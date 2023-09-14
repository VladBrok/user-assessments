import { Component, Input } from '@angular/core';
import { Assessment } from '../models/assessment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessments-table',
  templateUrl: './assessments-table.component.html',
  styleUrls: ['./assessments-table.component.css'],
})
export class AssessmentsTableComponent {
  displayedColumns: (keyof Assessment)[] = [
    'id',
    'name',
    'users_resolved',
    'active',
    'image_url',
  ];
  @Input() assessments: Assessment[] = [];

  constructor(private router: Router) {}

  onRowClick(row: Assessment) {
    this.router.navigate(['/graph'], { queryParams: { id: row.id } });
  }
}
