export interface Graph {
  data: GraphData;
  type: string;
}

export interface GraphData {
  agreeableness: number;
  drive: number;
  luck: number;
  openness: number;
}
