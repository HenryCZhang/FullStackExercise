import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../interfaces/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  add_order(data){
    return this.http.post("http://localhost:8000/order",data);
  }

  get_order_byUser(user_email):Observable<Order[]>{
    return this.http.get<Order[]>("http://localhost:8000/order_user/"+user_email);
  }
  
}
