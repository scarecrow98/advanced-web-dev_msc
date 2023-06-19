import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';


import { CalendarOutline, UserOutline, LogoutOutline, BookOutline } from '@ant-design/icons-angular/icons';
import { DashboardMenuComponent } from './components/dashboard-menu/dashboard-menu.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';



@NgModule({
  declarations: [
    DashboardComponent,
    DashboardMenuComponent,
    DashboardHeaderComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzPageHeaderModule,
    NzMenuModule,
    NzDividerModule,
    NzIconModule.forChild([
      CalendarOutline,
      UserOutline,
      LogoutOutline,
      BookOutline
    ]),
    NzAvatarModule
  ]
})
export class DashboardModule { }
