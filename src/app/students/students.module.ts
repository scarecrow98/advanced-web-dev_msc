import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './containers/students/students.component';
import { RouterModule } from '@angular/router';
import { StudentDetailsComponent } from './containers/student-details/student-details.component';

import { TypeaheadFilterModule } from '../shared/typeahead-filter/typeahead-filter.module';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { PlusCircleOutline, EditOutline, SaveOutline } from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { ReactiveFormsModule } from '@angular/forms';
import { UserCourseListEditorModule } from '../shared/user-course-list-editor/user-course-list-editor.module';
import { AdminGuard } from '../core/guards/admin.guard';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentEditComponent } from './components/student-edit/student-edit.component';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentDetailsComponent,
    StudentListComponent,
    StudentEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: StudentsComponent },
      {
        path: ':studentId',
        component: StudentDetailsComponent,
        canActivate: [AdminGuard]
      }
    ]),
    TypeaheadFilterModule,
    NzButtonModule,
    NzIconModule.forChild([
      PlusCircleOutline,
      EditOutline,
      SaveOutline
    ]),
    NzTableModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    ReactiveFormsModule,
    UserCourseListEditorModule
  ]
})
export class StudentsModule { }
