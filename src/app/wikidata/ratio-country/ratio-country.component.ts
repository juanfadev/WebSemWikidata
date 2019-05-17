import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ratio-country',
  templateUrl: './ratio-country.component.html',
  styleUrls: ['./ratio-country.component.css']
})
export class RatioCountryComponent implements OnInit {
  @Input() f: any;
  data: any;
  options: any;

  constructor() {
  }

  ngOnInit() {
    const f = this.f.filter(e => e.ratio != null);
    this.data = {
      labels: f.map(e => e.countryLabel),
      datasets: [
        {
          label: 'Ratio',
          data: f.map(e => e.ratio),
        }]
    };
    this.options = {
      title: {
        display: true,
        text: 'Ratio Compañias por Startup en cada país',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };
  }

}
