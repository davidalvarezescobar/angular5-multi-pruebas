import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-fund-chart',
  templateUrl: './fund-chart.component.html',
  styleUrls: ['./fund-chart.component.scss']
})
export class FundChartComponent implements OnInit {
  @Input() fundId: string = 'F0GBR04J7S'; // ID del fondo por defecto

  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: []
  };
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          callback: function (value, index, ticks) {
            const date = new Date(this.getLabelForValue(+value));
            const year = date.getFullYear();
            const prevYear = index > 0 ? new Date(this.getLabelForValue(+ticks[index - 1].value)).getFullYear() : null;
            return index === 0 || year !== prevYear ? year : '';
          }
        }
      },
      y: {
        beginAtZero: false
      }
    }
  };
  public lineChartType: ChartType = 'line';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>(`http://localhost:3000/api/fund/${this.fundId}`)
      .subscribe(data => {
        const values = data.graphData.fund;

        // Filtrar datos a partir de 2020
        const filteredValues = values.filter((p: any) => new Date(p.date) >= new Date('2020-01-01'));

        this.lineChartData = {
          labels: filteredValues.map((p: any) => p.date),
          datasets: [
            {
              data: filteredValues.map((p: any) => p.value),
              label: 'Rentabilidad del fondo',
              tension: 0.1,
              fill: true,
              borderColor: 'blue',
              pointRadius: 0
            }
          ]
        };
      });
  }
}
