import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment as env } from '../../environments/environment';
import { finalize } from 'rxjs';
import { Graph } from '../models/graph';

// TODO: handle case when graph with id not found

@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrls: ['./graph-page.component.css'],
})
export class GraphPageComponent {
  assessmentId: string = '';
  isLoading = false;
  graphData: Graph | null = null;
  loadingError: any = null;
  graphOptions = {
    responsive: true,
  };
  graphLabels: string[] = ['Agreeableness', 'Drive', 'Luck', 'Openness'];
  graphDataFormatted: any[] = [
    {
      data: [],
      label: 'Value',
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
      ],
    },
  ];

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe((params) => {
      this.assessmentId = params['id'];

      if (!this.assessmentId) {
        return;
      }

      this.isLoading = true;

      this.http
        .get<Graph>(`${env.apiUrl}/userassessments/graph`, {
          params: new HttpParams().set('id', this.assessmentId),
        })
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (result) => {
            if (!result || typeof result !== 'object') {
              return;
            }

            this.graphData = result;
            this.graphDataFormatted[0].data = Object.values(
              this.graphData.data
            );
            this.loadingError = null;
          },
          error: (e) => {
            console.error(e);
            this.loadingError = e;
          },
        });
    });
  }
}
