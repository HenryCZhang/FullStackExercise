import { Injectable } from '@angular/core';
import{CitiesINfo} from'../components/cities/cities-info-data';
@Injectable({
  providedIn: 'root'
})
export class GetcitiesService {

  cityInfoArr = CitiesINfo;
  
  constructor() { }

  getCities(){
    return this.cityInfoArr;
  }
}
