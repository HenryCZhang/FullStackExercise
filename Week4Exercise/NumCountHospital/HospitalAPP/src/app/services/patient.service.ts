import { Injectable } from '@angular/core';
import { Patient } from '../interfaces/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  patients: Patient[] = [
    {name:'Lufy', illness:'bone fracture'},
    {name:'Kaido', illness:'imortality'},
    {name:'Marshall', illness:'depression'},
  ]
  constructor() { }
}
