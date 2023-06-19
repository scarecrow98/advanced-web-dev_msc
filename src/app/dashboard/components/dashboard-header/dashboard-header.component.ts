import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/main';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  @Input() title: string = '';

  @Input() user: User|null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
