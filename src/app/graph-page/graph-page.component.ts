import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment as env } from '../../environments/environment';
import { finalize } from 'rxjs';
import { Graph } from '../models/graph';
// import { ChartOptions, ChartType, ChartDataSets } from 'ng2-charts';

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
  graphDataFormatted: any[] = [{ data: [], label: 'Value' }];

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe((params) => {
      this.assessmentId = params['id'];

      if (!this.assessmentId) {
        return;
      }

      this.http
        .get<Graph>(`${env.apiUrl}/userassessments/graph`, {
          params: new HttpParams().set('id', this.assessmentId),
        })
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (result) => {
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
