import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../interfaces/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http:HttpClient) { }

  get_car():Observable<Car[]>{
    return this.http.get<Car[]>("http://localhost:8000/car");
  }

  //TODO: return all the cars under a specific lessor account
  get_car_byLessor(lessor_id):Observable<Car[]>{
    return this.http.get<Car[]>("http://localhost:8000/car/"+lessor_id);
  }

  add_car(data){
    return this.http.post("http://localhost:8000/car",data);
  }

  delete_car(carID){
    return this.http.delete("http://localhost:8000/car",carID);
  }
}