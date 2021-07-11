import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GetCityNamesService } from 'src/app/services/get-city-names.service';

@Component({
  selector: 'app-tech-ideas',
  templateUrl: './tech-ideas.component.html',
  styleUrls: ['./tech-ideas.component.css']
})
export class TechIdeasComponent implements OnInit {

  cities=['Awan','Cairo','Luxor','Sharm El-Sheikh'];

  techIdeasForm;

  constructor(private service:GetCityNamesService,private builder:FormBuilder) {
    // this.cities = this.service.getNames();
      this.techIdeasForm = builder.group({
      name:["",[Validators.required,Validators.minLength(3)]],//no prohibited()
      age:[""],
      email:["",[Validators.required]],
      city:["",[Validators.required]],
      brief:["",[Validators.required,Validators.minLength(100)]]
    })
   }

  ngOnInit(): void {
  }

  get nameFormControl(){
    return this.techIdeasForm.controls['name'];
  }

  get ageFormControl(){
    return this.techIdeasForm.controls['age'];
  }
  get emailFormControl(){
    return this.techIdeasForm.controls['email'];
  }
  get cityFormControl(){
    return this.techIdeasForm.controls['city'];
  }
  get briefFormControl(){
    return this.techIdeasForm.controls['brief'];
  }

  onClick(){
    console.log(this.techIdeasForm.controls.brief.value);
    this.techIdeasForm.reset();
  }



}
