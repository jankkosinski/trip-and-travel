import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service"
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserLoginData} from "../../models/user_structures"

@Component({
  selector: 'app-start-panel',
  templateUrl: './start-panel.component.html',
  styleUrls: ['./start-panel.component.css']
})
export class StartPanelComponent implements OnInit {

  selectedTab: number = 0;

  loginData: UserLoginData; 
  registerData: UserLoginData; 

  constructor(private router: Router, private authService: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginData = <UserLoginData>{};
    this.registerData = <UserLoginData>{};
  }

  loginUser(): void {
    this.authService.login(this.loginData)
    .then((user) => {
      this._snackBar.open('Authentication complete. Welcome ' + user.user.email, 'Close',{
        duration: 3000,
      });
      this.router.navigate(['/trips']);
    })
    .catch((error) => {
      console.log(error);
      this._snackBar.open(error.message, 'Close',{
        duration: 3000,
      });
    });
    setTimeout(function(){ this.loginData = <UserLoginData>{}; }, 3000);
  }

  registerUser(): void {
    this.authService.register(this.registerData)
    .then((user) => {
      this._snackBar.open('Registration complete for ' + user.user.email, 'Close',{
        duration: 3000,
      });
      this.authService.logout();
      this.selectedTab = 0;
    })
    .catch((error) => {
      this._snackBar.open(error.message, 'Close',{
        duration: 3000,
      });
    });
    this.registerData = <UserLoginData>{};
  }

}
