import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service"
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserLoginData} from "../../models/user_structures"
import {BasketService} from "../../services/basket.service"
import {UserRolesService} from "../../services/user-roles.service"


@Component({
  selector: 'app-start-panel',
  templateUrl: './start-panel.component.html',
  styleUrls: ['./start-panel.component.css']
})
export class StartPanelComponent implements OnInit {

  selectedTab: number = 0;

  loginData: UserLoginData; 
  registerData: UserLoginData; 

  constructor(
    private router: Router, 
    private authService: AuthService, 
    private _snackBar: MatSnackBar,
    private userRoleService: UserRolesService,
    private basketService: BasketService
    ) { }

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
      this._snackBar.open(error.message, 'Close',{
        duration: 3000,
      });
    });
    setTimeout(function(){ this.loginData = <UserLoginData>{}; }, 3000);
  }

  registerUser(): void {
    this.authService.register(this.registerData)
    .then((user) => {
      this.userRoleService.addUserRole(user.user.uid)
      .then(() => {
        this.basketService.addUserBasket(user.user.uid)
        .then(() => {
          this._snackBar.open('Registration complete for ' + user.user.email, 'Close',{
            duration: 3000,
          });
          this.authService.logout();
          this.selectedTab = 0;
        })
      })
    })
    .catch((error) => {
      this._snackBar.open(error.message, 'Close',{
        duration: 3000,
      });
    })
    .finally(() => {
      this.registerData = <UserLoginData>{};
    });
  }
}
