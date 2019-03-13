import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) { }

  users: any = [
    {
      user: 'admin',
      password: 'admin'
    }
  ];

  isLoggedIn: boolean = false;

  login: Function = function(login){
    function checkUser(user){
      return user.user == login.user && user.password == login.password;
    }
    this.isLoggedIn = this.users.some(checkUser);

    return this.isLoggedIn;
  }

  logout: Function = function(){
    this.isLoggedIn = false;
    this.goBack();
  }

  
  goBack: Function = function(){
    this.router.navigate(['/']);
  }
}
