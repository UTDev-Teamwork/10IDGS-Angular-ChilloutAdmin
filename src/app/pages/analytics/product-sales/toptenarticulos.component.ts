import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AnalyticsService } from 'src/app/services/analytics-service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-toptenarticulos',
  templateUrl: './toptenarticulos.component.html',
  styleUrls: ['./toptenarticulos.component.scss'],
})
export class ToptenarticulosComponent implements OnInit, AfterViewInit {
  @ViewChild('TopTenChart') canvas: ElementRef;
  public chart: any = [];
  public labels = [];
  public dataValues = [];

  public lastUpdate: String = '00:00:00';

  public today = new Date().toLocaleString();
  matRippleColor: string = '#d36423';

  public titulo = "Top 10 articulos más vendidos hasta el "+ this.today;
  
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(new Date()),
  });

  public datePickerState: boolean = true;
  public loadingChart: boolean = true;

  public toggleVendidos: boolean = true;

  public maxProducts: number = 50;
  public minProducts: number = 1;
  public stepPerProduct: number = 1;
  public quantityProducts: number = 10;

  constructor(private web: AnalyticsService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.updateChart();
  }
  ngAfterViewInit(): void {}

  updateChart() {
    this.loadingChart = true;
    const tempDate = new Date();
    this.lastUpdate =
      tempDate.getHours() +
      ':' +
      tempDate.getMinutes() +
      ':' +
      tempDate.getSeconds();
    this.today = new Date().toLocaleString();

    this.web.getTop10All().subscribe((data) => {
      this.labels = [];
      this.dataValues = [];

      if(data != null){

        data.forEach((element) => {
          this.labels.push(element.codBarras);
          this.dataValues.push(element.cantidad);
        });
  
        var chartExist = Chart.getChart('TopTenChart');
        if (chartExist) chartExist.destroy();
  
        this.getChartData();

      } else {
        this.loadingChart = false;
        this.titulo = "No hay datos para mostrar";
      }
      
    });
  }

  getChartData(): any {
    this.loadingChart = false;

    return new Chart('TopTenChart', {
      type: 'bar', //this denotes tha type of chart
      data: {
        // values on X-Axis
        labels: this.labels,
        datasets: [
          {
            label: 'Cantidad de productos vendidos', //label for the data set
            data: this.dataValues,
            backgroundColor: '#3a4a52',
          },
        ],
      },
      options: {
        indexAxis: 'y',
        aspectRatio: 2,
      },
    });
  }
}
