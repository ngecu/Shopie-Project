import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { userLogin } from '../interfaces/userLogin';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!:FormGroup
  registrationForm!:FormGroup


  errorMessage:string = ''
  email:string = ''
  name:string = ''
  error:boolean = false;
  success:boolean = false;


  successMessage:string = ''
  loggingIn:boolean = false
  loggedInState:boolean = false

  loggedIn = false

  constructor(private fb:FormBuilder,private userService: UsersService,private authService:AuthService,private router: Router ){


    
    this.registrationForm = this.fb.group({
      full_name: ['',[Validators.required]],
      email: ['',[Validators.required]],
      password: ['',[Validators.required]],
      confirm_password: ['',[Validators.required]],
    })
  


    this.loginForm = this.fb.group({
      email: ['',[Validators.required]],
      password: ['',[Validators.required]],

    })
    
  }

  async createUser(){
    
    let user_details: User = this.registrationForm.value;
    
    if(user_details.password != user_details.confirm_password){
      this.error = true
      this.errorMessage = "Password Mismatch"

      setTimeout(() => {
        this.errorMessage = ''
      this.error = false

      }, 3000);

    }
    else{
     let response = await this.authService.registerUser(user_details)
     if(response.error){
      this.error = true
      this.errorMessage = response.error

      setTimeout(() => {
        this.errorMessage = ''
      this.error = false

      }, 3000);


     }

     else if(response.message){
      this.success = true
      this.successMessage = "user Registered successfully"

           setTimeout( async() => {     
            this.success = false
            this.successMessage = ""
      
          this.router.navigate(['/login'])
        }, 2000);

     }
    }
    

  }




  async loginUser(){
    let user_details = this.loginForm.value
        let response = await this.authService.login(user_details)
    
    
        if(response.error){
          this.loggingIn = true
          this.errorMessage = response.error
    
          setTimeout(() => {
            this.errorMessage = ''
            this.loggingIn = false
          }, 3000);
          
        }else if(response.message){
          this.loggedInState = true
          this.successMessage = response.message
          this.loggedIn = true
          let {role,name,email,phone_number,user_id} = await this.userService.checkDetails()
          localStorage.setItem('loggedIn', `${this.loggedIn}`)  
          localStorage.setItem('name', `${name}`)  
          localStorage.setItem('email', `${email}`)  
          localStorage.setItem('phone_number', `${phone_number}`)  
          localStorage.setItem('user_id', `${user_id}`)  
          localStorage.setItem('role', `${role}`)  
          
          console.log(role);
          
    
          setTimeout( async() => {
            this.successMessage = ''
            this.loggedInState = false
            
            
    
            if(role == 1){
              this.router.navigate(['admin'])
            }else if(role == 0){
              this.router.navigate(['user'])
            }
          }, 2000);
     
        }
        
      
    
    }


}
