import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/interfaces/doctor';
import { Patient } from 'src/app/interfaces/patient';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {
  
  bgColor='lightblue';
  doctors:Doctor[];
  patients:Patient[];

  constructor(private doctorService:DoctorService, patientService:PatientService) { 
    this.doctors = doctorService.doctors;
    this.patients = patientService.patients;
  }

  ngOnInit(): void {
  }

}
