import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InstructorsComponent } from './containers/instructors/instructors.component';
import { InstructorDetailsComponent } from './containers/instructor-details/instructor-details.component';
import { TypeaheadFilterModule } from '../shared/typeahead-filter/typeahead-filter.module';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { PlusCircleOutline, EditOutline, SaveOutline } from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';


import { InstructorListComponent } from './components/instructor-list/instructor-list.component';
import { InstructorEditComponent } from './components/instructor-edit/instructor-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserCourseListEditorModule } from '../shared/user-course-list-editor/user-course-list-editor.module';
import { AdminGuard } from '../core/guards/admin.guard';


@NgModule({
  declarations: [
    InstructorsComponent,
    InstructorDetailsComponent,
    InstructorListComponent,
    InstructorEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: InstructorsComponent
      },
      {
        path: ':instructorId',
        component: InstructorDetailsComponent,
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
export class InstructorsModule { }
