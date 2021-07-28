import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {

  registerForm;

  constructor(private service:UserService, private formBuilder: FormBuilder,private router:Router) {
    this.registerForm = formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  register(){
    let formData = this.registerForm.value;
    this.service.register(formData).subscribe((result) => {
      alert('Register successful!');
      //nav to the login page
      this.router.navigate(['']);//app-routing.module
    }, (err) => {
      alert('Register failed! ');
      console.log(err);
    });
  }

  get  first_nameFormControl(){
    return this.registerForm.get('first_name');
  }

  get  last_nameFormControl(){
    return this.registerForm.get('last_name');
  }

  get  emailFormControl(){
    return this.registerForm.get('email');
  }

  get  passwordFormControl(){
    return this.registerForm.get('password');
  }
}
