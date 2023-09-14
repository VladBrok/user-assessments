import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrls: ['./graph-page.component.css'],
})
export class GraphPageComponent {
  graphId: string = '';

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.graphId = params['id'];
    });
  }
}
