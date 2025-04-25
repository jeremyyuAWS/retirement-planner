export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
  }[];
}

export type ChartType = 'line' | 'bar' | 'pie' | 'scatter' | 'area'; 