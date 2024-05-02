import { Component, OnInit } from '@angular/core';
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
  isFormError: boolean = false;
  isPasswordMatch: boolean = true;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signupData = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    });
  }

  hideErrorAfterDelay(): void {
    setTimeout(() => {
      this.isFormError = false;
      this.isPasswordMatch = true;
    }, 5000);
  }

  passwordCheck(): void {
    const { password, confirmPassword } = this.signupData.value;
    if (password !== confirmPassword) {
      this.isPasswordMatch = false;
    }
    else {
      this.isPasswordMatch = true;
    }
  }



  onSubmit(): void {

    if (this.signupData.invalid) {
      this.isFormError = true;
      this.hideErrorAfterDelay();
      return;
    }
    const { name, email, password, confirmPassword } = this.signupData.value;

    if (name == null || email == null || password == null || confirmPassword == null) {
      alert("Fill the form the Signup");
      return;
    }

    if (this.signupData.get('email').hasError('email')) {
      return;
    }

    if (password !== confirmPassword) {
      this.passwordCheck();
      return;
    }

    const body: User = { name, email, password };

    this.authService.onSignup(body).subscribe((result) => {
      if (result.status == 201) {
        this.router.navigate(["login"]),
          alert("Signup Success, Login please");
      }
    }, (error) => {
      if (error.status == 400) {
        alert("You are a Old User, Kindly Login !")
      } else {
        alert("Something went wrong on server");
      }

    });
  }


}
