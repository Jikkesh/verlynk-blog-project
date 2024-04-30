import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  signupData: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signupData = this.formBuilder.group({
      name:"",
      email: "",
      password: "",
      confirmPassword:""
    });
  }

  
  onSubmit() {
    const body: any = this.signupData.value;

      if(!body.password == body.confirmPassword){
        alert("Confirm Password Mismatch")
      }
      
      this.authService.onSignup(body).subscribe((result) => {

        if(result.status == 201){
          console.log(result),
          this.router.navigate(["login"])
        }
        else if(result.status == 400){
          alert("User Already Exist, Kindly Login !"),
          this.router.navigate(["login"])
        }
        else{
          alert("Something went wrong on server")
        }
     
    })
  }


}
