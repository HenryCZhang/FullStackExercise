import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherComponent } from '../weather/weather.component';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {
  name!:any;
  springM!:any;
  springN!:any;
  summerM!:any;
  summerN!:any;
  autumnM!:any;
  autumnN!:any;
  winterM!:any;
  winterN!:any;
  vf!:any; //start visit
  vt!:any; //last visit

  weatherData!:any[];

  constructor(private route:ActivatedRoute, private weatherComponent:WeatherComponent) {
    route.paramMap.subscribe((params)=>{
      this.name=params.get('name');
      this.summerM=params.get('summerM');
      this.summerN=params.get('summerN');
      this.winterM=params.get('winterM');
      this.winterN=params.get('winterN');
      this.springM=params.get('springM');
      this.springN=params.get('springN');
      this.autumnM=params.get('autumnM');
      this.autumnN=params.get('autumnN');
      this.vt=params.get('visitTo');
      this.vf=params.get('visitFrom');
    })
  }

  ngOnInit(): void {
  }


}
