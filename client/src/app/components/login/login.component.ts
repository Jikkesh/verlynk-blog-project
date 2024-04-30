import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginData: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginData = this.formBuilder.group({
      email: "",
      password: ""
    });
  }




  onSubmit() {
    const body: User = this.loginData.value;

    this.authService.onLogin(body).subscribe((result) => {
      if (result.status == 200) {
          console.log(result),
          localStorage.setItem("USER_TOKEN",result.token),
          this.authService.onUserLogin(true),
          this.router.navigate(["/"])
      }
      else if(result.status == 400){
          alert("Password is Incorrect")
      }
      else{
        alert("User not found, Please Signup !")
      }
    });
  }







}
