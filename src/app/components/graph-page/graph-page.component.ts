import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { Graph } from '../../core/models/graph';
import { GraphService } from '../../core/services/graph/graph.service';

@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrls: ['./graph-page.component.scss'],
})
export class GraphPageComponent implements OnInit, OnDestroy {
  assessmentId = '';
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
  graphSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private readonly graphService: GraphService
  ) {}

  ngOnInit(): void {
    this.assessmentId = this.route.snapshot.queryParams['id'];

    if (!this.assessmentId) {
      return;
    }

    this.isLoading = true;

    this.graphSub = this.graphService
      .getGraph(this.assessmentId)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (result) => {
          if (!result || typeof result !== 'object') {
            return;
          }

          this.graphData = result;
          this.graphDataFormatted[0].data = Object.values(this.graphData.data);
          this.loadingError = null;
        },
        error: (e) => {
          console.error(e);
          this.loadingError = e;
        },
      });
  }

  ngOnDestroy(): void {
    this.graphSub.unsubscribe();
  }
}
