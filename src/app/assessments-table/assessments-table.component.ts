import { Component, Input } from '@angular/core';
import { Assessment } from '../models/assessment';

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
}
