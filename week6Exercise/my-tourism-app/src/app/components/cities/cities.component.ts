import { Component, OnInit } from '@angular/core';
import { GetcitiesService } from 'src/app/services/getcities.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  cities!:any[];
  color!:boolean;
  constructor(private service:GetcitiesService) { }

  ngOnInit(): void {
    this.cities=this.service.getCities();
    this.color=this.colorit();
  }

  colorit(){
    for(let i=0;i<this.cities.length;i++){
      if(this.cities[i].attractionSites.length<3){
        return false;
      }
    }
    return true;
  }

}
