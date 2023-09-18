import { Injectable } from '@angular/core';
import { Graph } from '../../models/graph';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  constructor(private readonly http: HttpClient) {}

  getGraph(assessmentId: string) {
    return this.http.get<Graph>(`${env.apiUrl}/userassessments/graph`, {
      params: new HttpParams().set('id', assessmentId),
    });
  }
}
