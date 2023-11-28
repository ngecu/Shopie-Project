import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  userForm!:FormGroup;
  
  public lat:any;
  public lng:any;

  public ngOnInit(): void {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log(this.lat);
          console.log(this.lat);
        }
      },
        (error:any) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  submitForm() {
    console.log("this gorm is ",this.userForm);
    
    // Handle form submission logic here
    // Access form values using ngModel
    const formValues = {
      first_name: this.userForm.value.first_name,
      last_name: this.userForm.value.last_name,
      phone_number: this.userForm.value.phone_number,
      email_address: this.userForm.value.email_address
    };

    console.log('Form submitted with values:', formValues);
  }

}
