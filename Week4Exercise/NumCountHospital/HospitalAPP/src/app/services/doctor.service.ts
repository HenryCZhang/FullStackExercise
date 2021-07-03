import { Injectable } from '@angular/core';
import { Doctor } from '../interfaces/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService{

  doctors: Doctor[]=[
    {name:"Trafalgar Law", specialization:'Open Surgery'},
    {name:"Dr.Who", specialization:'Acupuncture'},
    {name:"Dr.Dre", specialization:'Mental Health'},
  ]
  constructor() { }
}
