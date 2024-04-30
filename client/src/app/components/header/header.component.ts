import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})


export class HeaderComponent implements OnInit {

  isUserLogged: boolean;

  constructor(private authservice: AuthService,
              private router: Router
  ) {
    this.authservice.userLogin.subscribe(value => this.isUserLogged = value)
  }

  ngOnInit(): void {
    const tokenCheck = localStorage.getItem("USER_TOKEN");
    if (!tokenCheck) {
      this.isUserLogged = false
    }
    else {
      this.isUserLogged = true;
    }

  }


  handleLogin() {
    this.router.navigate(["login"]);
  }

  handleLogout() {
    localStorage.clear();
    this.authservice.onUserLogin(false);
    this.router.navigate(["login"]);
  }




}
