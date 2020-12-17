import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trips-navbar',
  templateUrl: './trips-navbar.component.html',
  styleUrls: ['./trips-navbar.component.css']
})
export class TripsNavbarComponent implements OnInit {

  @Input() reservationsCount: number;
  @Output() openCartSidebar = new EventEmitter;
  @Output() openFilterSidebar = new EventEmitter;

  constructor(private _snackBar: MatSnackBar, private router: Router) { }

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
    this.router.navigate(['/login']);
  }

}
