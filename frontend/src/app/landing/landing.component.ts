import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../interfaces/category';
import { CategoriesService } from '../services/categories.service';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  categories:Category[] = []
  error:boolean = false;
  errorMessage:string = ''
  
  constructor(private categoryService: CategoriesService, private router: Router){
  


    this.getCategories()
  }

  async getCategories(){
    let response = await this.categoryService.geCategories();
  console.log(response);

  this.categories = response

  }

   

  

}


