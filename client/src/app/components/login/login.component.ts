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

  isFormError: boolean = false;

  isCredMatch: boolean = true;


  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginData = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  credMatchClose(): void {
    this.isCredMatch = true;
  }

  hideErrorAfterDelay(): void {
    setTimeout(() => {
      this.isFormError = false;
    }, 5000);
  }


  onSubmit(): void {
    if (this.loginData.invalid) {
      this.isFormError = true;
      this.hideErrorAfterDelay();
      return;
    }

    const { email, password } = this.loginData.value;

    if (email == null || password == null) {
      return;
    }

    if (this.loginData.get('email').hasError('email')) {
      return;
    }
    const body: User = this.loginData.value;

    this.authService.onLogin(body).subscribe((result) => {
      if (result.status == 200) {
        console.log(result),
          localStorage.setItem("USER_TOKEN", result.token),
          this.authService.onUserLogin(true),
          this.router.navigate(["/"])
      }
    }, (error) => {
      if (error.status == 400) {
        this.isCredMatch = false;
        this.loginData.reset();
      }
      else {
        alert("User not found, Please create new account !");
        this.router.navigate(["signup"])
      }

    });
  }







}
