import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getLocaleMonthNames } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  login(formData:object){
    return this.http.post('http://localhost:8000/login', formData);
  }

  logout(){
    localStorage.removeItem('currentUser');
  }

  register(formData:object){
    return this.http.post('http://localhost:8000/register', formData);
  }

  get_current_user(){
    return JSON.parse(localStorage.getItem('currentUser'));//before: localStorage.getItem('currentUser')!
  }

  update_lessor_phone_number(lessor_id,phone_number){
    return this.http.patch("http://localhost:8000/lessor_phone_number/"+lessor_id,{phone_number});
  }

  update_lessor_picture(lessor_id,lessor_picture){
    return this.http.patch("http://localhost:8000/lessor_picture/"+lessor_id,{lessor_picture});
  }

  isAuthenticated(){
    return this.get_current_user() ? true: false;
  }
}
