import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {

  registerForm;
  registerForm_contact;
   
  constructor(private service:UserService,private contactService:ContactService ,private formBuilder: FormBuilder,private router:Router) {
    this.registerForm = formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    }); 

    // this.registerForm = formBuilder.group({
    //   first_name: ['', Validators.required],
    //   last_name: ['', Validators.required],
    //   email: ['', Validators.required],
    //   password: ['', Validators.compose([Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}$')])],
    //   confirmPassword: [''],
    // }, {validator: this.matchingPasswords('password', 'confirmPassword')});

    //for contact table
    this.registerForm_contact = formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  register(){
    let formData = this.registerForm.value;
    this.service.register(formData).subscribe((result) => {
      alert('Register successful!');
    }, (err) => {
      alert('Register failed! ');
      console.log(err);
    });
  }

  addContact(){
   //create a new contact in the contact table
   let contact_formData = this.registerForm_contact.value;
   this.contactService.add_contact(contact_formData).subscribe((result) => {
     alert('Created contact successful!');
     //nav to the login page
     this.router.navigate(['']);//app-routing.module
   }, (err) => {
     alert('Created contact failed! ');
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

  get  confirm_passwordFormControl(){
    return this.registerForm.get('confirmPassword');
  }
}
