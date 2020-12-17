import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-panel',
  templateUrl: './start-panel.component.html',
  styleUrls: ['./start-panel.component.css']
})
export class StartPanelComponent implements OnInit {

  selectedTab: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  registerUser(): void {
    this.selectedTab = 0;
  }

}
