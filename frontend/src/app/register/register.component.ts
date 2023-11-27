import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registrationForm!:FormGroup
  error:boolean = false;
  success:boolean = false;
  errorMessage:string = ''
  successMessage:string = ''

  constructor(private fb:FormBuilder,private router: Router ){

    this.registrationForm = this.fb.group({
      full_name: ['',[Validators.required]],
      email: ['',[Validators.required]],
      phone_number: ['',[Validators.required]],
      password: ['',[Validators.required]],
      confirm_password: ['',[Validators.required]],
    })
  }

  async createUser(){
    
    
    }
    



}
