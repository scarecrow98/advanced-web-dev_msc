import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SemestersComponent } from './containers/semesters/semesters.component';
import { RouterModule } from '@angular/router';
import { TypeaheadFilterModule } from '../shared/typeahead-filter/typeahead-filter.module';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { PlusCircleOutline, EditOutline, SaveOutline } from '@ant-design/icons-angular/icons';
import { SemesterListComponent } from './components/semester-list/semester-list.component';
import { SemesterDetailsComponent } from './containers/semester-details/semester-details.component';
import { SemesterEditComponent } from './components/semester-edit/semester-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminGuard } from '../core/guards/admin.guard';


@NgModule({
  declarations: [
    SemestersComponent,
    SemesterListComponent,
    SemesterDetailsComponent,
    SemesterEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SemestersComponent,
        children: [
          {
            path: ':semesterId',
            component: SemesterDetailsComponent,
            canActivate: [AdminGuard]
          }
        ]
      }
    ]),
    TypeaheadFilterModule,
    NzButtonModule,
    NzIconModule.forChild([
      PlusCircleOutline,
      EditOutline,
      SaveOutline,
    ]),
    NzFormModule,
    NzInputModule,
    NzTableModule,
    ReactiveFormsModule,
    NzDatePickerModule
  ]
})
export class SemestersModule { }
