import { Component, OnInit } from '@angular/core';
import { GetweatherService } from 'src/app/services/getweather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weatherData:any[];
  
  constructor(private service:GetweatherService) { 
    this.weatherData=this.service.getWeather();//get weather data from city-info-data.ts
  }

  ngOnInit(): void {
  }
  
  getWeatherData(){
    return this.weatherData;
  }

}


