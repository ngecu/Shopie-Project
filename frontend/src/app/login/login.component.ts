import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { userLogin } from '../interfaces/userLogin';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!:FormGroup
  
  constructor (private fb:FormBuilder ,private router: Router, ){
    this.loginForm = this.fb.group({
      email: ['',[Validators.required]],
      password: ['',[Validators.required]],

    })
    
  }

  errorMessage:string = ''
  email:string = ''
  name:string = ''


  successMessage:string = ''
  loggingIn:boolean = false
  loggedInState:boolean = false

  loggedIn = false




}
