import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-panel',
  templateUrl: './start-panel.component.html',
  styleUrls: ['./start-panel.component.css']
})
export class StartPanelComponent implements OnInit {

  selectedTab: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    this.router.navigate(['/trips']);
  }

  registerUser(): void {
    this.selectedTab = 0;
  }

}
