import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.scss']
})
export class DashboardMenuComponent implements OnInit {

  @Output() onLogout = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
