import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service"

@Component({
  selector: 'app-trips-navbar',
  templateUrl: './trips-navbar.component.html',
  styleUrls: ['./trips-navbar.component.css']
})
export class TripsNavbarComponent implements OnInit {

  @Input() reservationsCount: number;
  @Output() openCartSidebar = new EventEmitter;
  @Output() openFilterSidebar = new EventEmitter;

  constructor(private _snackBar: MatSnackBar, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  openCart(): void {
    this.openCartSidebar.emit();
  }

  openFilter(): void {
    this.openFilterSidebar.emit();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  logOutUser(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
