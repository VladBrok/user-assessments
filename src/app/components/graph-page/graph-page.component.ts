import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectGetGraphError,
  selectGraphDisplayData,
  selectIsGraphLoading,
} from '../../core/store/graph/graph.selectors';
import { getGraph } from '../../core/store/graph/graph.actions';

@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrls: ['./graph-page.component.scss'],
})
export class GraphPageComponent implements OnInit {
  assessmentId = '';
  isLoading$ = this.store.select(selectIsGraphLoading);
  loadingError$ = this.store.select(selectGetGraphError);
  displayData$ = this.store.select(selectGraphDisplayData);

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.assessmentId = this.route.snapshot.queryParams['id'];

    if (!this.assessmentId) {
      return;
    }

    this.store.dispatch(getGraph({ id: this.assessmentId }));
  }
}
